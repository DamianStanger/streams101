const {Writable} = require("stream");


const callSync = function () {
  let inProgress = 0;
  let total = 0;

  function callSync(obj, next) {
    inProgress++;
    total++;

    function syncDone() {
      console.log(`------ ${obj.id} - ${inProgress}:${total} Write finished, calling next()`);
      inProgress--;
      next();
    }

    const DO_WORK_FOR = 100 + (Math.random() * 900);
    setTimeout(syncDone, DO_WORK_FOR);
  }

  return callSync;
}();


class WriteItSync extends Writable {

  constructor(options) {
    options.objectMode = true;
    super(options);
  }

  _write(obj, encoding, next) {
    console.log(`++++++ ${obj.id} Write`);
    callSync(obj, next);
  }

  _final(callBack) {
    console.log(`++++++++++ WRITE Final - ${new Date()}`)
    callBack();
  }
}


module.exports = WriteItSync;