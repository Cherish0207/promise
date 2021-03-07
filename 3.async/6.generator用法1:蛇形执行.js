// generator 在学 saga 的时候会讲generator的应用
// generator 基本应用 --- 后面的async await是主要基于generator
// co库 的原理

// 普通函数默认会从头到尾执行没有暂停的功能
// generator函数
// 是es6提供的语法,如果碰到 yield就会‘暂停’执行
// 使用场景: redux-sage(react中间件)、koa1

function* read() {
  let a = yield 1;
  console.log(a);
  let b = yield 2;
  console.log(b);
  let c = yield 3;
  console.log(c);
  return c;
}
let it = read();

// 蛇形执行,除了第一次之外的next方法,都是把next中的参数传递给上ー次yield的返回结果
it.next() // 第一次的next传参没有任何意义
it.next(4)
it.next(5)
