"use strict";

const filter = require("./filter"); // Import filter function from current directory
// Import class ERR_INVALID_ARG_TYPE from errors directory
const ERR_INVALID_ARG_TYPE = require("../errors/ERR_INVALID_ARG_TYPE");

// Declare falses
const f = ["undefined", "null"];

// Declare types
const t = [
  "boolean",
  "number",
  "bigint",
  "string",
  "symbol",
  "function",
  "object"
];

// Export statement function
module.exports = refs => {
  // Throw error if references argument is not an array
  if (!Array.isArray(refs)) {
    throw new ERR_INVALID_ARG_TYPE("references", "an instance of Array", refs);
  }

  // Filter references
  refs = filter(refs);

  // Resolve empty array
  if (!refs.length) {
    refs = ["undefined"];
  }

  // Declare falses, types & instances
  const fls = [], tps = [], ins = [];

  // Sort out non-strings or empty strings & push to allotted array
  refs.forEach(x => {
    if (f.includes(x)) {
      fls.push(x);
    } else if (t.includes(x)) {
      tps.push("a type of " + x);
    } else {
      ins.push("an instance of " + x);
    }
  });

  // Declare statement component arrays & flat
  const st = [fls, tps, ins].flat();

  // Return if statement array's length is lesser than 2
  if (st.length < 2) return st[0];

  // Shift last string from array
  const lt = st.reverse().shift();

  // Return final statement
  return st.reverse().join(", ") + " or " + lt;
};
