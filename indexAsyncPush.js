const ReadIt = require("./readIt");
const TransformIt = require("./transformIt");

const readIt = new ReadIt({highWaterMark: 5});
const transformIt = new TransformIt({highWaterMark: 5});
const writeItAsyncPush = require("./writeItAsyncPush");

readIt.pipe(transformIt);
writeItAsyncPush(transformIt);
