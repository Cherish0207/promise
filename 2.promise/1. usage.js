let promise = new Promise((resolve, reject) => {
  console.log(1);
  // resolve("success");
  // throw new Error("Error");
  reject("failed");
});
console.log(2);
promise.then(
  (data) => {
    console.log(`data: ${data}`);
  },
  (err) => {
    console.log(`err: ${err}`);
  }
);
