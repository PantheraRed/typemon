"use strict";

const ERR_INVALID_ARG_TYPE = require("../errors/ERR_INVALID_ARG_TYPE");

module.exports = arr => {
  if (!Array.isArray(arr)) {
    throw new ERR_INVALID_ARG_TYPE("arr", "an instance of Array", arr);
  }

  return arr.filter(x => typeof x === "string" && x.length);
};
