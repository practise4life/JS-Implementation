function debounce(func, wait) {
  let timer = null
  return function(...args) {
    window.clearTimeout(timer)
    timer = window.setTimeout(() => {
      func.call(this, ...args)
    }, wait)
  }
}
