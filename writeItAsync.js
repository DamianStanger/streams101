const {Writable} = require("stream");

const MAX_LIMIT = 5;


const callAsync = function () {
  let inProgress = 0;
  let total = 0;

  function callAsync(obj, isSlowWrite, next) {
    let nextUsed = false;

    function nextCallBack() {
      if (inProgress >= MAX_LIMIT) {
        console.log(`       ${obj.id} - ${inProgress}:${total} Write, Max concurrency reached`);
      } else {
        if (!nextUsed) {
          console.log(`       ${obj.id} - ${inProgress}:${total} Write, Calling next()`);
          next();
        } else {
          console.log(`       ${obj.id} - ${inProgress}:${total} Write, Next used`);
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
  }

  _write(obj, encoding, next) {
    const SLOW_WRITE = Math.random() * 1000 > 900; // one in ten will be a slow write
    console.log(`++++++ ${obj.id} Write ${SLOW_WRITE ? "- SLOW" : ""}`);
    callAsync(obj, SLOW_WRITE, next);
  }

  _final(callBack) {
    console.log(`++++++++++ WRITE Final - ${new Date()}`)
    callBack();
  }
}


module.exports = WriteItAsync;