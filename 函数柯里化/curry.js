{
  let curry = function(fn){
    let args = Array.from(arguments).slice(1)
    return function(){
      let innerArgs = Array.from(arguments)
      let totalArgs = [...args,...innerArgs]
      return fn.apply(null,totalArgs)
    }
  }

  let add = (num1,num2) => num1 + num2

  let curryAdd = curry(add,5)

  console.log(curryAdd(3))
}

{
  let bind = (fn,context) => {
    let args = Array.from(arguments).slice(2)
    return function(){
      let innerArgs = Array.from(arguments)
      let totalArgs = [...args,...innerArgs]
      return fn.apply(context,totalArgs)
    }
  }
}