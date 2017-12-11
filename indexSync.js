const ReadIt = require("./readIt");
const TransformIt = require("./transformIt");
const WriteItSync = require("./writeItSync");

const readIt = new ReadIt({highWaterMark: 2, doSlowReads: false});
const transformIt = new TransformIt({highWaterMark: 2});
const writeItSync = new WriteItSync({highWaterMark: 2});

readIt.pipe(transformIt).pipe(writeItSync);