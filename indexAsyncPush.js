const ReadIt = require("./streams/readIt");
const TransformIt = require("./streams/transformIt");
const writeItAsyncPush = require("./streams/writeItAsyncPush");

const readIt = new ReadIt({highWaterMark: 5, doSlowReads: true, maxReads: 40});
const transformIt = new TransformIt({highWaterMark: 5});

readIt.pipe(transformIt);
writeItAsyncPush(transformIt);
