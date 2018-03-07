const ReadIt = require("./readIt");
const TransformIt = require("./transformIt");

const readIt = new ReadIt({highWaterMark: 5, doSlowReads: false, maxReads: 20});
const transformIt = new TransformIt({highWaterMark: 5});

readIt.pipe(transformIt);