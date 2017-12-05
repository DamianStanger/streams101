const ReadItBatch = require("./readItBatch");
const TransformIt = require("./transformIt");
const WriteItSyncSlow = require("./writeItSyncSlow");

const readItBatch = new ReadItBatch({highWaterMark: 1});
const transformIt = new TransformIt({highWaterMark: 1});
const writeItSyncSlow = new WriteItSyncSlow({highWaterMark: 1});

readItBatch.pipe(transformIt).pipe(writeItSyncSlow);