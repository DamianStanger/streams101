const {Readable} = require("stream");

const MAX = 20;
const BATCH = 5;
const GREEN = '\033[1;32m';
const NO_COLOR = '\033[0m';
const DARK = '\033[1;30m';


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
        console.log(`${DARK}++ ${batchId} Read Batch ${NO_COLOR}`);
        this.push({id: batchId, currentIndex: this.index});
      }
    }
  }

}


module.exports = ReadIt;