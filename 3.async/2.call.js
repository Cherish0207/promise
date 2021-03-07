const fs = require("fs").promises;

const isPromise = (data) => typeof data.then === "function";
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    // 异步的并发和串行
    // 并发: 同步，使用for循环迭代执行
    // 串行: 前面的输出是后面的输入，(借助回调，第一个完成后调用第二个)
    let arr = [];
    let index = 0;
    const processData = (key, data) => {
      arr[key] = data;
      // 不能使用数组的长度来计算
      if (++index === promises.length) {
        resolve(arr);
      }
    };
    promises.forEach((promise, i) => {
      if (isPromise(promise)) {
        promise.then((data) => {
          processData(i, data);
        }, reject);
        // all: 全部成功才成功
      } else {
        processData(i, promise);
      }
    });
  });
};

// 根据顺序拿到返回结果
Promise.all([
  1,
  2,
  fs.readFile("name.txt", "utf8"),
  fs.readFile("age.txt", "utf8"),
  3,
]).then((...args) => {
  console.log(...args);
});

// promise 小缺陷: 默认无法中断,只是不采用返回的结果, fetch api
