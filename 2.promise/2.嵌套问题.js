let fs = require("fs");

function read(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, "utf8", function (err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  });
}
read("./name.txt").then(
  (data) => {
    read(data).then(
      (data) => {
        console.log(`data:${data}`);
      },
      (err) => {
        console.log(`err:${err}`);
      }
    );
    console.log(`data:${data}`);
  },
  (err) => {
    console.log(`err:${err}`);
  }
);