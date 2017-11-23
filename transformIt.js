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
}

module.exports = TransformIt;