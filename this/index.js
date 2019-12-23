/**
 * this的绑定规则及使用场景
 */

 // 1. 使用 new 声明的实例

 let obj = {
   name: 'yunrong',
   logName(){
     return this.name
   }
 }
 
 let newFn = function (name,age) {
   this.name = name
   this.age = age

 }

 newFn.prototype.sayName = function () {
   return this.name
 }

 let p1 = new newFn('lc',21)

 
 console.log(obj.logName.call(p1))

 console.log(p1.sayName.call(obj))