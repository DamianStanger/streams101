const ReadIt = require("./readIt");
const TransformIt = require("./transformIt");

const readIt = new ReadIt({highWaterMark: 5});
const transformIt = new TransformIt({highWaterMark: 5});

const ASYNC_DELAY = 500;
const MAX_LIMIT = 5;
const DO_WORK_FOR = 250 + (Math.random() * 750);


const callAsync = function () {
  let inProgress = 0;
  let total = 0;

  function callAsync(obj) {
    function recursiveDone() {
      function asyncDone() {
        transformIt.resume();
        inProgress--;
        total++;
        console.log(`------ ${obj.id} - ${inProgress}:${total} Write finished`);
      }

      if (inProgress >= MAX_LIMIT) {
        transformIt.pause();
        console.log(`------ ${obj.id} - ${inProgress}:${total} Write paused   0`);
        setTimeout(recursiveDone, ASYNC_DELAY);
      } else {
        transformIt.resume();
        setTimeout(asyncDone, DO_WORK_FOR);
        inProgress++;
        console.log(`------ ${obj.id} - ${inProgress}:${total} Write resumed   1`);
      }
    }

    recursiveDone();
  }

  return callAsync;
}();


readIt.pipe(transformIt);

transformIt.on("data", data => {
  console.log(`++++++ ${data.id} Write`);
  callAsync(data);
});

transformIt.on("end", () => {
  console.log(`++++++++++ WRITE End - ${new Date()}`)
})