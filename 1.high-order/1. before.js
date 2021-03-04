// 举例：
// 1，2 都包含

// 写一个业务代码, 扩展当前的业务代码;
// 改写原有方法
/**
function say() {
  // 扩展代码 todo..
  console.log("say");
}
 */

// 比如要在 say 执行前做些事情
function say(...args) {
  console.log("say", ...args);
}
// 尽量不要破坏原有的函数，而是对其进行扩展
// 给某个方法添加一个方法在他执行之前调用
Function.prototype.before = function (cb) {
  // args剩余运算符
  // 箭头函数没有 this, 也没有 arguments
  return (...args) => {
    cb();
    this(...args);
  };
};
let beforesay = say.before(function () {
  console.log("beforesay");
});
beforesay("hello", "cherish");
