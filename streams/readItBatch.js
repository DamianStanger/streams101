const {Readable} = require("stream");
const {GREEN, NO_COLOR, DARK} = require("../consoleColors");

const MAX = 20;
const BATCH = 5;


class ReadIt extends Readable {
  constructor(options) {
    options.objectMode = true;
    super(options);
    this.index = 0;
    console.log(`${GREEN}++++++++++ READ Start - ${new Date()}${NO_COLOR}`)
  }

  _read() {
    this.index++;
    console.log(`++ ${this.index} Read `);

    if (this.index > (MAX / BATCH)) {
      this.push(null);
      console.log(`${GREEN}++++++++++ READ End - ${new Date()}${NO_COLOR}`)

    } else {
      for (let i = 1; i <= BATCH; i++) {
        const batchId = this.index + (0.01 * i);
        var pushResult = this.push({id: batchId, currentIndex: this.index});
        console.log(`${DARK}++ ${batchId} Read Batch push:${pushResult?1:0}${NO_COLOR}`)
      }
    }
  }

}


module.exports = ReadIt;