const {Writable} = require("stream");

const GREEN='\033[1;32m';
const NO_COLOR='\033[0m';
const DARK='\033[1;30m';


const callSync = function () {
  let inProgress = 0;
  let total = 0;

  function callSync(obj, next) {
    inProgress++;
    console.log(`${DARK}       ${obj.id} - ${inProgress}:${total} Write processing${NO_COLOR}`);

    total++;
    inProgress--;
    console.log(`------ ${obj.id} - ${inProgress}:${total} Write finished, calling next()`);

    next();
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
    console.log(`${GREEN}++++++++++ WRITE Final - ${new Date()}${NO_COLOR}`)
    callBack();
  }
}


module.exports = WriteItSync;