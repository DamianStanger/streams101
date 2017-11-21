const {Writable} = require("stream");

class WriteIt extends Writable {

  constructor(options) {
    options.objectMode = true;
    super(options);
  }

  _write(obj, encoding, next) {
    console.log(`Write ${obj.id}`);
    next();
  }
}

module.exports = WriteIt;