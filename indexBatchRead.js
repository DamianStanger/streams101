const ReadItBatch = require("./readItBatch");
const TransformIt = require("./transformIt");
const WriteItSyncSlow = require("./writeItSyncSlow");

const readItBatch = new ReadItBatch({highWaterMark: 2});
const transformIt = new TransformIt({highWaterMark: 2});
const writeItSyncSlow = new WriteItSyncSlow({highWaterMark: 2});

readItBatch.pipe(transformIt).pipe(writeItSyncSlow);