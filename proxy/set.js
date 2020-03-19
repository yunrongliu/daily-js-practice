// 代理对象的设置 增删改
{
  let handle = {
    set(target,key,val) {
      // 判断新旧值是否相等
      console.log(target[key],val)
      if(target[key] === val) {
        return val
      }
      return Reflect.set(target,key,val)
    }
  }

  let p = new Proxy({a: 0},handle)
  p.a = 1
}