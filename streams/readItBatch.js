const {Readable} = require("stream");
const {GREEN, NO_COLOR, DARK} = require("../consoleColors");


class ReadItBatch extends Readable {
  constructor(options) {
    options.objectMode = true;
    super(options);
    this.max = options.maxReads;
    this.batch = options.batchSize;
    this.index = 0;
    console.log(`${GREEN}++++++++++ READ Start - ${new Date()}${NO_COLOR}`)
  }

  _buildMsg(batchId, index) {
    return {id: batchId, currentIndex: index};
  }

  _read() {
    this.index++;

    console.log(`++ ${this.index} Read `);

    if (this.index > (this.max / this.batch)) {
      this.push(null);
      console.log(`${GREEN}++++++++++ READ End - ${new Date()}${NO_COLOR}`)

    } else {
      for (let i = 1; i <= this.batch; i++) {
        const batchId = this.index + (0.01 * i);
        var pushResult = this.push(this._buildMsg(batchId, this.index));
        console.log(`${DARK}++ ${batchId} Read Batch push:${pushResult?1:0}${NO_COLOR}`)
      }
    }
  }

}


module.exports = ReadItBatch;