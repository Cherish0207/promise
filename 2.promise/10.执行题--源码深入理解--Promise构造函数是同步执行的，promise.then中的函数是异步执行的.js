const Promise = require("./0. mypromise");
const promise = new Promise((resolve, reject) => {
  console.log(1);
  resolve(); // 此时只是把
  console.log(2);
});
promise.then(() => {
  console.log(3);
});
console.log(4);

// 1.Promise 构造函数是同步执行的

/**
try {
  exector(resolve, reject);
} catch (e) {
  reject(e);
}
*/

// 2.promise.then 中的函数是异步执行的

/**
setTimeout(() => {
  try {
    let x = onFulfilled(this.value);
    resolvePromise(promise2, x, resolve, reject);
  } catch (e) {
    reject(e);
  }
});
*/
