const ReadIt = require("./readIt");
const TransformIt = require("./transformIt");
const WriteIt = require("./writeIt");

const readIt = new ReadIt({highWaterMark: 10});
const transformIt = new TransformIt({highWaterMark: 10});
const writeIt = new WriteIt({highWaterMark: 10});

readIt.pipe(transformIt) ;
  // .pipe(writeIt); // comment out this line to see how back pressure is handled