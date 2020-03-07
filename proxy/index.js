/**
 * proxy
 */
 //代理对象的不存在属性访问
 let handler = {
   get: function(target,name){
     return Reflect.get(target,name) ? target[name] : {}
   }
 }

 let p = new Proxy({},handler)

 console.log(p.a)
 console.log(p.b)