const ReadIt = require("./streams/readIt");
const TransformIt = require("./streams/transformIt");
const WriteItSyncSlow = require("./streams/writeItSyncSlow");

const readIt = new ReadIt({highWaterMark: 2, doSlowReads: false, maxReads: 10});
const transformIt = new TransformIt({highWaterMark: 2});
const writeItSyncSlow = new WriteItSyncSlow({highWaterMark: 2});

readIt.pipe(transformIt).pipe(writeItSyncSlow);