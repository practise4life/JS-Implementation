Array.prototype.myMap = function (callback, thisObj = null) {
  let result = [];
  let l = this.length;

  for (let i = 0; i < l; i++) {
    if (i in this) {
      let mappedValue = callback.call(thisObj, this[i], i, this);
      result[i] = mappedValue;
    }
  }

  return result;
};

const arr = [1, 2, 3, 4];

console.log(arr.myMap((val, i) => val + i));
