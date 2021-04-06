function red() {
  console.log("红灯" + (Date.now() - start));
}
function green() {
  console.log("绿灯" + (Date.now() - start));
}
function yellow() {
  console.log("黄灯" + (Date.now() - start));
}
// 7.1 红灯3秒亮一次，绿灯1秒亮一次，黄灯2秒亮一次；如何使用Promise让三个灯不断交替重复亮灯？

/**
先看题目，题目要求红灯亮过后，绿灯才能亮，绿灯亮过后，黄灯才能亮，黄灯亮过后，红灯才能亮……所以怎么通过Promise实现？

换句话说，就是红灯亮起时，承诺2s秒后亮绿灯，绿灯亮起时承诺1s后亮黄灯，黄灯亮起时，承诺3s后亮红灯……这显然是一个Promise链式调用，看到这里你心里或许就有思路了，我们需要将我们的每一个亮灯动作写在then()方法中，同时返回一个新的Promise，并将其状态由pending设置为fulfilled，允许下一盏灯亮起。
 */
let myLight = (timer, cb) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      cb();
      resolve();
    }, timer);
  });
};

let myStep = () => {
  Promise.resolve()
    .then(() => {
      return myLight(3000, red);
    })
    .then(() => {
      return myLight(2000, green);
    })
    .then(() => {
      return myLight(1000, yellow);
    })
    .then(() => {
      myStep();
    });
};
myStep();
