//代理对象的不存在属性访问
{
  let handler = {
    get: function(target,name){
      return Reflect.get(target,name) ? target[name] : {}
    }
  }
 
  let p = new Proxy({},handler)
 
  console.log(p.a)
  console.log(p.b)
}

// 代理一个数组，监听数组的变化
{
  let handle = {
    get(target,name) {
      console.log(target,name)
      return Reflect.get(target,name)
    }
  }

  let arrayProxy = new Proxy([],handle)

  // 数组的操作方法会触发get俩次，一次是原型上的方法push，然后是自身的length
  arrayProxy.push(1) // [] push - [] length

  console.log(arrayProxy) // [1]
}