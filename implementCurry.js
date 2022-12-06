function curry(func) {
  // here ...args collects arguments as array (rest)
  return function curriedFunc(...args) {
    // Here we check if current args passed equals the number of args func expects
    if (args.length >= func.length) {
      // if yes, we spread args elements to pass into func (spread). This is our base case.
      return func(...args);
    } else {
      /* if not, we return a function that collects the next arguments passed in next and 
      we recursively call curriedFunc, accumalating and spreading the values of args first and then
      the values of next. next will take into consideration a variable amount of next arguments
      e.g (1, 2) (1) (1,2,3) */
      return function (...next) {
        return curriedFunc(...args, ...next);
      };
    }
  };
}

const join = (a, b, c) => {
  return `${a}_${b}_${c}`;
};
const curriedJoin = curry(join);

console.log(curriedJoin(1, 2, 3)); // '1_2_3'

console.log(curriedJoin(1)(2, 3)); // '1_2_3'

console.log(curriedJoin(1, 2)(3)); // '1_2_3'
