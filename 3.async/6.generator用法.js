// generator 在学 saga 的时候会讲generator的应用
// generator 基本应用 --- 后面的async await是主要基于generator
// co库 的原理

// 普通函数默认会从头到尾执行没有暂停的功能
// generator函数
// 是es6提供的语法,如果碰到 yield就会‘暂停’执行
// 使用场景: redux-sage(react中间件)、koa1

function* read() {
  yield 1;
  yield 2;
  yield 3;
}
let it = read(); // it就是送代器,迭代器上有个next方法
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// { value: 1, done: false }
// { value: 2, done: false }
// { value: 3, done: false }
// { value: undefined, done: true }

let flag = false;
do {
  let { value, done } = it.next();
  console.log(value);
  if (done) flag = true;
} while (!flag);
