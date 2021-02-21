"use stirct";

const { inspect } = require("util"); // Import inspect from util module

module.exports = obj => {
  // Resolve object statement
  if (obj === undefined || obj === null) {
    obj = obj + "";
  } else if (typeof obj === "object") {
    obj = "an instance of " + obj.constructor.name;
  } else if (typeof obj === "function") {
    obj = `type function (${obj.name ? obj.name : "anonymous"})`;
  } else {
    obj = `type ${typeof obj} (${inspect(obj)})`;
  }

  // Return object statement
  return obj;
};
