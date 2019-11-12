/**
 * 函数柯里化
 */

let curry = (fn,...args) => args.length < fn.length ?
                                          (...arguments) => curry(fn,...args,...arguments) 
                                          : fn(...args)


let add = (a,b,c) => {
  console.log(a + b +c) 
}

let curryAdd = curry(add,2,3)
console.log(curryAdd)

curryAdd(4)