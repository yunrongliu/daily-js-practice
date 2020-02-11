/**
 * 此篇描述this 参考你不知道的JavaScript
 */

 // this的绑定方式

 // 1. 默认绑定 default        
{
  function defaultFn () {
    console.log(this)
  }
 
  defaultFn() // Object global
}
 
 // 2. 隐式绑定 implicit

{
  let obj = {
    name: 'yr',
    implicitFn: function () {
      console.log(this.name)
    }
  }

  let obj2 = {
    target: obj,
    name: 'lc'
  }

  obj.implicitFn() //yr
  // obj2.target.implicitFn() //yr

  // obj.implicitFn.call(obj2) // lc

  /** 隐式绑定只在最后一层调用位置起作用 */

  // 隐式丢失

  let other = obj.implicitFn

  other() // undefined 因为global没有name

  global.name = 'global'

  other() // global

  /**
   * 方法声明后 地址是在堆上的 
   * 一个对象的属性为是个function，只不过是保存了函数的引用，也就是说，这个函数并不属于任何对象或者某个属性
   * 将对象的属性赋值给一个变量后，传递的只是引用。
   * 函数本身的this绑定是在函数运行时决定的，只有箭头函数是在定义时决定的。这涉及到js的执行环境。
   */

  let another = {
    name: 'cc',
    implicitFn: obj.implicitFn
  }

  another.implicitFn() // cc
}

// 3. 显示绑定 display
{
  let obj1 = {
    name: 'obj1',
    displayFn: function (args) {
      console.log(this.name,args)
    }
  }

  let obj2 = {
    name: 'obj2'
  }

  obj1.displayFn.call(obj2,1) // obj2 1

  obj1.displayFn.apply(obj2,[1]) //obj2 1

  let bindObj = obj1.displayFn.bind(obj2,1) 
  bindObj() //obj2 1
  let obj3 = {
    name: 'obj3'
  }

  bindObj.call(obj3,1) // obj2 1
}

// 4. new 绑定
{
  function person (name) {
    this.name = name
  }

  let p1 = new person('yr')

  console.log(p1.name) // yr
} 

// 箭头函数  指向当前定义的上一级环境的this

/**
 * 优先级
 * 从上面的代码来看 
 *  1. 默认绑定的优先级最低
 *  2. 其次是隐式绑定
 *  3. 显示绑定与new绑定的优先级别还未确定
 */

// 验证

{
  function test (num) {
    this.num = num 
  }

  let obj = {}

  let testObj = test.bind(obj)
  testObj(2) // 2

  console.log(obj.num)

  let other = new testObj(3)
  console.log(other.num) // 3
  console.log(obj.num) // 2
}
