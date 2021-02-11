"use strict";

const check = require("./check");
const statment = require("./statement");
const ERR_INVALID_ARG_TYPE = require("../errors/ERR_INVALID_ARG_TYPE");

module.exports = (func, ...objs) => {
  if (typeof func !== "function") {
    throw new ERR_INVALID_ARG_TYPE("func", "of type function", func);
  }

  return Object.defineProperty((...args) => {
    return func(
      ...args.map((arg, i) => {
        const obj = objs[i];
        if (typeof obj !== "object") {
          throw new ERR_INVALID_ARG_TYPE("obj", "of type object", obj);
        } else if (typeof obj.name !== "string") {
          throw new ERR_INVALID_ARG_TYPE("obj.name", "of type string", obj.name);
        } else if (!obj.name.length) {
          throw new ERR_INVALID_ARG_TYPE("obj.name", "a non-empty string", null, x => "an empty string");
        } else if (!Array.isArray(obj.refs)) {
          throw new ERR_INVALID_ARG_TYPE("obj.refs", "an instance of Array", obj.refs);
        } else if (!check(obj.refs, arg)) {
          throw new ERR_INVALID_ARG_TYPE(obj.name, statment(obj.refs), arg)
        }
 
        return arg;
      })
    );
  }, "name", { value: func.name });
};
