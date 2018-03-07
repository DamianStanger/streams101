const {Readable} = require("stream");
const {GREEN, NO_COLOR} = require("../consoleColors");


class ReadIt extends Readable {
  constructor(options) {
    options.objectMode=true;
    super(options);
    
    this.index = 0;
    this.doSlowReads = options.doSlowReads;
    this.maxReads = options.maxReads;

    console.log(`${GREEN}++++++++++ READ Start - ${new Date()}${NO_COLOR}`)
  }

  _buildMsg(id) {
    return {id};
  }

  _read() {
    this.index++;
    const LONG_READ = (Math.random() * 1000) > 900;

    if (this.index > this.maxReads) {
      this.push(null);
      console.log(`${GREEN}++++++++++ READ End - ${new Date()}${NO_COLOR}`)
    } else {
      let doWorkFor = Math.random() * 100;
      if (LONG_READ) {doWorkFor += 1400}

      if(!this.doSlowReads) {
        let pushResult = this.push(this._buildMsg(this.index));
        console.log(`++ ${this.index} Read push:${pushResult?1:0}`);
      } else {
        setTimeout(() => {
          let pushResult = this.push(this._buildMsg(this.index));
          console.log(`++ ${this.index} Read${LONG_READ ? " - SLOW": ""} push:${pushResult?1:0}`);
        }, doWorkFor);
      }
    }
  }

}

module.exports = ReadIt;