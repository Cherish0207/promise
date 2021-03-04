## promise 的特点以及概念

> [promisea+规范 ](https://promisesaplus.com)
> 查看兼容性: MDN/caniuse

promise es6 内部已经实现了。ie 不支持,需要 polyfill(es6-promise)

### promise 为什么会产生? 解决异步问题

1. 多个异步请求并发(希望同步最终的结果)。Promise.all
2. 链式异步请求的问题，上一个人的输出是下ー个人的输入。Promise 的链式调用可以解决这个问题
3. 缺陷:还是基于回调的 不能中转结果

### promise 特点

1. promise 就是一个类，promise 有三个状态:成功态 resolve 失败态 reject 等待态 pending（既不成功也不失败）
2. promise 默认执行器时立即执行
3. promise-旦成功就不能失败, 反过来也一样的
4. 用户自己决定成功/失败、失败/成功的原因
5. 如果执行函数时发生了异常也会执行失败逻辑
6. promise 的实例都拥有一个 then 方法，一个参数是成功的回调,另一个失败的回调
