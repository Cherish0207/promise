// const fs = require("fs").promises;
const fs = require("fs");
// promisify: 将node的api快速的转化成 promise的形式
const promisify = (fn) => (...args) =>
  new Promise((resolve, reject) => {
    fn(...args, function (err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
let read = promisify(fs.readFile);
read("name.txt", "utf8").then((data) => {
  console.log(data);
});
