/**
 * 硬绑定 是this的一种绑定方式
 * js 中硬绑定的方式有 call apply bind
 * 下面从使用方式以及实现中来分析原理
 */

/**
 * call
 */

 //call的用法
 {
   let obj1 = {
     a: 1
   }

   let obj2 = {
     a: 2
   }

   let testFunc = function(b){
     console.log(this.a,b)
   }

   let testBindFunc = function(b,c){
     let sum = this.a + b + c
     return sum
   }
  //  testFunc.call(obj1,2) //print: 1 , 2

   /**
    * call的作用：
    *   1.call 是位于function原型上的
    *   2.接收一个context（上下文对象） 然后将这个context绑定到函数对象上 如果接收对象为null 则绑定到全局对象上（具体的宿主环境）
    *   3.接收参数，参数的格式是rest形式的 （如：func(context,a,b,c)）
    *   4.立即执行此函数对象
    *   5.返回执行对象
    * 有了上面的信息，下面我们可以尝试着实现一下
    */

   /*
   * call 实现 
   * 要注意的是 给_call赋值的 函数表达式不能用 箭头函数 因为这样会拿不到Function的实例 （箭头函数不适应的场景 主要在拓展原型方法上）
   * @params context 上下文
   * @params args 参数集合
   */
   Function.prototype._call = function(){
     //将参数提取出来
     //Array.from 和展开操作符 都是将具有iterator接口的类数组转成数组 但展开操作符有更多的作用
     let [context,...args]  = Array.from(arguments)  // |console.log(args)| [...arguments] 

     //判断context是否为nul
     if(!context) context =  window ? window : global 
    
     //使用symbol可以避免污染原有属性
     let func = Symbol('func')

     //将执行函数绑定到context的一个属性上
     context[func] = this

     //执行函数
    let result = context[func](...args)

     //删除属性 Reflect是一个反射对象 具备大部分Object或者Func的功能 个人理解 主要是为了保持代码整洁，然后用函数 取代 命令式的一些保留字
     Reflect.deleteProperty(context,func)

     //返回对象
     return result
   }

   testFunc._call(obj2,3) //print: 2,3

   /**
    * apply
    * 基本一致，在参数传递上 apply使用数组
    */
   Function.prototype._apply = function(context,args){
    //判断context是否为null
    if(!context) context =  window ? window : global 
   
    //使用symbol可以避免污染原有属性
    let func = Symbol('func')

    //将执行函数绑定到context的一个属性上
    context[func] = this

    //执行函数
    let result = Object.prototype.toString.call(args) === '[object Array]' ? context[func](...args) : context[func]()

    //删除属性 Reflect是一个反射对象 具备大部分Object或者Func的功能 个人理解 主要是为了保持代码整洁，然后用函数 取代 命令式的一些保留字
    Reflect.deleteProperty(context,func)

    //返回对象
    return result
  }

   /**
    * bind
    * 使用方式和call差不多
    * 区别是返回一个函数，不立即执行
    */
   Function.prototype._bind = function(){
     //拿到参数
    let [context,...args] = Array.from(arguments)
    let _self = this
    //返回一个函数 偷点懒~
    return function(){
      let innerArgs = Array.from(arguments)
      let totalArgs = [...args,...innerArgs]
      return _self._apply(context,totalArgs)
    }

   }

   let bindTest = testBindFunc._bind(obj2,3)
   console.log(bindTest(4)) //9

   /**
    * 总结：
    *   
    */

  }
  


 
 