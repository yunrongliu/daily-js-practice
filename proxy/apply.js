/**
 * apply 会拦截以下对象操作
 * apply,call,Reflect.apply,proxy(...args)(被代理对象的函数调用)
 */

 {
   globalThis.c = 2
   let p = new Proxy(function(a,b) {
    console.log(a + b + this.c)
    return a + b + this.c
   },{
     apply(target,thisArg,args) {
       console.log(target,thisArg,args)
       return Reflect.apply(target,thisArg,args)
     }
   })

   p(1,2)

   let obj = {
     c: 9
   }

   p.call(obj,1,2)
 }