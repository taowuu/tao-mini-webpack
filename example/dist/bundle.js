(function (modules) {
  function require(id) {
    let module = { exports: {} };

    const [fn, mapping] = modules[id];

    function localRequire(filename) {
      const id = mapping[filename]
      return require(id)
    }

    fn(localRequire, module, module.exports);

    return module.exports;
  }

  require(1)
})({
   
  1 : [function (require, module, exports) {
    "use strict";

var _foo = require("./foo.js");

console.log("main");
(0, _foo.foo)(); 
  },
    {"./foo.js":2}
  ],
   
  2 : [function (require, module, exports) {
    "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = foo;

function foo() {
  console.log("foo");
} 
  },
    {}
  ],
   
});
