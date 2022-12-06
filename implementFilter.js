Array.prototype.myFilter = function (callback, thisObj = null) {
  let result = [];
  let l = this.length;

  for (let i = 0; i < l; i++) {
    if (i in this) {
      let filteredValue = callback.call(thisObj, this[i], i, this);
      result[i] = filteredValue;
    }
  }
  return result;
};

const arr = [1, 2, 3, 4];

console.log(arr.filter((i) => i % 2 === 0));
