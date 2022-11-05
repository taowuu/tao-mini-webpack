// 打包程序
const fs = require("fs");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const path = require("path");


function createAsset(filename) {
  // 1. 获取文件的内容
  let source = fs.readFileSync(filename, "utf-8");
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

function createGraph(filename) {
  // 根据内容和依赖构建依赖图谱
  const mainAsset = createAsset(filename);
  const dirname = path.dirname(filename);
  const queue = [mainAsset];

  // 广度优先获取 main.js 依赖
  for (const asset of queue) {
    asset.deps.forEach((relativePath) => {
      // console.log('relativePath, ', relativePath);
      // 获取 ./example/foo.js 的内容和依赖
      const child = createAsset(path.resolve(dirname, relativePath));
      // console.log('child ', child)
      // 外层 for 继续获取 ./example/tao.js 的内容和依赖
      queue.push(child)
    });
  }
  console.log('queue ', queue)
}

function test() {
  // const mianjs = createAsset();
  // console.log('main.js: ', mianjs)

  createGraph('./example/main.js')
}

test()