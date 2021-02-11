# Typemon

A NodeJS module for checking or specifying a type of argument or instances.

### Installation

```
npm install typemon
```

### About

Typemon is short for "type monster". A module comprising of functions that can be used for specifying or checking types & instances of any argument. Module's main file is `./src/index.js`. `index.js` contains `bindChecker`, `check`, `sort`, `statement`, `type`, `ERR_INVALID_ARG_TYPE` & a hidden property `version`.

### Usage

We'll be going through examples for each of the following functions. Note that some of these are irrelevant to checking or specifying types & instances.

#### type(obj)

It returns type of any object passed as an argument (only common types except null). Since typeof operator does not resolve null object. It would make sense to have your own type function to resolve this problem.

```js
const { type } = require("typemon");

type(undefined); // returns "undefined"
type(); // returns "undefined" since arg is undefined

type(null); // returns "null"
type(true); // returns "boolean"
type(0); // returns "number"
type(0n); // returns "bigint"
type(""); // returns "string"
type(Symbol()); // returns "symbol"
type(() => {}); // returns "function"
type({}); // returns "object"
```

#### ERR_INVALID_ARG_TYPE(arg, type, obj[, cb])

I'll be including this one after type since it is a class that extends Error which is used in other functions as custom error.

It is essential in creating dynamic error statements by providing "arg", "type" & "obj" arguments. "cb" which is short for callback is an optional argument since it's usage is only when "obj" statement has to be altered.

```js
const { ERR_INVALID_ARG_TYPE } = require("typemon");

try {
  const x = true;

  // Case 1:
  throw new ERR_INVALID_ARG_TYPE("x", "of type string", x);

  // Case 2:
  throw new ERR_INVALID_ARG_TYPE("x", "of type string", null, () => "true");

  // Case 3:
  throw new ERR_INVALID_ARG_TYPE();
} catch (err) {
  console.error(err + "");

  // Case 1:
  // TypeError [ERR_INVALID_ARG_TYPE]: The "x" argument must be of type string. Received boolean (true)

  // Case 2:
  // TypeError [ERR_INVALID_ARG_TYPE]: The "x" argument must be of type string. Received true

  // Case 3:
  // TypeError [ERR_INVALID_ARG_TYPE]: The "undefined" argument must be undefined. Received undefined
}
```

#### sort(arr)

This one is irrelevant since it sorts out non-string & empty string values from an array.

```js
const { sort } = require("typemon");

sort(); // will throw TypeError since "arr" argument is undefined

sort([]); // returns []
sort([0, "", "Hello World!"]); // returns ["Hello World!"]
```

#### check(refs, val)

It checks type of any object passed as an argument against the array of string values containing type or instance name (references) & returns boolean. Note that instances are checked against constructor's name.

```js
const { check } = require("typemon");

check(); // Throws TypeError since "refs" value which is array of string values or references is compulsory here

check([]); // returns true since "val" arg is undefined & [] is resolved to ["undefined"]
check([], ""); // returns false

// Make custom function for convenience
const ck = x => check(["null", "string", "Array"], x);

ck(); // returns false
ck(true); // returns false

ck(null); // returns true
ck(""); // returns true
ck([]); // returns true
```

#### statement(arr)

This function is essential in creating dynamic "list" statement of provided types. Argument must be an array of string values. Since an array of pre-declared types is used to check common types. It resolves unknown "falsy" (undefined & null) or "type" to an "instance". Returns a string.

```js
const { statement } = require("typemon");

statement(); // will throw TypeError since "refs" arg is not an array

statement([]); // returns "undefined"
statement([0]); // returns "undefined"

statement(["null"]); // returns "null"
statement(["string"]); // returns "of type string"
statement(["Array"]); // returns "an instance of Array"
```

#### bindChecker(func, arg1, arg2, ..., argN)

This function binds a checker function on top of function passed as an argument. Arguments after "func" argument can be enumerable (arg1, arg2, ..., argN) but must be object of properties "name" and "refs" which is an array of string values. Returns bound function with name set to provided function's name.

```js
const { bindChecker } = require("typemon");

bindChecker(); // will throw TypeError since "func" argument is undefined

// Declare your function
const myFunction = (x, y) => x + y;

// Declare specifications
const specs = [
  { name: "x", refs: ["number"] },
  { name: "y", refs: ["number"] }
];

// Declare bound function (optional)
const boundFunction = bindChecker(myFunction, ...specs);

boundFunction(2, 3); // returns 5
boundFunction(null, 3);
// Throws TypeError since "x" argument has specification of a number but received null object
```

### License

Refer to [LICENSE](LICENSE) file

### Quick Links

- [GitHub Repository](https://github.com/PantheraRed/typemon.git)
