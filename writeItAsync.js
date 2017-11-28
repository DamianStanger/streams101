const {Writable} = require("stream");

const MAX_LIMIT = 5;


const callAsync = function () {
  let inProgress = 0;
  let total = 0;

  function callAsync(obj, next) {
    let nextUsed = false;

    function nextCallBack() {
      if (inProgress >= MAX_LIMIT) {
        console.log(`       ${obj.id} - ${inProgress}:${total} Max limit`);
      } else {
        if (!nextUsed) {
          console.log(`       ${obj.id} - ${inProgress}:${total} Calling next()`);
          next();
        } else {
          console.log(`       ${obj.id} - ${inProgress}:${total} Next used`);
        }
        nextUsed = true;
      }
    }

    function asyncDone() {
      total++;
      inProgress--;
      console.log(`------ ${obj.id} - ${inProgress}:${total} Write finished`);
      nextCallBack();
    }

    const DO_WORK_FOR = 100 + (Math.random() * 900);
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
    console.log(`++++++ ${obj.id} Write`);
    callAsync(obj, next);
  }

  _final(callBack) {
    console.log(`++++++++++ WRITE Final - ${new Date()}`)
    callBack();
  }
}


module.exports = WriteItAsync;