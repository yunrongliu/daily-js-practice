/**
 * new 是 创建构造函数的一种方式 
 * 也是判断this 绑定的一种规则
 * 使用this创建对象 发生如下过程
 *  1.新建一个this对象
 *  2.将构造函数的原型委托给this（建议一切原型委托都使用Object.create）
 *  3.如果构造函数返回了一个对象或者函数，则返回对象或函数
 *  4.如果没有，则返回this
 */

 /**实现 */
{
  let _new = function(){
    let thisObj = {}

    let [constructor,...args] = [...arguments]

    console.log(constructor.prototype)

    thisObj = Object.create(constructor.prototype) 

    let result = constructor.apply(thisObj,args)

    if(result && typeof result ==='function' || typeof result === 'object'){
      return result
    }

    return thisObj
  }

  function Person(name,age){
    this.name = name
    this.age = age
  }

  let person1 = _new(Person,'liu',18)
  let person2 = _new(Person,'yang',18)

  console.log(person1.name)
  console.log(person2.name)
}

/**总结
 * new 的 功能大概是这样  但是原生new 在使用时 还有一些附加的作用 
 * 可以看到  js中的new  和 其他语言是不一样的
 * new操作符 后面是个函数 （其实只要是function类型的就可以，如对象的constructor属性(但不推荐使用)） 
 * 只有被new 调用的函数 才可以理解为构造函数
 * 而 new 的本质 只是创建了一个对象 然后将构造函数的原型委托给该对象而已 不存在复制
 * 所以js 中不存在继承这个概念 只有原型委托 而原型委托的本质 其实就是 在原型链上的一次查找（左查询 和 右查询 的情况还有些许不同）
 * 
 */