const {Readable} = require("stream");

class ReadIt extends Readable {
  constructor(options) {
    options.objectMode=true;
    super(options);
    
    this.max = 100;
    this.index = 1;
  }

  _read() {
    console.log(`Read ${this.index}`);

    if (this.index > this.max) {
      this.push(null);
    } else {
      this.push({id: this.index, max: this.max});
      this.index++;
    }
  }
}

module.exports = ReadIt;