// 所有的 promise 库都要支持 resolvepromise，如 bluebird、q、es6- promise
// 库之间相互调用，靠的就是 resolvePromise // 1.循环引用自己等待自己完成错误的实现
module.exports = resolvePromise = (promise2, x, resolve, reject) => {
  if (promise2 === x) {
    // 用一个类型错误结束掉 promise
    return reject(
      new TypeError("Chaining cycle detected for promise #<Promise>")
    );
  }
  // 防止失败了再次进入成功/成功了再次进入失败，普通值不需处理
  let called;
  // 后续的条件要严格判断保证代能和别的库一起使用;
  if ((typeof x === "object" && x != null) || typeof x === "function") {
    try {
      let then = x.then;
      if (typeof then === "function") {
        // 只能认为是一个promise了
        // 不要写成x.then
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            // 根据 promise的状态决定是成功还是失败
            resolvePromise(promise2, y, resolve, reject); // 递归解析的过程
          },
          (e) => {
            if (called) return;
            called = true;
            reject(e);
          }
        );
      } else {
        // {then: '12'}
        // 普通值
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    // 普通值
    resolve(x);
  }
};

/**
 * 别人定义的 promise
Object.defineProperties(x, 'then', {
  get() {
    if(++index === 2) {
      throw new Error()
    }
  }
})
 */
