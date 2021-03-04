// 多个异步请求同时获取最终结果
let fs = require("fs");
let school = {};
// 把参数变量内置到了函数中 -- 闭包函数
const cb = after(2, () => {
  console.log(school);
});
function after(times, callback) {
  return function () {
    if (--times === 0) {
      callback();
    }
  };
}
// err放在第一个参数，
// 这种语法叫做 error first -- 错误第一，因为异步方法无法通过try、 catchi捕获异常
fs.readFile("./name.txt", "utf8", function (err, data) {
  school.name = data;
  cb();
});
fs.readFile("./age.txt", "utf8", function (err, data) {
  school.age = data;
  cb();
});
