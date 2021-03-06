const ReadIt = require("./streams/readIt");
const TransformIt = require("./streams/transformIt");
const WriteItAsync = require("./streams/writeItAsync");

const readIt = new ReadIt({highWaterMark: 2, doSlowReads: false, maxReads: 20});
const transformIt = new TransformIt({highWaterMark: 2});
const writeItAsync = new WriteItAsync({highWaterMark: 2, maxConcurrency: 10});

readIt.pipe(transformIt).pipe(writeItAsync);