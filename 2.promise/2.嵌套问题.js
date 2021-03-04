let fs = require("fs");

// 回调地狱+错误处理很麻烦
fs.readFile("./name.txt", "utf8", function (err, name) {
  if (err) {
  }
  fs.readFile(name, "utf8", function (err, data) {
    if (err) {
    }
    console.log(data);
  });
});
