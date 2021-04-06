const Promise = require("./0. mypromise");
// Promise.resolve(1)
//   .then((res) => {
//     console.log(res);
//     return 2;
//   })
//   .catch((err) => {
//     return 3;
//   })
//   .then((res) => {
//     console.log(res);
//   });

Promise.resolve(1).then(2).then(Promise.resolve(3)).then(console.log);
// .then 或者 .catch 的参数期望是函数，传入非函数则会发生值穿透。
