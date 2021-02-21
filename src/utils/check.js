"use strict";

const filter = require("./filter"); // Import filter function from current directory
const type = require("./type"); // Import type function from current directory
// Import class ERR_INVALID_ARG_TYPE from errors directory
const ERR_INVALID_ARG_TYPE = require("../errors/ERR_INVALID_ARG_TYPE");

// Export check function
module.exports = (refs, obj) => {
  // Throw error if references is not an array
  if (!Array.isArray(refs)) {
    throw new ERR_INVALID_ARG_TYPE("references", "an instance of Array", refs);
  }

  // Filter references
  refs = filter(refs);

  // Resolve empty array
  if (!refs.length) {
    refs = ["undefined"];
  }

  // Declare type string
  const t = type(obj);

  // Return boolean
  return refs.includes(t !== "object" ? t : obj.constructor.name);
};
