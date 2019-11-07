/**
 * �����reg ����һ��rep����
 * �����date ����һ��date
 * �������Object��ֱ�ӷ���
 * ��� map������key���ͷ���value
 * ���������  ��prototype��constructorΪArray������ΪObject
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
  //�������ѭ�����õ����  ��ֱ�ӷ���
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