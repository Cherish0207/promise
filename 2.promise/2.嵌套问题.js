let fs = require("fs");

function read(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, "utf8", function (err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  });
}
read("./name.txt")
  .then(
    (data) => {
      return read(data);
      // return read(data+1);
    },
    (err) => {
      return err;
    }
  )
  .then(
    (data) => {
      console.log(`收到data：${data}`);
    },
    (err) => {
      console.log(`收到err：${err}`);
    }
  );
