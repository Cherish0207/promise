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

### promise 异步调用处理

1. promise 调用 then 方法时，可能当前的 promise 并没有成功 -- pending。
2. --> 发布订阅模式: 如果当前状态是 pending, 我们需要将成功的回调和失败的回调存放起来,稍后调用 resolve 和 reject 的时候重新执行
3. 所有的库都离不开发布订阅模式，只要解决和异步相关的问题，都会用到发布订阅模式

### 解决恶魔金字塔/回调函数嵌套

1. promise 成功/失败的回调的返回值，都可以传递到外层的下一个 then
2. 如果返回的是出错的情况 ---> 不管是成功还是失败的回调返回值，都会传递到下一次的失败中,
   如果返回的是 promise ---> 会采用 promise 的状态,决定走下一次的成功还是失败
   ** 错误处理 --> 如果离自己最近的 then 没有错误处理（没有写错误处理函数）会向下找 **
   如果返回的是普通值 （包含除了 promise/出错的所有其他情况：没有 return/undefined ） ---> 不管是成功还是失败的回调返回值，都会传递到下一次的成功中, 3.每次执行完 promise.then 方法后返回的,并不是实例本身，而是一个“新的 promise" ( promise-旦成功或者失败就不能修改状态)
   catch 不属于规范里的

没法自己实现微任务，可以借助一些方法 除非是 v8 帮你提供的
测试写的库是否符合规范 github.com/promises-aplus/promises-tests
规范中值规定了then的写法，没有finally和catch
```bash
npm i promises-aplus-tests -g
promises-aplus-tests ./2.promise/promise.js
```

git commit -m "3.6 规范测试"