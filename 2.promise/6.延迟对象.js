let fs = require("fs");
const MyPromise = require("./0. mypromise");
function read(filename) {
  let dfd = MyPromise.defer();
  fs.readFile(filename, "utf8", function (err, data) {
    if (err) return dfd.reject(err);
    dfd.resolve(data);
  });
  return dfd.promise;
}
read("./name.txt")
  .then((data) => {
    return read(data);
  })
  .then((data) => {
    console.log(data);
  });
