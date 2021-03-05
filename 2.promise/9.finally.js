// 1. finally 表示的不是最终的意思，而是无论如何都会执行的意思
// 2. finally 不会影响 then 和 catch 获取的结果
Promise.resolve(12)
  .then((data) => {
    console.log(data, "success");
  })
  .finally(() => {
    console.log("final");
  })
  .catch((err) => {
    console.log("err", err);
  });
