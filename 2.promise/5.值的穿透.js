// const Mypromise = require("./0. mypromise");
let p = new Promise((resolve, reject) => {
  resolve(1);
});
p.then().then().then((data)=>{
  console.log(data);
})