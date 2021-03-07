Promise.resolve(123)
  .then()
  .then()
  .then(() => {
    // 这样写，后面的代码不会执行了 就是中断了
    // 如果返回其他的 后面还是会走
    return new Promise((resolve, reject) => {});
  })
  .then(
    (data) => {
      console.log(data);
    },
    (err) => {
      console.log(err);
    }
  );
