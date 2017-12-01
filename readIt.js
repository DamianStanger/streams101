const {Readable} = require("stream");

const MAX = 40;

class ReadIt extends Readable {
  constructor(options) {
    options.objectMode=true;
    super(options);
    
    this.index = 0;
    this.doSlowReads = options.doSlowReads;

    console.log(`++++++++++ READ Start - ${new Date()}`)
  }

  _read() {
    this.index++;
    const LONG_READ = (Math.random() * 1000) > 900;

    console.log(`++ ${this.index} Read ${LONG_READ && this.doSlowReads ? "- SLOW": ""}`);

    if (this.index > MAX) {
      this.push(null);
      console.log(`++++++++++ READ End - ${new Date()}`)
    } else {
      let doWorkFor = Math.random() * 100;
      if (LONG_READ) {doWorkFor += 1400}

      setTimeout(() => {
        this.push({id: this.index, max: this.max});
      }, this.doSlowReads ? doWorkFor: 0);
    }
  }

}

module.exports = ReadIt;