let p = new Promise((resolve, reject) => {
  resolve(1);
});
let promise2 = p.then((data) => {
  return promise2;
});
// promise2.resolve/promise2.reject
promise2.then(
  () => {},
  (err) => {
    console.log(err);
  }
);
// [TypeError: Chaining cycle detected for promise #<Promise>]
// promise2 自己等待自己完成
// 我等我买饭回来

// promisea+里规定 如果 promise2 和 x 指向相同 （循环引用），就报类型错误
 