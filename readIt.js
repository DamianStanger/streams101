const {Readable} = require("stream");

class ReadIt extends Readable {
  constructor(options) {
    options.objectMode=true;
    super(options);
    
    this.max = 40;
    this.index = 1;

    console.log(`++ READ Start - ${new Date()}`)
  }

  _read() {
    console.log(`++ ${this.index} Read`);

    if (this.index > this.max) {
      this.push(null);
    } else {
      this.push({id: this.index, max: this.max});
      this.index++;
    }
  }

  _final(callBack) {
    console.log(`++++++ READ Final - ${new Date()}`)
    callBack();
  }
}

module.exports = ReadIt;