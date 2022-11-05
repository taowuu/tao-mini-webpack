# tao-webpack

## Webpack 是什么
- 把多个文件打包成 bundle
- 解决变量冲突

## 第一步
- 初始化环境
- `bundle.js` 打包结果
- `inedx.js` 打包程序
- 目标是分析依赖图谱生成 bundle
- 移步至第二步分支

## 第二步
- 获取 `mian.js` 的内容 `node index.js`
- 根据主程序的内容生成依赖关系
- 移步至第三步分支

## 第三步
- 借助 ast 解析获取依赖关系
- 安装库
    ```
    遍历 ast
    "@babel/traverse": "^7.16.3"
    生成 ast
    @babel/parser
    ```
- 此时可以得到 `mian.js` 的内容和依赖
- 移步至第四步分支

## 第四步
- 广度优先获取 main.js 依赖
- 根据内容和依赖构 建依赖图谱
- 通过依赖图谱构建打包后代码
- 准备 `bundle.ejs` cjs 模板
- 安装 `babel-preset-env` 转化代码为 es5
- 安装 `ejs` 根据模板打包代码
- 解决路径映射
