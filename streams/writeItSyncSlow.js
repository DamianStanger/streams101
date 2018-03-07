const {Writable} = require("stream");
const {GREEN, NO_COLOR, DARK} = require("../consoleColors");


const callSync = function () {
  let inProgress = 0;
  let total = 0;

  function callSync(obj, isSlowWrite, next) {
    inProgress++;
    const DO_WORK_FOR = Math.round((100 + (Math.random() * 900)) + (isSlowWrite ? 1000 : 0));

    function syncDone() {
      total++;
      console.log(`------ ${obj.id} - ${inProgress}:${total} Write finished in ${DO_WORK_FOR}, calling next()`);
      inProgress--;
      next();
    }

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
    const SLOW_WRITE = Math.random() * 1000 > 900; // one in ten will be a slow write
    console.log(`++++++ ${obj.id} Write ${SLOW_WRITE ? "- SLOW" : ""}`);
    callSync(obj, SLOW_WRITE, next);
  }

  _final(callBack) {
    console.log(`${GREEN}++++++++++ WRITE Final - ${new Date()}${NO_COLOR}`);
    callBack();
  }
}


module.exports = WriteItSync;