// 打包程序
const fs = require("fs");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;


function createAsset() {
  // 1. 获取文件的内容
  let source = fs.readFileSync('../main.js', "utf-8");
  // console.log('mian.js 文件内容: ', source);

  // 2. 借助 ast 来去解析 获取到依赖 
  const ast = parser.parse(source, {
    sourceType: "module",
  });
  // console.log('mian.js ast: ', ast);
  
  const deps = [];
  traverse(ast, {
    ImportDeclaration({ node }) {
      deps.push(node.source.value);
      // console.log('导入文件信息: ', node.source.value);
    },
  });

  // 导出文件内容和依赖
  return {
    source,
    deps,
  };
}

const mianjs = createAsset();
console.log('main.js: ', mianjs)
