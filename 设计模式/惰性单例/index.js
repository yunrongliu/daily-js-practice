{
  /**
   * 单例模式的原则就是  用闭包保存一个变量，再判断有无此变量，然后返回。
   */

   // 将管理单例的逻辑 与创建单例的函数 分开
   /**
    * @param fn 创建单例的函数
    */
  const createSingle = function (fn) {
    let result 

    return function () {
      return result || (result = fn.call(this,...arguments))
    }
  }

  const genDiv = function () {
    let div = 'div'

    return div
  }

  const genP = function () {
    let p = 'p'

    return p
  }

  const createSingleDiv = createSingle(genDiv)
  console.log(createSingleDiv())

  const createSingleP = createSingle(genP)
  console.log(createSingleP())

}

// 单例模式 适用于 一次性需求的 情况 。
// 比如： 只需要创建一次的对象 或者 只需要执行一次的函数
// 单例模式的关键点 在于 创建对象 和 单例维护 的 职责 被俩个函数维护，创建对象是变化的，维护单例是不变的
// 传教对象的 函数要按情况保证 返回值 