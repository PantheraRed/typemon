"use strict";

module.exports = {
  bindChecker: require("./utils/bindChecker"),
  check: require("./utils/check"),
  sort: require("./utils/sort"),
  statement: require("./utils/statement"),
  type: require("./utils/type"),
  ERR_INVALID_ARG_TYPE: require("./errors/ERR_INVALID_ARG_TYPE")
};

Object.defineProperty(module.exports, "version", {
  value: require("../package").version
});
