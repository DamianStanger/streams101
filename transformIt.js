const {Transform} = require("stream");

const GREEN='\033[1;32m';
const NO_COLOR='\033[0m';
const DARK='\033[1;30m';


class TransformIt extends Transform {

  constructor(options) {
    options.objectMode = true;
    super(options);
  }

  _transform(obj, encoding, next) {
    console.log(`++++ ${obj.id} Transform`);
    this.push(obj);
    next();
  }

  _final(callBack) {
    console.log(`${GREEN}++++++++++ TRANSFORM Final - ${new Date()}${NO_COLOR}`);
    callBack();
  }
}

module.exports = TransformIt;




