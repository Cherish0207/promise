const resolvePromise = require("./1. resolvePromise");
class Mypromise {
  constructor(exector) {
    this.states = {
      PENDING: "PENDING",
      REJECTED: "REJECTED",
      RESOVED: "RESOLVED",
    };
    this.status = this.states.PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    let resolve = (value) => {
      if (this.status === this.states.PENDING) {
        this.value = value;
        this.status = this.states.RESOVED;
      }
      this.onResolvedCallbacks.forEach((cb) => cb());
    };
    let reject = (reason) => {
      if (this.status === this.states.PENDING) {
        this.reason = reason;
        this.status = this.states.REJECTED;
      }
      this.onRejectedCallbacks.forEach((cb) => cb());
    };
    try {
      exector(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    let promise2 = new Mypromise((resolve, reject) => {
      if (this.status === this.states.RESOVED) {
        // 此时如果执行onFulfilled的时候报了错，会被上面的try catch捕获到
        // 但是这里无法获取到promise2 -->setTimeout
        // 使用 setTimeout 后 上面到try catch 又无法捕获到错误了 --> 加try catch
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      } else if (this.status === this.states.REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      } else if (this.status === this.states.PENDING) {
        // 面向切片：用函数包裹一下方便扩展
        // 依次执行then方法的成功/失败回调（可能有多个）
        this.onResolvedCallbacks.push(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
        this.onRejectedCallbacks.push(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }
    });
    return promise2;
  }
}
module.exports = Mypromise;
