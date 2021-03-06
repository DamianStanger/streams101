const {Writable} = require("stream");
const {GREEN, NO_COLOR, DARK} = require("../consoleColors");

let maxConcurrency;


const callAsync = function () {
  let inProgress = 0;
  let total = 0;

  function callAsync(obj, isSlowWrite, next) {
    let nextUsed = false;

    function nextCallBack() {
      if (inProgress >= maxConcurrency) {
        console.log(`${DARK}       ${obj.id} - ${inProgress}:${total} Write, Max concurrency reached${NO_COLOR}`);
      } else {
        if (!nextUsed) {
          console.log(`${DARK}       ${obj.id} - ${inProgress}:${total} Write, Calling next()${NO_COLOR}`);
          next();
        } else {
          console.log(`${DARK}       ${obj.id} - ${inProgress}:${total} Write, Next used${NO_COLOR}`);
        }
        nextUsed = true;
      }
    }

    const DO_WORK_FOR = Math.round((100 + (Math.random() * 900)) + (isSlowWrite ? 1000 : 0));

    function asyncDone() {
      total++;
      inProgress--;
      console.log(`------ ${obj.id} - ${inProgress}:${total} Write finished in ${DO_WORK_FOR}`);

      nextCallBack();
    }

    setTimeout(asyncDone, DO_WORK_FOR);
    inProgress++;
    nextCallBack();
  }

  return callAsync;
}();


class WriteItAsync extends Writable {
  constructor(options) {
    options.objectMode = true;
    super(options);
    maxConcurrency = options.maxConcurrency;
  }

  _write(obj, encoding, next) {
    const SLOW_WRITE = Math.random() * 1000 > 900; // one in ten will be a slow write
    console.log(`++++++ ${obj.id} Write ${SLOW_WRITE ? "- SLOW" : ""}`);
    callAsync(obj, SLOW_WRITE, next);
  }

  _final(callBack) {
    console.log(`${GREEN}++++++++++ WRITE Final - ${new Date()}${NO_COLOR}`);
    callBack();
  }
}


module.exports = WriteItAsync;