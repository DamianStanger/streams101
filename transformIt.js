const {Transform} = require("stream");

class TransformIt extends Transform {

  constructor(options) {
    options.objectMode = true;
    super(options);
  }

  _transform(obj, encoding, next) {
    console.log(`Transform ${obj.id}`);
    this.push(obj);
    next();
  }
}

module.exports = TransformIt;