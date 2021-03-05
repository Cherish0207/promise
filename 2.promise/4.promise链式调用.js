const Mypromise = require("./0. mypromise");
let p = new Mypromise((resolve, reject) => {
  resolve(1);
});
let promise2 = p.then((data) => {
  return new Mypromise((resolve, reject) => {
    setTimeout(() => {
      // resolve("success");
      reject("error");
    });
  });
});
promise2.then(
  (data) => {
    console.log("success:" + data);
  },
  (err) => {
    console.log("err:" + err);
  }
);
