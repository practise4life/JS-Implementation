// For every function to have access to myBind add it to function prototype
// myBind method should be able to return a function
// When we call the boundFunction i.e. the printName should be executed  which can be accessed by this variable
// We can call the function using obj.call() and pass the context
// Context is in the args[0]
// To access rest of the arguments passed we do so by slice(args[1])

// Polyfill is a browser fallback, if the bowser does not have a bind function and we have to write our own bind function

let person = {
  firstName: "Akshay",
  lastName: "Saini",
};

let person2 = {
  firstName: "Akshay",
  lastName: "Chikanda",
};

let printName = function (hometown, state) {
  console.log(
    this.firstName + " " + this.lastName + "," + hometown + ", " + state
  );
};

let printMyName = printName.bind(person, "Dehradun");
printMyName("Himachal Pradesh");

Function.prototype.myBind = function (...args) {
  let obj = this;
  params = args.slice(1);
  return function (...args2) {
    obj.apply(args[0], [...params, ...args2]);
  };
};

let printMyName2 = printName.myBind(person2, "Bellary");
printMyName2("Karnataka");
