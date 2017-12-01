const MAX_LIMIT = 5;
const ASYNC_DELAY = 500;


function listenForData(readStream) {
  let inProgress = 0;
  let total = 0;

  function runInProcessWatcher() {
    if (inProgress >= MAX_LIMIT) {
      readStream.pause();
      console.log(`            ${inProgress}:${total} Write pausing    0`);
    } else {
      readStream.resume();
      console.log(`            ${inProgress}:${total} Write resumed    1`);
    }
  }

  function callAsync(obj, isSlowWrite) {
    const DO_WORK_FOR = Math.round((100 + (Math.random() * 900)) + (isSlowWrite ? 1000 : 0));

    function asyncDone() {
      readStream.resume();
      inProgress--;
      total++;
      console.log(`------ ${obj.id} - ${inProgress}:${total} Write finished in ${DO_WORK_FOR}, resumed    1`);
    }

    setTimeout(asyncDone, DO_WORK_FOR);
    inProgress++;

    runInProcessWatcher();
  }


  readStream.on("data", data => {
    const SLOW_WRITE = Math.random() * 1000 > 900; // one in ten will be a slow write
    console.log(`++++++ ${data.id} Write ${SLOW_WRITE ? "- SLOW" : ""}`);
    callAsync(data, SLOW_WRITE);
  });

  readStream.on("end", () => {
    console.log(`++++++++++ WRITE End - ${new Date()}`)
  })
}


module.exports = listenForData;