const ReadIt = require("./readIt");
const TransformIt = require("./transformIt");
const WriteItAsync = require("./writeItAsync");

const readIt = new ReadIt({highWaterMark: 5, doSlowReads: true});
const transformIt = new TransformIt({highWaterMark: 5});
const writeItAsync = new WriteItAsync({highWaterMark: 5});

readIt.pipe(transformIt).pipe(writeItAsync);