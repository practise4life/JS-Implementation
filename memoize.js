//   // If my cache key is in my cache, use that value
//   // Why use function() over () => {} ?
//   // Because function() uses the context from the caller.
//   // Arrow functions use lex scoping, so it'll use the context from the memo function.
//   return function() {
//     const cacheKey = resolver ?  resolver(...arguments) : Array.from(arguments).join(',');

//     if (cache.has(cacheKey)) {
//       console.log('cached');
//       return cache.get(cacheKey);
//     }
//     // Otherwise invoke the function and add it to my cache
//     const val = func.apply(this, arguments);
//     cache.set(cacheKey, val);
//     return val;
//   }
// }
// With this context in mind, check test cases below.
function memo(func, resolver) {
  // your code here
  const cache = new Map();

  // Map<cacheKey, Map<context, value>>
  return function() {
    const cacheKey = resolver ?  resolver(...arguments) : Array.from(arguments).join(',');

    const contextMap = cache.get(cacheKey);
    // If there is a corresponding context map to cachekey
    // Check if context is in the map, if so, return value.
    // Else if no corresponding add contextMap, add new entry to the context map
    if (!contextMap) {
      const value = func.apply(this, arguments);
      cache.set(cacheKey, new Map([[ this, value ]]));
      return value;
    }

    if (contextMap.has(this)) {
      return contextMap.get(this);
    } 
    // If context not in the map, calculate and add to context map.
    const value = func.apply(this, arguments);
    contextMap.set(this, value);
    return value;
  }
}

function testThis(a) {
  return `${this.val}_${a}`;
}

const memoFunc = memo(testThis)

const testSubject = {
  val: 1,
  memo: memoFunc,
}

const testSubject2 = {
  val: 2,
  memo: memoFunc,
}

// 1_1
console.log(testSubject.memo(1));
// Expected no caching and output is 2_1
console.log(testSubject2.memo(1));
// Expected to cache
console.log(testSubject2.memo(1));
