process.nextTick(() => {
  console.log("nextTick");
});
Promise.resolve().then(() => {
  console.log("then");
});
setImmediate(() => {
  console.log("setImmediate");
});
console.log("end");
// end nextTick then setImmediate
// process.nextTick 和 promise.then 都属于 microtask，
// 而 setImmediate 属于 macrotask，在事件循环的 check 阶段执行。
// 事件循环的每个阶段（macrotask）之间都会执行 microtask, 事件循环的开始会先执行一次 microtask。
