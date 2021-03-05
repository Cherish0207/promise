let fs = require("fs");
const MyPromise = require("./0. mypromise");
function read(filename) {
  return new MyPromise((resolve, reject) => {
    // fs.readFile(filename, "utf8", function (err, data) {
    //   if (err) return reject(err);
    //   resolve(data);
    // });
    resolve("first then");
    // reject("err")
  });
}
// 调用 p1 的 resolve("first then")
//  --> 走到 p1.then(() => 1) 返回1
// 如何让p2.then 中的resolve 拿到普通返回值1？
// ---> 调用then方法中返回的 promise2 的 resove 方法，自然就走到then方法中了
let p1 = read("./name.txt");
let p2 = p1.then(
  () => {
    throw new Error("fdsafsa");
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve("ok");
    //   });
    // });
  },
  (err) => {
    console.log(err);
    return "失败";
  }
);
p2.then(
  (data) => {
    console.log("data:" + data);
  },
  (err) => {
    console.log("err:" + err);
  }
);
