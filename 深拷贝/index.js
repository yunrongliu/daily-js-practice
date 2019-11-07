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

  let t = new obj.constructor()
  hash.set(obj,t)
  console.log(hash)

  for(let key in obj){
    if(obj.hasOwnProperty(key)){
      t[key] = deepClone(obj[key],hash)
    }
  }

  console.log('37',t)
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