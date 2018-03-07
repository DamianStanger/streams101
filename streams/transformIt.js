const {Transform} = require("stream");
const {GREEN, NO_COLOR} = require("../consoleColors");


class TransformIt extends Transform {

  constructor(options) {
    options.objectMode = true;
    super(options);
  }

  _transform(obj, encoding, next) {
    console.log(`++++ ${obj.id} Transform`);
    let pushReturned = this.push(obj);
    console.log(`++++ ${obj.id} Transform - push:${pushReturned?1:0}`);
    let nextReturned = next();
    console.log(`++++ ${obj.id} Transform - next:${nextReturned?1:0}`);
  }

  _final(callBack) {
    callBack();
    console.log(`${GREEN}++++++++++ TRANSFORM Final - ${new Date()}${NO_COLOR}`);
  }
}

module.exports = TransformIt;




