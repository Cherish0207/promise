/**
 * 如何实现一个通用的函数柯里化;
 * 通过一个柯里化函数实现通用的柯里化方法;
 * @param {*} fn
 * @param {*} arr
 */
const currying = (fn, arr = []) => {
  let len = fn.length; // 获取函数的参数个数
  return function (...args) {
    let concatValue = [...arr, ...args];
    if (concatValue.length >= len) {
      return fn(...concatValue);
    } else {
      return currying(fn, concatValue); // 递归不停的产生函数
    }
  };
};

function isType(type, value) {
  return Object.prototype.toString.call(value) === `[object ${type}]`;
}
let isArray = currying(isType)("Array");
let isString = currying(isType)("String");
console.log(isArray([]));
console.log(isArray("123"));
// console.log(isString([]));
// console.log(isString("123"));
