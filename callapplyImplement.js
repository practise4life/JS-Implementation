// CALL POLYFILL
// args is arguments one by one
Function.prototype.mycall = function (context, ...args) {
  // you tie a function into an object(context) as if it belonged to the object
  const symbol = Symbol(); // create unique key

  context = Object(context || window); // set context to windows if null and Create an object to handle primitive values
  // 'this' points to the calling function here
  context[symbol] = this; // assign the function to a unique method created on the context
  const result = context[symbol](...args); // call the function
  delete context[symbol]; // delete the unique key
  return result; // return result
};

// APPLY POLYFILL
// code exact same as call just the args is an array here so need to destruct(...)
Function.prototype.myapply = function (context, args) {
  // you tie a function into an object(context) as if it belonged to the object
  const symbol = Symbol(); // create unique key

  context = Object(context || window); // set context to windows if null and Create an object to handle primitive values
  // 'this' points to the calling function here
  context[symbol] = this; // assign the function to a unique method created on the context
  const result = context[symbol](...args); // call the function
  delete context[symbol]; // delete the unique key
  return result; // return result
};

// Testing
let obj = {
  a: 10,
  b: 20,
};

function tester(a, b) {
  return `a: ${this.a} and b: ${this.b} | curr args a: ${a} and b: ${b}`;
}

console.log(tester.mycall(obj, 30, 40));

console.log(tester.myapply(obj, [90, 40]));
