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
    if (this.status === this.states.RESOVED) {
      onFulfilled(this.value);
    } else if (this.status === this.states.REJECTED) {
      onRejected(this.reason);
    } else if (this.status === this.states.PENDING) {
      // 面向切片：用函数包裹一下方便扩展
      // 依次执行then方法的成功/失败回调（可能有多个）
      this.onResolvedCallbacks.push(() => {
        // todos...
        onFulfilled(this.value);
      });
      this.onRejectedCallbacks.push(() => {
        // todos...
        console.log(this.status);
        onRejected(this.reason);
      });
    }
  }
}
module.exports = Mypromise;
