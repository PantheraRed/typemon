"use strict";

const whatis = require("../utils/whatis"); // Import whatis function from utils directory

// Declare default callback
const def = x => whatis(x);

// Extend Error class
class ERR_INVALID_ARG_TYPE extends Error {
  constructor(name, st, obj, cb = def) {
    // Declare reset function
    const reset = (o, n, s, c) => {
      obj = o; name = n; st = s; cb = c;
    };
    // Change value of arguments if any argument is of invalid type
    if (typeof name !== "string") {
      reset(name, "name", "of type string", def);
    } else if (typeof st !== "string") {
      reset(st, "statement", "of type string", def);
    } else if (typeof cb !== "function") {
      reset(cb, "callback", "of type function", def);
    }

    // Generate error message
    super(`The "${name}" argument must be ${st}. Received ${cb(obj)}`);
  }

  // Change constructor's name
  name = `TypeError [${this.constructor.name}]`;
}

// Export class ERR_INVALID_ARG_TYPE
module.exports = ERR_INVALID_ARG_TYPE;
