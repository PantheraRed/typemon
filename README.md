<div align="center">
  <p>
    <a href="https://www.npmjs.com/package/typemon"><img src="https://user-images.githubusercontent.com/41539361/114969021-23a0f980-9e95-11eb-9d15-5aaf625078ad.png" width="500" alt="typemon" /></a>
  </p>
  <p>
    <a href="https://www.npmjs.com/package/typemon"><img src="https://img.shields.io/npm/v/typemon.svg?maxAge=3600" alt="npm version" /></a>
    <a href="https://www.npmjs.com/package/typemon"><img src="https://img.shields.io/npm/dt/typemon.svg?maxAge=3600" alt="npm downloads" /></a>
  </p>
  <p>
    <a href="https://nodei.co/npm/typemon/"><img src="https://nodei.co/npm/typemon.png?downloads=true&stars=true" alt="npm info" /></a>
  </p>
</div>

# Table of Contents

- [About](#about)
- [Installation](#installation)
  - [Requirements](#requirements)
- [Usage](#usage)
  - [type](#type)
  - [whatis](#whatis)
  - [ERR_INVALID_ARG_TYPE](#err_invalid_arg_type)
  - [check](#check)
  - [statement](#statement)
  - [bindChecker](#bindchecker)
- [License](#license)
- [Quick Links](#quick_links)

# About

A NodeJS module for checking or specifying types & instances of any argument.

# Installation

`npm install typemon`

### Requirements

- **Node.js:** `v14 or above`

# Usage

### type

The type function returns type of any object. It returns an additional type "null" for object [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null).

```js
type(object);
```

#### Arguments

- ##### object\<Any>
  The object to get type of.

#### Examples

The examples below show the basic usage.

```js
const { type } = require("typemon");

type(); // Returns "undefined"
type(undefined); // Returns "undefined"

type(null); // Returns "null"
type(true); // Returns "boolean"
type(0); // Returns "number"
type(0n); // Returns "bigint"
type(""); // Returns "string"
type(Symbol()); // Returns "symbol"
type(() => {}); // Returns "function"
type({}); // Returns "object"
```

### whatis

The whatis function generates dynamic object statements for any object passed as an argument.

```js
whatis(object);
```

#### Arguments

- ##### object\<Any>
  The object to get statement of.

#### Examples

The examples below show the basic usage.

```js
const { whatis } = require("typemon");

whatis(); // Returns "undefined"
whatis(undefined); // Returns "undefined"
whatis(null); // Returns "null"

whatis(""); // Returns "type string ('')"
whatis(true); // Returns "type boolean (true)"
whatis(0); // Returns "type number (0)"

whatis(() => {}); // Returns "type function (anonymous)"
whatis([]); // Returns "an instance of Array"
whatis(/(?:)/); // Returns "an instance of RegExp"
```

### ERR_INVALID_ARG_TYPE

The class `ERR_INVALID_ARG_TYPE` extends [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error). It generates dynamic error messages.

```js
new ERR_INVALID_ARG_TYPE(argument, statement, object[, callback]);
```

#### Arguments

- ##### name\<[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>
  The name of argument.
- ##### statement\<[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>
  The statement specifying required type or instance.
- ##### object\<Any>
  The target object.
- ##### callback\<[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)>
  The callback argument is optional. The `object` argument is passed as an argument. Default callback:

  ```js
  x => whatis(x);
  ```

  [<img src="./src/assets/go_to.svg" width="16" /> whatis](#whatis)

#### Examples

If arguments `name`, `statement` or `callback` are of invalid types, class will throw [`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError).

```js
const { ERR_INVALID_ARG_TYPE } = require("typemon");

try {
  throw new ERR_INVALID_ARG_TYPE(); // Throws an error
} catch (err) {
  console.log(err + "");
  // TypeError [ERR_INVALID_ARG_TYPE]: The "name" argument must be of type string. Received undefined
}
```

The examples below show the basic usage.

```js
const { ERR_INVALID_ARG_TYPE } = require("typemon");

function example(str) {
  if (typeof str !== "string") {
    throw new ERR_INVALID_ARG_TYPE("str", "of type string", str);
  }

  return str.toLowerCase();
}

try {
  example("HELLO WORLD!"); // Returns "hello world!"
  example(0); // Throws an error
} catch (err) {
  console.log(err + "");
  // TypeError [ERR_INVALID_ARG_TYPE]: The "str" argument must be of type string. Received type number (0)
}
```

Since, it offers a `callback`, the "received" object statements can be altered.

```js
const { ERR_INVALID_ARG_TYPE } = require("typemon");

function example(str) {
  if (!str.length) {
    throw new ERR_INVALID_ARG_TYPE("str", "a non-empty string", null, () => "an empty string");
  }

  return str.toLowerCase();
}

try {
  example("HELLO WORLD!"); // Returns "hello world!"
  example(""); // Throws an error
} catch (err) {
  console.error(err + "");
  // TypeError [ERR_INVALID_ARG_TYPE]: The "str" argument must be a non-empty string. Received an empty string
}
```

### check

The check function checks whether or not type or instance name of object matches a type or instance name from array of strings containing type & instance names collectively known as `references`.

```js
check(references, object);
```

#### Arguments

- ##### references\<[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)>
  The references argument is an array of strings containing type & instance names.
- ##### object\<Any>
  The object to be checked.

#### Examples

Since, `references` argument has a fixed type [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). The function will throw [`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) for invalid types.

```js
const { check } = require("typemon");

try {
  check(); // Throws an error
} catch (err) {
  console.log(err + "");
  // TypeError [ERR_INVALID_ARG_TYPE]: The "references" argument must be an instance of Array. Received undefined
}
```

Note that the `check` function resolves empty array to [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) containing type name "undefined".

```js
const { check } = require("typemon");

check(["undefined"]);
// Same as doing below

check([]); // Array becomes ["undefined"]
```

Also note that the `check` function filters out non-string or empty string values from received [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

```js
const { check } = require("typemon");

check([0]); // Array becomes ["undefined"]
check([0, "string"]); // Array becomes ["string"]
```

The examples below show the usage.

```js
const { check } = require("typemon");

check(["null"]); // Returns false
check(["string"]); // Returns false
check(["Array"]); // Returns false

// Make custom function for convenience
const ch = x => check(["null", "string", "Array"], x);

ch(); // Returns false
ch(true); // Returns false
ch(0); // Returns false

ch(null); // Returns true
ch(""); // Returns true
ch([]); // Returns true
```

### statement

The statement function generates dynamic type & instance statements.

```js
statement(references);
```

#### Arguments

- ##### references\<[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)>
  The references argument is an array of strings containing type & instance names.

#### Examples

Just like [`check`](#check) function, the `references` argument has a fixed type [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). The function will throw [`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) for invalid types.

```js
const { statement } = require("typemon");

try {
  statement(); // Throws an error
} catch (err) {
  console.log(err + "");
  // TypeError [ERR_INVALID_ARG_TYPE]: The "references" argument must be an instance of Array. Received undefined
}
```

The examples below show the basic usage. Note that just like [`check`](#check) function `statement` function also resolves & filters out non-string or empty string values from [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

```js
const { statement } = require("typemon");

statement([]); // Returns "undefined"

statement(["null"]); // Returns "null"
statement(["string"]); // Returns "of type string"
statement(["Array"]); // Returns "an instance of Array"

statement(["null", "string", "Array"]);
// Returns "null, of type string or an instance of Array"
```

### bindChecker

The bindChecker function binds an anonymous function to the function passed as an argument. It uses [`check`](#check) function to match type & instance names for each argument.

```js
bindChecker(specifications, func[, callback]);
```

#### Arguments

- ##### specifications\<[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)>
  The specifications argument is an array of objects with properties `name` & `references`. Here, `name` property must be a [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) & `references` property must be an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) of strings containing type & instance names.
- ##### func\<[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)>
  The target function.
- ##### callback\<[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)>
  The callback argument is optional. An object with properties `name`, `references`, `valid` & `value` is passed as an argument. Default callback:

  ```js
  x => {
    // Throw error if argument is of invalid type
    if (!x.valid) {
      throw new ERR_INVALID_ARG_TYPE(x.name, statement(x.references), x.value);
    }

    // Return argument
    return x.value;
  };
  ```

  [<img src="./src/assets/go_to.svg" width="16" /> ERR_INVALID_ARG_TYPE](#err_invalid_arg_type)

  [<img src="./src/assets/go_to.svg" width="16" /> statement](#statement)

#### Examples

The arguments `specifications`, `func` & `callback` have fixed types. The function will throw [`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) for invalid types.

```js
const { bindChecker } = require("typemon");

try {
  bindChecker(); // Throws an error
} catch (err) {
  console.log(err + "");
  // TypeError [ERR_INVALID_ARG_TYPE]: The "specifications" argument must be an instance of Array. Received undefined
}
```

Since, `bindChecker` uses [`check`](#check) for each argument. Each [`object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) from `specifications` array must contain properties `name` & `references`. Property `name` must be of type [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) & `references` property must be an instance of [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) or the function will throw [`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError).

```js
const { bindChecker } = require("typemon");

try {
  bindChecker([{}]); // Throws an error
} catch (err) {
  console.log(err + "");
  // TypeError [ERR_INVALID_ARG_TYPE]: The "specification.name" argument must be of type string. Received undefined
}
```

If `specifications` argument is an empty array. It resolves to array containing [`object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) with properties `name` & `references` with values set to empty string and empty array.

```js
const { bindChecker } = require("typemon");

const specs = [
  { name: "", references: [] }
];

bindChecker(specs, () => {})(); // Returns undefined
bindChecker([], () => {})(); // Returns undefined
```

The examples below show the basic usage.

```js
const { bindChecker } = require("typemon");

// Declare specifications
const specs = [
  { name: "x", references: ["number"] },
  { name: "y", references: ["number"] }
];

const sum = bindChecker(specs, (x, y) => x + y);

try {
  sum(2, 3); // Returns 5
  sum(null, 3); // Throws an error
} catch (err) {
  console.log(err + "");
  // TypeError [ERR_INVALID_ARG_TYPE]: The "x" argument must be of type number. Received null
}
```

The `bindChecker` function also offers a `callback`.

```js
const { bindChecker } = require("typemon");

// Declare specifications
const specs = [
  { name: "str", references: ["string"] }
];

// Declare function
const example = bindChecker(specs, str => str.toLowerCase(), console.log);

example("HELLO WORLD!"); // Returns "hello world!"
/* Logs
 {
  name: 'str',
  references: ['string'],
  valid: true
  value: 'HELLO WORLD!'
 } */
```

You can alter the default `callback` & prevent it from throwing error.

```js
const { bindChecker } = require("typemon");

// Declare callback function
const resolveToNumber = x => typeof x.value === "number" ? x.value : 0;

// Declare function
const example = bindChecker([], x => x + 1, resolveToNumber);

example(); // Returns 1
example(""); // Returns 1
example(1); // Returns 2
```

### License

Refer to [LICENSE](LICENSE) file

### Quick Links

- [GitHub Repository](https://github.com/PantheraRed/typemon.git)
- [NPM](https://www.npmjs.com/package/typemon)
