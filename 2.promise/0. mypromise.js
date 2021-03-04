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
    let resolve = (value) => {
      if (this.status === this.states.PENDING) {
        this.value = value;
        this.status = this.states.RESOVED;
      }
    };
    let reject = (reason) => {
      if (this.status === this.states.PENDING) {
        this.reason = reason;
        this.status = this.states.REJECTED;
      }
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
    }
  }
}
module.exports = Mypromise;
