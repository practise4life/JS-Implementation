function task(time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(time);
    }, time);
  });
}
const taskList = [task(1000), task(5000), task(3000)];

function myPromiseAll(taskList) {
  const results = [];
  let promisesCompleted = 0;
  return new Promise((resolve, reject) => {
    taskList.forEach((promise, index) => {
      promise
        .then((val) => {
          results[index] = val;
          promisesCompleted += 1;
          if (promisesCompleted === taskList.length) {
            resolve(results);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
}

function myPromiseRace(taskList) {
  return new Promise((resolve, reject) => {
    taskList.forEach((task) =>
      task.then((data) => resolve(data)).catch((error) => console.log(error))
    );
  });
}

function myPromiseAny(taskList) {
  return new Promise((resolve, reject) => {
    let settledPromises = 0;
    taskList.forEach((task) => {
      return task
        .then((data) => resolve(data))
        .catch((_) => {
          settledPromises++;
          if (settledPromises === taskList.length) {
            reject("all promises rejected");
          }
        });
    });
  });
}

// myPromiseAll(taskList)
//   .then((results) => {
//     console.log("got results", results);
//   })
//   .catch(console.error);

myPromiseRace(taskList)
  .then((result) => console.log(result))
  .catch(console.error);
