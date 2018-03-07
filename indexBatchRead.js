const ReadItBatch = require("./readItBatch");
const TransformIt = require("./transformIt");
const WriteItSyncSlow = require("./writeItSyncSlow");

const readItBatch = new ReadItBatch({highWaterMark: 4, maxReads: 40});
const transformIt = new TransformIt({highWaterMark: 4});
const writeItSyncSlow = new WriteItSyncSlow({highWaterMark: 4});

readItBatch.pipe(transformIt).pipe(writeItSyncSlow);