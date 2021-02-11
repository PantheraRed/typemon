"use strict";

const { inspect } = require("util");

class ERR_INVALID_ARG_TYPE extends Error {
  constructor(arg, type, obj, cb = x => x) {
    if (typeof cb !== "function") {
      arg = "cb";
      type = "of type function";
      obj = cb;
      cb = x => x;
    }

    if (obj === undefined || obj === null) {
      obj = obj + "";
    } else if (typeof obj === "object") {
      obj = "an instance of " + obj.constructor.name;
    } else if (typeof obj === "function") {
      obj = `type function (${obj.name ? obj.name : "anonymous"})`;
    } else {
      obj = `type ${typeof obj} (${inspect(obj)})`;
    }

    super(`The "${arg}" argument must be ${type}. Received ${cb(obj)}`);
  }

  name = `TypeError [${this.constructor.name}]`;
}

module.exports = ERR_INVALID_ARG_TYPE;
