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
 * new 在js中 可以用来创建构造函数生成的对象 也可以用于继承
 * 简单来说 JavaScript大部分底层的操作都和原型有关
 * 在js中无论使用任何模式去实现继承，都绕不开prototype和constructor，因为继承的本质是复制还不是查找
 * 而这种伪继承 起始增加了理解难度 以及 麻烦的原型指向
 * 所以个人更推荐 直接使用委托，从概念上来说，所有类都是平级的关系  有的只有委托的关系
 * 委托的本质 就是 原型链的延伸
 */