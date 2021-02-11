"use strict";

const sort = require("./sort");
const ERR_INVALID_ARG_TYPE = require("../errors/ERR_INVALID_ARG_TYPE");

const f = ["undefined", "null"];
const t = [
  "boolean",
  "number",
  "bigint",
  "string",
  "symbol",
  "function",
  "object"
];

module.exports = refs => {
  if (!Array.isArray(refs)) {
    throw new ERR_INVALID_ARG_TYPE("refs", "an instance of Array", refs);
  }
 
  if (!refs.length) {
    refs[0] = "undefined";
  }
 
  const fls = [], tps = [], ins = [];
  sort(refs).forEach(x => {
    if (f.includes(x)) {
      fls.push(x);
    } else if (t.includes(x)) {
      tps.push("a type of " + x);
    } else {
      ins.push("an instance of " + x);
    }
  });

  const st = [...ins, ...tps, ...fls];

  if (st.length < 2) return st[0];

  const lt = st.shift();
  return st.reverse().join(", ") + " or " + lt;
};
