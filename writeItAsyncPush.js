const MAX_LIMIT = 5;
const ASYNC_DELAY = 500;


function listenForData(readStream) {
  const callAsync = function () {
    let inProgress = 0;
    let total = 0;

    function runInProcessWatcher() {
      if (inProgress >= MAX_LIMIT) {
        if (!readStream.isPaused()) {
          readStream.pause();
          console.log(`            ${inProgress}:${total} Write pausing    0`);
        }
        if (inProgress <= 1) {
          console.log(`            ${inProgress}:${total} Write watching   2`);
          setTimeout(runInProcessWatcher, ASYNC_DELAY);
        }
      } else {
        readStream.resume();
        console.log(`            ${inProgress}:${total} Write resumed     1`);
      }
    }

    function callAsync(obj) {
      function recursiveDone() {
        function asyncDone() {
          readStream.resume();
          inProgress--;
          total++;
          console.log(`------ ${obj.id} - ${inProgress}:${total} Write finished, resuming`);
        }

        const DO_WORK_FOR = 100 + (Math.random() * 900);
        setTimeout(asyncDone, DO_WORK_FOR);
        inProgress++;

        runInProcessWatcher();
      }

      recursiveDone();
    }

    return callAsync;
  }();


  readStream.on("data", data => {
    console.log(`++++++ ${data.id} Write`);
    callAsync(data);
  });

  readStream.on("end", () => {
    console.log(`++++++++++ WRITE End - ${new Date()}`)
  })
}


module.exports = listenForData;