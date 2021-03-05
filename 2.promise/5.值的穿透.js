const Mypromise = require("./0. mypromise");
let p = new Mypromise((resolve, reject) => {
  // resolve(1);
  reject(11);
});
p.then()
  .then()
  .then(
    (data) => {
      console.log(data);
    },
    (err) => {
      console.log("err:" + err);
    }
  );
