const {Readable} = require("stream");

const MAX = 40;
const GREEN='\033[1;32m';
const NO_COLOR='\033[0m';
const DARK='\033[1;30m';


class ReadIt extends Readable {
  constructor(options) {
    options.objectMode=true;
    super(options);
    
    this.index = 0;
    this.doSlowReads = options.doSlowReads;

    console.log(`${GREEN}++++++++++ READ Start - ${new Date()}${NO_COLOR}`)
  }

  _read() {
    this.index++;
    const LONG_READ = (Math.random() * 1000) > 900;

    console.log(`++ ${this.index} Read ${LONG_READ && this.doSlowReads ? "- SLOW": ""}`);

    if (this.index > MAX) {
      this.push(null);
      console.log(`${GREEN}++++++++++ READ End - ${new Date()}${NO_COLOR}`)
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