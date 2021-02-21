"use strict";

const check = require("./check"); // Import check function from current directory
const statement = require("./statement"); // Import statement function from current directory
const type = require("./type"); // Import type function from current directory
// Import class ERR_INVALID_ARG_TYPE from errors directory
const ERR_INVALID_ARG_TYPE = require("../errors/ERR_INVALID_ARG_TYPE");

// Declare default callback
const def = x => {
  // Throw error if argument is of invalid type
  if (!x.valid) {
    throw new ERR_INVALID_ARG_TYPE(x.name, statement(x.references), x.value);
  }

  // Return argument
  return x.value;
};

// Export bindChecker function
module.exports = (specs, func, cb = def) => {
  // Throw error if any argument is of invalid type
  if (!Array.isArray(specs)) {
    throw new ERR_INVALID_ARG_TYPE("specifications", "an instance of Array", specs);
  } else if (typeof func !== "function") {
    throw new ERR_INVALID_ARG_TYPE("func", "of type function", func);
  } else if (typeof cb !== "function") {
    throw new ERR_INVALID_ARG_TYPE("callback", "of type function", cb);
  }

  // Resolve specifications
  if (!specs.length) {
    specs.push({ name: "(anonymous)", references: [] });
  }

  // Change function name before returning
  return Object.defineProperty((...args) => {
    // Resolve arguments
    for (let i = args.length; i < func.length; i++) {
      args.push(undefined);
    }

    // Resolve specifications
    for (let i = specs.length; i < args.length; i++) {
      specs.push({ name: "(anonymous)", references: [type(args[i])] });
    }

    // Return modified function
    return func(
      // Spread mapped args
      ...args.map((arg, i) => {
        // Declare specification object
        const spec = specs[i];

        // Throw error if any argument is of invalid type
        if (typeof spec !== "object") {
          throw new ERR_INVALID_ARG_TYPE("specification", "of type object", spec);
        } else if (typeof spec.name !== "string") {
          throw new ERR_INVALID_ARG_TYPE("specification.name", "of type string", spec.name);
        } else if (!Array.isArray(spec.references)) {
          throw new ERR_INVALID_ARG_TYPE("specification.references", "an instance of Array", spec.references);
        }

        // Return callback output
        return cb({
          name: spec.name,
          references: spec.references,
          valid: check(spec.references, arg),
          value: arg
        });
      })
    );
  }, "name", { value: func.name });
};
