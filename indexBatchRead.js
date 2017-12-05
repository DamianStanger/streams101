const ReadItBatch = require("./readItBatch");
const TransformIt = require("./transformIt");
const WriteItAsync = require("./writeItAsync");

const readItBatch = new ReadItBatch({highWaterMark: 1});
const transformIt = new TransformIt({highWaterMark: 1});
const writeItAsync = new WriteItAsync({highWaterMark: 1});

readItBatch.pipe(transformIt).pipe(writeItAsync);