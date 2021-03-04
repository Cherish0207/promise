
let fs = require("fs");
let school = {};
const cb = after(2, () => {
  console.log(school);
});
function after(times, callback) {
  return function () {
    if (--times === 0) {
      callback();
    }
  };
}
fs.readFile("./name.txt", "utf8", function (err, data) {
  school.name = data;
  cb();
});
fs.readFile("./age.txt", "utf8", function (err, data) {
  school.age = data;
  cb();
});
