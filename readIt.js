const {Readable} = require("stream");

class ReadIt extends Readable {
  constructor(options) {
    options.objectMode=true;
    super(options);
    
    this.max = 40;
    this.index = 1;

    console.log(`++++++++++ READ Start - ${new Date()}`)
  }

  _read() {
    console.log(`++ ${this.index} Read`);

    if (this.index > this.max) {
      this.push(null);
      console.log(`++++++++++ READ End - ${new Date()}`)
    } else {
      this.push({id: this.index, max: this.max});
      this.index++;
    }
  }

}

module.exports = ReadIt;