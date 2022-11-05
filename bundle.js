// 1. 如何把 esm 转换成 cjs 的形式
// 2. 需要自己去写自己的 require 方法

(function (modules) {
  function require(id) {
    let module = { exports: {} };

    // TODO 如何通过 filename 找到对应的函数呢？
    // key filename  -> fn
    // 1. 需要通过 filename 找到对应的模块函数
    const [fn, mapping] = modules[id];

    function localRequire(filename) {
      const id = mapping[filename]
      return require(id)
    }

    fn(localRequire, module, module.exports);

    return module.exports;
  }

  require("./main.js")
})({
  // 文件名重复 过长问题
  1: [function (require, module, exports) {
    exports.foo = function () {
      console.log("foo");
    };
  }, {
    './foo.js': 2
  }], 
  2: function (require, module, exports) {
    const { foo } = require("./foo.js");

    console.log("main");
    foo();
  },
});
