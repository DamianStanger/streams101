const ReadIt = require("./readIt");
const TransformIt = require("./transformIt");
const WriteItSync = require("./writeItSync");

const readIt = new ReadIt({highWaterMark: 5});
const transformIt = new TransformIt({highWaterMark: 5});
const writeItSync = new WriteItSync({highWaterMark: 5});

readIt.pipe(transformIt).pipe(writeItSync);