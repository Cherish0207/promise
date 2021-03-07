// 代码编写更像是同步的(执行还是异步的)
// 可以像同步代码一样用try catch捕获异常
const fs = require("fs").promises;
function* read() {
  let name = yield fs.readFile("name.txt", "utf8");
  let age = yield fs.readFile(name, "utf8");
  return age;
}

let co = (it) =>
  new Promise((resolve, reject) => {
    // 异步送代靠的是回调函数;
    // vue-router react-router koa express 等任何库，只要有异步迭代，都是用这种方式
    function next(data) {
      const { value, done } = it.next(data);
      if (done) {
        resolve(value);
      } else {
        Promise.resolve(value).then(next, reject);
      }
    }
    next();
  });
// co库 作者tj 同时也是koa/express的作者，把iterator转换成promise
co(read()).then((data) => {
  console.log(data);
});
// async + await = generator + co
// 默认async函数返回的就是一个promise

// 优化这段代码
/*
value.then((data) => {
  let { value, done } = it.next(data);
  value.then((data) => {
    it.throw("error");
    // let { value, done } = it.next(data);
    // console.log(value);
  });
});*/
