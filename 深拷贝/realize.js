{
  /**
   * 手动实现深拷贝
   */
  function deepClone(obj , hash = new WeakMap()){
    //如果是一个date对象，则返回date
    if(Object.prototype.toString().call(obj) === '[Object date]'){}

    //如果是一个func，则返回func


    //如果是一个reg，则返回reg

    //如果循环调用，则解绑

    //如果是对象或数组，递归复制
  }
}