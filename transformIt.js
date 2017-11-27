const {Transform} = require("stream");



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
    console.log(`++++ TRANSFORM Final - ${new Date()}`);
    callBack();
  }
}

module.exports = TransformIt;




