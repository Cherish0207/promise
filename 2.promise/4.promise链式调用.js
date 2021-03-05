const Mypromise = require("./0. mypromise");
let p = new Mypromise((resolve, reject) => {
  resolve(1);
});
let promise2 = p.then((data) => {
  return new Mypromise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        new Mypromise((resolve, reject) => {
          setTimeout(() => {
            resolve(2000);
            reject(11);
          });
        })
      );
    });
  });
});
promise2.then(
  (data) => {
    console.dir(data);
    /**
     Mypromise {
        states: { PENDING: 'PENDING', REJECTED: 'REJECTED', RESOVED: 'RESOLVED' },
        status: 'PENDING',
        value: undefined,
        reason: undefined,
        onResolvedCallbacks: [],
        onRejectedCallbacks: []
      }
     */
    // 原生Promise -->2000
  },
  (err) => {
    console.log("err:" + err);
  }
);
