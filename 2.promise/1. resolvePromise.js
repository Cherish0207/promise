module.exports = resolvePromise = (promise2, x, resolve, reject) => {
  if (promise2 === x) {
    // 用一个类型错误结束掉 promise
    return reject(
      new TypeError("Chaining cycle detected for promise #<Promise>")
    );
  }
};
