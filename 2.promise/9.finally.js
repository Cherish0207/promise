// 1. finally 表示的不是最终的意思，而是无论如何都会执行的意思
// 2. finally 不会影响 then 和 catch 获取的结果 --
// 3. 如果返回promise，会等待这个 promise 也执行完毕,
//       如果是成功的 promise，会用之前的成功结果
//       但如果是失败的 promise，会用他的失败原因传给下一个

Promise.resolve(12)
// Promise.reject(12)
  .finally(() => {
    console.log("final");
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(1); // err 1
        // resolve(1); // 12 success
      }, 1000);
    });
  })
  .then((data) => {
    console.log(data, "success");
  })
  .catch((err) => {
    console.log("err", err);
  });
