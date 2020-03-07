/**
 * @param gen {generator 函数 }
 */
const timeSlice = function (gen) {
  if (typeof gen === 'function') gen = gen()
  if(!gen || typeof gen.next !== 'function') return;
  return function next() {
    const start = performance.now()
  }
}