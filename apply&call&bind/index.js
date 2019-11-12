/**手动实现apply
 * 
 */

Function.prototype.my_apply = function(){
  //拿到传来的参数
  console.log(Array.from(arguments))
  console.log(Array.from(arguments)[0])
  let [context,...args] = Array.from(arguments)
  if(!context) context = window ? window : global
  
  console.log(...args)
  //利用隐式绑定 改变this指向
  console.log(typeof this)
  context.Func = this
  let result = context.Func(...args)
  delete context.Func
  return result
}

Object.defineProperty(Function,'my_apply',{
  enumerable: false
})

let a = 1
let fn = function(c){
  console.log(this.a)
  console.log(c)
}

let obj = {
  a: 2
}

//1
fn()

//2
fn.my_apply(obj,4,5,6,7)