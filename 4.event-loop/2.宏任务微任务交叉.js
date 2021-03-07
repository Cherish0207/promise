Promise.resolve().then(() => {
  console.log("Promise1");
  setTimeout(() => {
    console.log("setTimeout2");
  });
});

setTimeout(() => {
  console.log("setTimeout1");
  Promise.resolve().then(() => {
    console.log("Promise2");
  });
});

/**
 * 注意放入队列的时机
宏任务队列 [setTimeout1 setTimeout2]
微任务队列 [Promise1] --> [Promise2]
 */

// Promise1 setTimeout1 Promise2 setTimeout2
// GUI渲染不是每次都会执行 内部重新渲染会导致重绘  重绘不是每次改样式都重绘浏览器
// 如果没有调用强制重绘都方法，它默认会合理积攒一下，一起重绘
// 让浏览器强制重绘的方法，只要能让用户取值或者操作 dom元素，如getComputedStyle
