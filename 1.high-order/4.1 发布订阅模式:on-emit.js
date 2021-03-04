// 面向切片 先存到数组里，再依次执行
let fs = require("fs");
let school = {};
let event = {
  arr: [],
  emit() {
    this.arr.forEach((fn) => fn());
  },
  on(fn) {
    this.arr.push(fn);
  },
};
event.on(function() {
  if(Object.keys(school).length === 2) {
    console.log(school);
  }
})
fs.readFile("./name.txt", "utf8", function (err, data) {
  school.name = data;
  event.emit();
});
fs.readFile("./age.txt", "utf8", function (err, data) {
  school.age = data;
  event.emit();
});

