"use strict";

// Resolve type for object "null" & export type function
module.exports = x => x === null ? "null" : typeof x;
