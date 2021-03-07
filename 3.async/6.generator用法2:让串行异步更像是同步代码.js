// 代码编写更像是同步的(执行还是异步的)
// 可以像同步代码一样用try catch捕获异常
const fs = require("fs").promises;
function* read() {
  try {
    let name = yield fs.readFile("name.txt", "utf8");
    let age = yield fs.readFile(name, "utf8");
    return age;
  } catch (e) {
    console.log(e);
  }
}
let it = read();
let { value, done } = it.next();
value.then((data) => {
  let { value, done } = it.next(data);
  value.then((data) => {
    it.throw("error");
    // let { value, done } = it.next(data);
    // console.log(value);
  });
});
