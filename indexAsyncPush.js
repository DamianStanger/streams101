const ReadIt = require("./readIt");
const TransformIt = require("./transformIt");
const writeItAsyncPush = require("./writeItAsyncPush");

const readIt = new ReadIt({highWaterMark: 5, doSlowReads: true, maxReads: 40});
const transformIt = new TransformIt({highWaterMark: 5});

readIt.pipe(transformIt);
writeItAsyncPush(transformIt);
