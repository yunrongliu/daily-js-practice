/**
 * Object.preventExtensions(obj)
 * ������ֹһ��������������,���ϸ�ģʽ������Ϊundefined �����򱨴�
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

