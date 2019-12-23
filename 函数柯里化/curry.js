//柯里化
// {
//   let curry = function(fn,args = []){
//     return function(...innerArgs){
//       let totalArgs = [...args,...innerArgs]
//       return totalArgs.length === fn.length ? fn.apply(null,totalArgs) 
//                                             : curry(fn,totalArgs)
//     }
//   }

//   let add = (num1,num2,num3,num4) => num1 + num2 + num3 + num4

//   let curryAdd = curry(add)

//   console.log(curryAdd(4)(5)(6)(7))
// }


//偏函数
{
  let bind = (fn,context) => {
    let args = Array.from(arguments).slice(2)
    return function(){
      let innerArgs = Array.from(arguments)
      let totalArgs = [...args,...innerArgs]
      return fn.apply(context,totalArgs)
    }
  }

  let add = (a,b)=> a + b

  let addPlus = add.bind(null,2)

  console.log(addPlus(3))
}