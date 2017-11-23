const {Writable} = require("stream");


const MAX_LIMIT = 5;
const ASYNC_DELAY = 500;


const callAsync = function () {
  let inProgress = 0;
  let total = 0;

  function callAsync(obj, next) {
    inProgress++;
    total++;

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
    };

    function asyncDone() {
      console.log(`------ ${obj.id} Write finished`);
      inProgress--;
      nextCallBack();
    };

    setTimeout(asyncDone, ASYNC_DELAY);
    nextCallBack();
  }

  return callAsync;
}();


class WriteIt extends Writable {

  constructor(options) {
    options.objectMode = true;
    super(options);
  }

  _write(obj, encoding, next) {
    console.log(`++++++ ${obj.id} Write`);
    callAsync(obj, next);
  }
}


module.exports = WriteIt;