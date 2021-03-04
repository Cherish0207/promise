// 发布订阅模式vs观察者模式
// 订阅和发布没有明显的关联, 靠中介来事;
// 观察者模式:
//  有观察者和被观察者，
//  观察者需要放到被观察者中,被观察者的状态发生变化需要通知观察者
// 内部也是基于发布订阅模式，收集观察者，状态变化后要通知观察者
class Subject {
  // 被观察者 小宝宝
  constructor() {
    this.state = "happy";
    this.observers = [];
  }
  attach(o) {
    this.observers.push(o);
  }
  setState(newState) {
    this.state = newState;
    this.observers.forEach((o) => o.update(this));
  }
}
class Observer {
  // 观察者 我 我媳妇
  constructor(name) {
    this.name = name;
  }
  update(sub) {
    console.log(`当前${this.name}被通知，当前小宝贝的状态是${sub.state}`);
  }
}
// 我和我媳妇需要观察小宝宝的心里状态的变化
let baby = new Subject("小宝宝");
let father = new Observer("爸爸");
let mother = new Observer("妈妈");
baby.attach(father);
baby.attach(mother);
baby.setState("被欺负了");
