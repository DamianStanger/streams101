const ReadIt = require("./readIt");
const TransformIt = require("./transformIt");
const WriteItSyncSlow = require("./writeItSyncSlow");

const readIt = new ReadIt({highWaterMark: 2, doSlowReads: false});
const transformIt = new TransformIt({highWaterMark: 2});
const writeItSyncSlow = new WriteItSyncSlow({highWaterMark: 2});

readIt.pipe(transformIt).pipe(writeItSyncSlow);