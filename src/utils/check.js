"use strict";

const sort = require("./sort");
const type = require("./type");
const ERR_INVALID_ARG_TYPE = require("../errors/ERR_INVALID_ARG_TYPE");

module.exports = (refs, val) => {
  if (!Array.isArray(refs)) {
    throw new ERR_INVALID_ARG_TYPE("refs", "an instance of Array", refs);
  }

  if (!refs.length) {
    refs[0] = "undefined";
  }

  const t = type(val);
  return sort(refs).includes(t !== "object" ? t : val.constructor.name);
};
