"use strict";

// Import class ERR_INVALID_ARG_TYPE from errors directory
const ERR_INVALID_ARG_TYPE = require("../errors/ERR_INVALID_ARG_TYPE");

// Export filter function
module.exports = refs => {
  // Throw error if references argument is not an array
  if (!Array.isArray(refs)) {
    throw new ERR_INVALID_ARG_TYPE("references", "an instance of Array", refs);
  }

  // Return filtered array
  return refs.filter(x => typeof x === "string" && x.length);
};
