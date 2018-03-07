const ReadIt = require("./streams/readIt");
const TransformIt = require("./streams/transformIt");
const WriteItAsync = require("./streams/writeItAsync");

const readIt = new ReadIt({highWaterMark: 5, doSlowReads: false, maxReads: 10});
const transformIt = new TransformIt({highWaterMark: 5});
const writeItAsync = new WriteItAsync({highWaterMark: 5});

readIt.pipe(transformIt).pipe(writeItAsync);