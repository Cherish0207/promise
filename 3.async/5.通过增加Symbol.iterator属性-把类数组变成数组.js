// 怎么把类数组变成数组？

// 1.Array.from --> 把类数组转成数组，且不需要迭代器，有索引就行
const likeArray = { 0: "a", 1: "b", 2: "c", 3: "d", length: 4 };
// let arr = Array.from(likeArray);
// console.log(arr);

// 2.通过遍历器
// generator是生成器 --> 生成的是遍历器 --> 提到遍历，就会想到数组，数组能遍历
// 那么类数组能遍历吗
// ...运算符的原理，就是遍历这个对象 将结果放到数组中，要求这个对象要有遍历器
// for of
// 如
// console.log([...new Set([1, 2, 3])]); // [1,2,3]
// [...likeArray]; // object is not iterable (cannot read property Symbol(Symbol.iterator))
// --- 不能被迭代
// --- 如何让类数组也能被迭代？
// 给这个类数组/对象 增加一个自定义属性--遍历器接口
/*
likeArray[Symbol.iterator] = function (params) {
  let i = 0
  return {
    next: () => {
      return { value: this[i], done: i++ === this.length };
    },
  };
};
console.log([...likeArray]);
*/

// 2.通过生成器
likeArray[Symbol.iterator] = function* (params) {
  // generator函数可以生产遍历器
  let i = 0;
  while (i !== this.length) {
    yield this[i++]; // generator固定语法 yield必须要配合着*来使用
  }
};
console.log([...likeArray]);

// Symbol.iterator 是固定的语法，元编程（可以自己改写js原有的功能）
