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
    let promise2 = new Mypromise((resolve, reject) => {
      if (this.status === this.states.RESOVED) {
        let x = onFulfilled(this.value);
        resolve(x);
      } else if (this.status === this.states.REJECTED) {
        let x = onRejected(this.reason);
        resolve(x);
      } else if (this.status === this.states.PENDING) {
        // 面向切片：用函数包裹一下方便扩展
        // 依次执行then方法的成功/失败回调（可能有多个）
        this.onResolvedCallbacks.push(() => {
          // todos...
          let x = onFulfilled(this.value);
          resolve(x);
        });
        this.onRejectedCallbacks.push(() => {
          // todos...
          let x = onRejected(this.reason);
          resolve(x);
        });
      }
    });
    return promise2;
  }
}
module.exports = Mypromise;
