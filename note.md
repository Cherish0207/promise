## promise 课程复习总结

1. 总结常见的高阶函数应用场景

- 参数和返回值都是函数:before 函数
- 返回值是函数:curry--isType 延伸:实现一个通用的函数柯里化

## promise 课程内容

1. 掌握高阶函数的使用,并使用其解决异步问题
2. 掌握发布订阅模式与观察者模式
3. 掌握 promise 核心应用,并用其解决异步编程问题
4. 实现一个完整符合 promise A+规范的 promise)库
5. 企业真实面试中,怎么考察 promise?
6. 实现 promise 中常用的方法 all, race、 finally
7. 掌握 generator 的使用以及 CO 库的原理
8. 异步终极解决方案 async+await 的原理

## 1.high-order

什么是高阶函数: 满足两条中的任意一条即可

1. 如果一个函数的参数是一个函数(回调函数就是一种高阶函数)
2. 如果一个函数返回一个函数当前这个函数也是一个高阶函数

### 1.1 before --> 1，2 都有

### 1.2 curry --> 2

把函数进行细分，把一个大的范围变成一个小的范围

## 2.高阶函数的应用场景:为了稍后写 promise 做铺垫

vue/react/angular 框架包括 node 里，经常会使用高阶函数，一层套一层，能够解决很多问题
而且用高阶函数的方式可以演变出很多设计模式


## [15道ES6 Promise实战练习题，助你快速理解Promise](https://mp.weixin.qq.com/s/tetfPizYwMtr-XlBRfZAQA)