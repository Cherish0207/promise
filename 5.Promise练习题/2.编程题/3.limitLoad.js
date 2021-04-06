// 现有8个图片资源的url，已经存储在数组urls中，
// 且已有一个函数function loading，输入一个url链接，返回一个Promise，
// 该Promise在图片下载完成的时候resolve，下载失败则reject。

// 要求：任何时刻同时下载的链接数量不可以超过3个。

// 请写一段代码实现这个需求，要求尽可能快速将所有图片下载完成。
var urls = [
  "https://www.kkkk1000.com/images/getImgData/getImgDatadata.jpg",
  "https://www.kkkk1000.com/images/getImgData/gray.gif",
  "https://www.kkkk1000.com/images/getImgData/Particle.gif",
  "https://www.kkkk1000.com/images/getImgData/arithmetic.png",
  "https://www.kkkk1000.com/images/getImgData/arithmetic2.gif",
  "https://www.kkkk1000.com/images/getImgData/getImgDataError.jpg",
  "https://www.kkkk1000.com/images/getImgData/arithmetic.gif",
  "https://www.kkkk1000.com/images/wxQrCode2.png",
];

function loadImageAsync(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve();
    };
    img.onerror = reject;
    img.src = url;
  });
}
/**
解析
题目的意思是需要先并发请求3张图片，当一张图片加载完成后，又会继续发起一张图片的请求，让并发数保持在3个，直到需要加载的图片都全部发起请求。

用Promise来实现就是，先并发请求3个图片资源，这样可以得到3个Promise，组成一个数组promises，然后不断调用Promise.race来返回最快改变状态的Promise，然后从数组promises中删掉这个Promise对象，再加入一个新的Promise，直到全部的url被取完，最后再使用Promise.all来处理一遍数组promises中没有改变状态的Promise。
 */
function limitLoad(urls, handler, limit) {
  // 对数组做一个拷贝
  const sequence = [...urls];

  let promises = [];
  //并发请求到最大数
  promises = sequence.splice(0, limit).map((url, index) => {
    // 这里返回的 index 是任务在 promises 的脚标，用于在 Promise.race 之后找到完成的任务脚标
    return handler(url).then(() => {
      return index;
    });
  });

  // 利用数组的 reduce 方法来以队列的形式执行
  return sequence
    .reduce((last, url, currentIndex) => {
      return last
        .then(() => {
          // 返回最快改变状态的 Promise
          return Promise.race(promises);
        })
        .catch((err) => {
          // 这里的 catch 不仅用来捕获前面 then 方法抛出的错误
          // 更重要的是防止中断整个链式调用
          console.error(err);
        })
        .then((res) => {
          // 用新的 Promise 替换掉最快改变状态的 Promise
          promises[res] = handler(url).then(() => {
            return res;
          });
        });
    }, Promise.resolve())
    .then(() => {
      return Promise.all(promises);
    });
}

// limitLoad(urls, loadImageAsync, 3);

/*
因为 limitLoad 函数也返回一个 Promise，所以当 所有图片加载完成后，可以继续链式调用
*/
limitLoad(urls, loadImageAsync, 3)
  .then(() => {
    console.log("所有图片加载完成");
  })
  .catch((err) => {
    console.error(err);
  });
