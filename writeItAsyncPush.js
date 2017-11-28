const MAX_LIMIT = 5;
const ASYNC_DELAY = 500;


function listenForData(readStream) {
  const callAsync = function () {
    let inProgress = 0;
    let total = 0;

    function callAsync(obj) {
      function recursiveDone() {
        function asyncDone() {
          readStream.resume();
          inProgress--;
          total++;
          console.log(`------ ${obj.id} - ${inProgress}:${total} Write finished`);
        }

        if (inProgress >= MAX_LIMIT) {
          readStream.pause();
          console.log(`       ${obj.id} - ${inProgress}:${total} Write paused   0`);
          setTimeout(recursiveDone, ASYNC_DELAY);
        } else {
          readStream.resume();
          const DO_WORK_FOR = 100 + (Math.random() * 900);
          setTimeout(asyncDone, DO_WORK_FOR);
          inProgress++;
          console.log(`       ${obj.id} - ${inProgress}:${total} Write resumed   1`);
        }
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