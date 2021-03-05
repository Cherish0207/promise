let MyPromise = require("./0. mypromise");
// Promise.resolve(); // 快速创建一个成功的 promise
// Promise.reject(); // 快速的创建一个失败的 promise

MyPromise.resolve(123).then((data) => {
  console.log(data);
});
// 等价于
// new MyPromise((resolve, reject) => {
//   resolve(123);
// }).then((data) => {
//   console.log(data);
// });
