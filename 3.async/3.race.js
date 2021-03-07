const fs = require("fs").promises;

const isPromise = (data) => typeof data.then === "function";
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      if (isPromise(promise)) {
        promise.then(resolve, reject);
      } else {
        resolve(promise);
      }
    });
  });
};
// 赛跑,谁跑的快用谁的
// 场景举例: (多个接口请求, 我希望采用快的那个)
Promise.race([
  1,
  2,
  fs.readFile("name.txt", "utf8"),
  fs.readFile("age.txt", "utf8"),
  3,
]).then((...args) => {
  console.log(...args);
});
