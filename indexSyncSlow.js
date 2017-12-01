const ReadIt = require("./readIt");
const TransformIt = require("./transformIt");
const WriteItSyncSlow = require("./writeItSyncSlow");

const readIt = new ReadIt({highWaterMark: 5, doSlowReads: false});
const transformIt = new TransformIt({highWaterMark: 5});
const writeItSyncSlow = new WriteItSyncSlow({highWaterMark: 5});

readIt.pipe(transformIt).pipe(writeItSyncSlow);