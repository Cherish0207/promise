/**
 * 如何实现一个通用的函数柯里化;
 * 通过一个柯里化函数实现通用的柯里化方法;
 * @param {*} fn
 * @param {*} arr
 */
const currying = (fn, arr = []) => {
  let len = fn.length; // 获取函数的参数个数
  return function (...args) {
    arr = [...arr, ...args];
    if (arr.length >= len) {
      return fn(...arr);
    } else {
      return currying(fn, arr); // 递归不停的产生函数
    }
  };
};

function isType(type, value) {
  return Object.prototype.toString.call(value) === `[object ${type}]`;
}
let isArray = currying(isType)("Array");
let isString = currying(isType)("String");
console.log(isArray("123"));
console.log(isArray([]));
// console.log(isString([]));
// console.log(isString("123"));
