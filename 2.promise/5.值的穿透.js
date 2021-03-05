const Mypromise = require("./0. mypromise");
let p = new Mypromise((resolve, reject) => {
  resolve(1);
});
p.then((data) => data)
  .then((data) => data)
  .then((data) => {
    console.log(data);
  });
