const promise = Promise.resolve().then(() => {
  return promise;
});
promise.catch(console.error);
// TypeError: Chaining cycle detected for promise #<Promise>

// .then 或 .catch 返回的值不能是 promise 本身，否则会造成死循环
// 类似于:
// process.nextTick(function tick() {
//   console.log("tick");
//   process.nextTick(tick);
// });
