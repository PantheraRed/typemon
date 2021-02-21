"use strict";

// Export modules
module.exports = {
  type: require("./utils/type"),
  whatis: require("./utils/whatis"),
  ERR_INVALID_ARG_TYPE: require("./errors/ERR_INVALID_ARG_TYPE"),
  check: require("./utils/check"),
  statement: require("./utils/statement"),
  bindChecker: require("./utils/bindChecker")
};

// Hide package version
Object.defineProperty(module.exports, "version", {
  value: require("../package").version
});
