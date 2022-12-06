Array.prototype.myReduce = function (callback, initialValue) {
  let arr = this; //Array on which reduce is called
  let argumentsLength = arguments.length; //Arguments passed to reduce function (callback and initialValue)

  if (arr.length === 0 && argumentsLength === 1) {
    throw new Error("Reduce of empty array with no initial value");
  }
  let accumulator = argumentsLength === 1 ? arr[0] : initialValue;
  let index = argumentsLength === 1 ? 1 : 0;
  //since we have used 1st item in the array as accumulator, we need to skip 1st iteration

  for (let i = 0; i < arr.length; i++) {
    accumulator = callback(accumulator, arr[i], arr);
  }

  return accumulator;
};

let array = [1, 2, 3];

console.log(
  array.myReduce((acc, curr) => {
    acc = acc + curr;
    return acc;
  }, 0)
);
