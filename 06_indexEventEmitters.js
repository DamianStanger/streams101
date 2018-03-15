const ReadIt = require("./streams/readIt");
const TransformIt = require("./streams/transformIt");
const writeItEventEmitters = require("./streams/writeItEventEmitters");

const readIt = new ReadIt({highWaterMark: 2, doSlowReads: false, maxReads: 20});
const transformIt = new TransformIt({highWaterMark: 2});

readIt.pipe(transformIt);
writeItEventEmitters(transformIt, {"maxConcurrency": 10});
