const ReadIt = require("./streams/readIt");
const TransformIt = require("./streams/transformIt");
const WriteItSync = require("./streams/writeItSync");

const readIt = new ReadIt({highWaterMark: 2, doSlowReads: false, maxReads: 10});
const transformIt = new TransformIt({highWaterMark: 2});
const writeItSync = new WriteItSync({highWaterMark: 2});

readIt.pipe(transformIt).pipe(writeItSync);