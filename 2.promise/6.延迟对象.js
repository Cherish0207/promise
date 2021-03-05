let fs = require("fs");
const MyPromise = require("./0. mypromise");
function read(filename) {
  return new MyPromise((resolve, reject) => {
    fs.readFile(filename, "utf8", function (err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  });
}
read("./name.txt")
  .then((data) => {
    return read(data);
  })
  .then((data) => {
    console.log(data);
  });
