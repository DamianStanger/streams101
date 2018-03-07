const ReadItBatch = require("./streams/readItBatch");
const TransformIt = require("./streams/transformIt");
const WriteItSyncSlow = require("./streams/writeItSyncSlow");

const readItBatch = new ReadItBatch({highWaterMark: 4, maxReads: 40});
const transformIt = new TransformIt({highWaterMark: 4});
const writeItSyncSlow = new WriteItSyncSlow({highWaterMark: 4});

readItBatch.pipe(transformIt).pipe(writeItSyncSlow);