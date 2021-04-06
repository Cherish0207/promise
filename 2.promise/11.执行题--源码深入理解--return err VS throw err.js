const Promise = require("./0. mypromise");
Promise.resolve()
  .then(() => {
    // throw new Error("error!!!");
    return new Error("error!!!");
  })
  .then((res) => {
    console.log("then   qq: ", res);
  })
  .catch((err) => {
    console.log("catch: ", err);
  });
/** 
  .then 或者 .catch 中 return 一个 error 对象并不会抛出错误，所以不会被后续的 .catch 捕获，
  需要改成其中一种：
    return Promise.reject(new Error('error!!!'))
    throw new Error('error!!!')
  因为返回任意一个非 promise 的值都会被包裹成 promise 对象，
    即 return new Error('error!!!') 等价于 return Promise.resolve(new Error('error!!!'))。
 */

Promise.resolve()
  .then(
    function success(res) {
      throw new Error("error");
    },
    function fail1(e) {
      console.error("fail1: ", e);
    }
  )
  .catch(function fail2(e) {
    console.error("fail2: ", e);
  });
// 注意：
// .then 的第二个处理错误的函数捕获不了第一个处理成功的函数抛出的错误，
// 而后续的 .catch 可以捕获之前的错误。
