let pubsub = {
  catchHash: new Map(), //根据不同的name 储存对应的函数队列的map
  // catch: {}, //传统对象
  index: -1, //每个订阅者的唯一id
  offlineStack: [],//离线事件存储
  nameSpaceCatch: {},//命名空间
  /**
   * 订阅
   * @param name {string} 订阅事件的名称 
   * @param fn {function} 订阅事件的处理函数
   */
  _subscribe(name = 'default',fn){
    let obj = this.catchHash.get(name) || {}
    let id = this.index + 1
    if(!obj){
      obj.name = name
      obj.fnStack = []
      this.catchHash.set(name,outObj)
      // this.catch[name] = obj
    }
    obj.fnStack.push({
      fn,
      id
    })
  },
  /**
   * 发布
   * @param name 要发布的事件名称
   * @param data 对应的数据
   */
  _publish(){
    let [name = 'default',...data] = [...arguments]
    let obj = this.catchHash.get(name)
    // if(!Array.isArray(this.catch[name].cbStack) || !this.catch[name].cbStack.length) return;
    if(!Array.isArray(obj.fnStack) || !obj.fnStack.length) return;
    return this.execStackFn(obj.fnStack,data)
  },
  /**
   * 订阅一次
   */

  /**
   *  取消订阅
   * @param name {string} 取消某一名称的订阅事件
   * @param key {number} 取消通知某一个订阅者的通知
   */
  _unsubscribe(name,key){
    let obj = this.catchHash.get(name)
    if(!obj){
      return;
    }
    if (!key) {
      this.catchHash.delete(name)
      return;
      // Reflect.deleteProperty(this.catch,key)
    }
    obj.fnStack.forEach((val,inx) => {
      if(val.id === key){
        obj.fnStack.splice(inx,1)
        return;
      }
    })
  },
  /**
   * 通过别名的方式
   * @param moduleName {'string'}
   */
  _creat(moduleName){
    if(this.nameSpaceCatch[moduleName]) return this.nameSpaceCatch[moduleName]
    let psInstance = Object.create(this)
    let ret = {
      subscribe()
    }
  },
  /**
   * 循环执行函数
   * @param fnStack 函数栈对象 
   * {
   *  fn 方法
   *  id 唯一标识
   * }
   */
  execStackFn(fnStack,data){
    return fnStack.reduce((ret,obj) => {
      let res = obj.fn.apply(this,data)
      ret.push(res)
      return ret
    },[])
  }
}