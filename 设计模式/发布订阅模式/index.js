{
  let pubsub = (function(){
    /**
     * @private center {object} 发布订阅调度中心
     * @private  evName  {string} 模块名 
     */
    let center = null,
        evName = 'default'

    center = {
      cache: {}, //{object}当前模块名对应的用于储存fn的对象
      /**
       * 发布消息的方法
       * @param name {string} 要订阅的消息的事件名称 
       * @param data {arguments} 触发方法需要的参数
       */
      publish(name,data){
        /**
         * @private fnStack {array} 回调函数栈
         */
        let fnStack = this.cache[name]
        if(Object.prototype.toString.call(fnStack) === '[object Array]' && fnStack.length > 0){
          return  this.execFnStack(fnStack,data)
        }

      },
      /**
       * 订阅消息的方法
       * @param name {string} 发布消息的事件名称 
       * @param fn {function} 订阅者订阅时对应的函数
       */
      subscribe(name,fn){

        if(!this.cache[name]){
          this.cache[name] = [] 
        }
        this.cache[name].push(fn) 
      },
      /**
       * 取消订阅的方法
       * @param target 要取消订阅的方法名 或者 唯一标识
       */
      unsubscribe(name){
        Reflect.deleteProperty(this.catch,name)
      },
      /**
       * 执行函数栈
       * @param fnStack {array} 函数栈 
       * @param data {arguments} 参数
       * @return ret {Array} 函数返回结果  ?? 如果执行多个函数 那么只能获取到单一结果?
       */
      execFnStack(fnStack,data){
        return fnStack.reduce((ret, current) => {
          ret.push(current.call(this,data))
        }, [])
      }
    }
  })()
}