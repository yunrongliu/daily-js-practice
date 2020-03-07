/**
 * 如果是reg 返回一个rep对象
 * 如果是date 返回一个date
 * 如果不是Object，直接返回
 * 如果 map里面用key，就返回value
 * 如果是数组  则prototype的constructor为Array，否则为Object
 */

//es6
function deepClone(obj, hash = new WeakMap()){
  if(obj instanceof RegExp){
    return new RegExp(obj)
  } 
  if(obj instanceof Date){
    return new Date(obj)
  } 

  if(typeof obj !== 'object' || obj === null){
    return obj
  }

  //?
  //如果存在循环引用的情况  则直接返回
  if(hash.has(obj)){
    return hash.get(obj)
  }

  let t = Object.create(obj)  //很多文章会用 new obj.constructor() 这种方式
                              //但其实每个对象都有constructor属性,这个属性在对象的原型未被修改前，保存的是对象本身的引用
                              //如果使用toString打印出来应该是这种格式 [Function: 对象的类型]
                              //这个属性是不可枚举，但是是可修改的
                              //因为 obj.constructor本身就是个function，所以可以使用new声明
                              //当此对象的原型被修改时（就是js中实现伪继承的时候），constructor属性会更改
                              //为什么？因为原型也是一个对象，进行赋值操作，constructor肯定是右查询的那个对象的
                              //如果是空对象，那就啥也没有,所以很不安全。
                              //说实话，我觉得叫self属性比较好，叫tm的constructor，谁都认为是构造属性（有……构造啊之类的）
                              //总结： 建议废弃
                              //再看看Object.create 字面意思 我创建个对象 什么对象 obj的原型对象(且保留自身原型的属性) 
                              //create还有第二个属性 可以覆盖原有原型上的属性 这样可以更好的防止屏蔽
  console.log(t)
  hash.set(obj,t)
  console.log(hash)

  for(let key in obj){
    if(obj.hasOwnProperty(key)){
      t[key] = deepClone(obj[key],hash)
    }
  }

  return t
}

let date = new Date()
let loop = {}
let arr = [
  {
    name: 'yunrong',
    age: 21,
    job: 'front-end',
    oo: {
      dream: 'to be myself'
    }
  },
  {
    now: date
  }
]
arr[0].b = loop
loop.c = arr[0]

let da = deepClone(arr)
console.log(da)

arr[0].name = 'liu'