const { rejects } = require("assert");
const { promises } = require("fs");
const { resolve } = require("path");

const isPromise = (data) => typeof data.then === "function";
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      if (isPromise(promise)) {
        promise.then(resolve, reject);
      } else {
        resolve(promise);
      }
    });
  });
};
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("ok");
  }, 4000);
});
const wrap = (promise) => {
  let abort;
  let myP = new Promise((resolve, reject) => {
    abort = reject;
  });
  let p = Promise.race([promise, myP]);
  p.abort = abort;
  return p;
};
let p = wrap(promise);
p.then(
  (data) => {
    console.log(data);
  },
  (err) => {
    console.log(err);
  }
);
setTimeout(() => {
  p.abort("promise超时");
}, 2000);
