const MyPromise = require("./0. mypromise");
let promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    // resolve("success");
    // throw new Error("Error");
    reject("failed");
  });
});
promise
  .then(
    (data) => {
      console.log(`data1: ${data}`);
    },
    (err) => {
      console.log(`err1: ${err}`);
    }
  )
  .then(
    (data) => {
      console.log(`data2: ${data}`);
    }, 
    (err) => {
      console.log(`err3: ${err}`);
    }
  );
