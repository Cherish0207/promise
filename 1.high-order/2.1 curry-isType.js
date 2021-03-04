function isType(type) {
  return function (value) {
    return Object.prototype.toString.call(value) === `[object ${type}]`;
  };
}
let isArray = isType("Array");
console.log(isArray([]));
console.log(isArray("hello"));
