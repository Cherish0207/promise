async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
  // 等价于
  // async2().then(() => {
  //   console.log("async1 end");
  // });
}
async function async2() {
  console.log("async2");
}
// console.log("script start");
// setTimeout(() => {
//   console.log("setTimeout");
// });
async1(); // 调用时马上执行，只有碰到await才会暂停
new Promise((resolve, reject) => {
  console.log("promise1");
  resolve();
}).then(() => {
  console.log("promise2");
});
console.log("script end");

// script start, async1 start, async2, promise1, script end
// [setTimeout]
// [async1 end, promise2]