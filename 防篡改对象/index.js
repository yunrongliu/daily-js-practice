/**
 * Object.preventExtensions(obj)
 * 可以阻止一个对象增加属性,非严格模式下新增为undefined ，否则报错
 */
'use strict'
{
  let obj = {
    attr: 'x',
    value: 'y'
  }

  Object.preventExtensions(obj)

  obj.test = 'test'

  console.log(obj.test) // strict:undefined  un: Cannot add property test, object is not extensible
}

