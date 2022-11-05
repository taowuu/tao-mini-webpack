// 打包程序

const fs = require("fs");

function createAsset() {
  // 1. 获取文件的内容
  let source = fs.readFileSync('../main.js', "utf-8");
  console.log('mian.js 文件内容: ', source)
  
  // 
  return {}
}

createAsset()
