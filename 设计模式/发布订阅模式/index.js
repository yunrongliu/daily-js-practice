let pubsub = {
  /**
   * 订阅
   * @param name {string} 订阅事件的名称 
   * @param fn {function} 订阅事件的处理函数
   */
  _subscribe(name = 'default',fn){
    console.log('this',this.name)
    let obj = this.catchHash.get(name)
    console.log('obj',obj)
    this.index += 1
    let id = this.index
    if(!obj){
      obj = {}
      obj.name = name
      obj.fnStack = []
      this.catchHash.set(name,obj)
      // this.catch[name] = obj
    }
    console.log('fnStack',obj.fnStack)
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
  create(moduleName = 'default'){
    if(this.nameSpaceCatch && this.nameSpaceCatch[moduleName]) return this.nameSpaceCatch[moduleName]
    let psInstance = Object.create(this)
    this.name = moduleName
    this.catchHash = new Map(), //根据不同的name 储存对应的函数队列的map
    // catch: {}, //传统对象
    this.index = -1, //每个订阅者的唯一id
    this.offlineStackHash = new Map(),//离线事件存储
    this.nameSpaceCatch = {}//命名空间
    let ret = {
      subscribe(name,fn){
        psInstance._subscribe(name,fn)
        let obj = psInstance.offlineStackHash.get(name)
        if(!obj){
          obj = {}
          obj.name = name
          psInstance.offlineStackHash.set(name,obj)
        }
        if(obj.offlineStack === null || obj.offlineStack === undefined) return;
        psInstance.execStackFn(obj.offlineStack)
        obj.offlineStack = null
      },
      publish(){
        let [name = 'default',...data] = [...arguments]
        let obj = psInstance.offlineStackHash.get(name)
        if(!obj){
          obj = {}
          obj.name = name
          obj.offlineStack = []
          psInstance.offlineStackHash.set(name,obj)
        }
        let fn = function(){
          return psInstance._publish(name,data)
        }
        if(obj.offlineStack){
          return obj.offlineStack.push(fn)
        }

        return fn()
      },
      unsubscribe(name,key){
        psInstance._unsubscribe(name,key)
      }
    }
    return this.nameSpaceCatch[moduleName] ? this.nameSpaceCatch[moduleName] : this.nameSpaceCatch[moduleName] = ret
  },
  subscribe(name,fn){
    let obj = this.create()
    obj.subscribe(name,fn)
  },
  publish(){
    let obj = this.create()
    obj.publish.apply(this,arguments)
  },
  unsubscribe(name,key){
    let obj = this.create()
    obj.unsubscribe(name,key)
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
    console.log('execStackFn',fnStack,data)
    return fnStack.reduce((ret,obj) => {
      let res = data ? obj.fn.call(this,obj.id,...data) : obj.fn()  
      ret.push(res)
      return ret
    },[])
  }
}



pubsub.subscribe('test',function(id,data){
  console.log('default',id,data)
})

pubsub.publish('test',1)

pubsub.create('myu').subscribe('test',function(id,data){
  console.log('myu',id,data)
})

pubsub.create('myu').publish('test',2)


