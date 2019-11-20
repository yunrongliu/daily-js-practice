function myPromise (executor) {
  let self = this
  self.status = 'pending' //myPromise当前状态
  self.data = undefined //当前myPromise的值
  self.onResolvedCallback = [] //myPromise resolve时的回调函数集合
  self.onRejectedCallback = [] //myPromise reject时的回调函数集合

  function resolve (value) { // value成功态时接收的终值
    if (value instanceof myPromise) {
      value.then(resolve, reject)
      return
    }

    // 为什么resolve 加setTimeout?
    // 2.2.4规范 onFulfilled 和 onRejected 只允许在 execution context 栈仅包含平台代码时运行.
    // 注1 这里的平台代码指的是引擎、环境以及 promise 的实施代码。实践中要确保 onFulfilled 和 onRejected 方法异步执行，且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。
    setTimeout(function(){
      // 调用resolve 回调对应onFulfilled函数
      if (self.status === 'pending') {
        console.log('times')
        // 只能由pending状态 => fulfilled状态 (避免调用多次resolve reject)
        self.status = 'fulfilled'
        self.data = value
        //执行resolve的回调函数，将value传递到callback中
        console.log(self.onResolvedCallback)
        self.onResolvedCallback.forEach(callback => callback(value))
      }
    })
  }

  function reject (reason) { // reason失败态时接收的拒因
    setTimeout(function(){
      // 调用reject 回调对应onRejected函数
      if (self.status === 'pending') {
        // 只能由pending状态 => rejected状态 (避免调用多次resolve reject)
        self.status = 'rejected'
        self.data = reason
        //执行reject的回调函数，将reason传递到callback中
        self.onRejectedCallback.forEach(callback => callback(reason))
      }
    })
  }

  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
  
}

/**
 * resolve中的值几种情况：
 * 1.普通值
 * 2.promise对象
 * 3.thenable对象/函数
 */

/**
 * 对resolve 进行改造增强 针对resolve中不同值情况 进行处理
 * @param  {promise} promise2 promise1.then方法返回的新的promise对象
 * @param  {[type]} x         promise1中onFulfilled的返回值
 * @param  {[type]} resolve   promise2的resolve方法
 * @param  {[type]} reject    promise2的reject方法
 */
function resolvemyPromise (promise2, x, resolve, reject) {
  let then 
  let thenCalledOrThrow = false // 避免多次调用

  if (promise2 === x) { // 如果从onFulfilled中返回的x 就是promise2 就会导致循环引用报错
    reject(new TypeError('Chaining cycle detected for promise!'))
    return
  }

  // 如果x是一个我们自己写的promise对象 
  if (x instanceof myPromise) {
    if (x.status === 'pending') { // 如果为等待态需等待直至 x 被执行或拒绝 并解析value值
      x.then(value => {
        resolvemyPromise(promise2, value, resolve, reject)
      }, err => {
        reject(err)
      })
    }  else { // 如果 x 已经处于执行态/拒绝态(值已经被解析为普通值)，用相同的值执行传递下去 promise
      x.then(resolve, reject)
    }
    return
  }

  // 如果 x 为对象或者函数
  if ((x !== null) && ((typeof x === 'function') || (typeof x === 'object'))) {
    try {
      then = x.then //because x.then could be a getter
      if (typeof then === 'function') { // 是否是thenable对象（具有then方法的对象/函数）
        then.call(x, value => {
          if (thenCalledOrThrow) return
          thenCalledOrThrow = true
          resolvemyPromise(promise2, value, resolve, reject)
          return
        }, err => {
          if (thenCalledOrThrow) return
          thenCalledOrThrow = true
          reject(err)
          return
        })
      } else { // 说明是一个普通对象/函数
        resolve(x)
      }
    } catch (e) {
      if (thenCalledOrThrow) return
      thenCalledOrThrow = true
      reject(e)
      return
    }
  } else {
    resolve(x)
  }

}

/**
 * [注册fulfilled状态/rejected状态对应的回调函数]
 * @param  {function} onFulfilled fulfilled状态时 执行的函数
 * @param  {function} onRejected  rejected状态时 执行的函数
 * @return {function} newPromsie  返回一个新的promise对象
 */
myPromise.prototype.then = function (onResolve, onReject) {
  let self = this
  let promise2

  // 处理参数默认值 保证参数后续能够继续执行
  onResolve = typeof onResolve==='function' ? onResolve : function(value){return value}
  onReject = typeof onReject==='function' ? onReject : function(reason){throw reason}
  
  console.log(self.status)

  if (self.status === 'pending') { // 等待态
     return promise2 = new myPromise(function(resolve, reject){
      
      // 当异步调用resolve/rejected时 将onFulfilled/onRejected收集暂存到集合中
      self.onResolvedCallback.push(function(value){
        try {
          let x = onResolve(value)
          resolvemyPromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })

      self.onRejectedCallback.push(function(reason){
        try {
          let x = onReject(reason)
          resolvemyPromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    })
  }

  // then里面的FULFILLED/REJECTED状态时 为什么要加setTimeout ?
  // 原因:
  // 其一 2.2.4规范 要确保 onFulfilled 和 onRejected 方法异步执行(且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行) 所以要在resolve里加上setTimeout
  // 其二 2.2.6规范 对于一个promise，它的then方法可以调用多次.（当在其他程序中多次调用同一个promise的then时 由于之前状态已经为FULFILLED/REJECTED状态，则会走的下面逻辑),所以要确保为FULFILLED/REJECTED状态后 也要异步执行onFulfilled/onRejected

  // 其二 2.2.6规范 也是resolve函数里加setTimeout的原因
  // 总之都是 让then方法异步执行 也就是确保onFulfilled/onRejected异步执行

  // 如下面这种情景 多次调用p1.then
  // p1.then((value) => { // 此时p1.status 由pending状态 => fulfilled状态
  //     console.log(value); // resolve
  //     // console.log(p1.status); // fulfilled
  //     p1.then(value => { // 再次p1.then 这时已经为fulfilled状态 走的是fulfilled状态判断里的逻辑 所以我们也要确保判断里面onFuilled异步执行
  //         console.log(value); // 'resolve'
  //     });
  //     console.log('当前执行栈中同步代码');
  // })
  // console.log('全局执行栈中同步代码');
  //
  if (self.status === 'fulfilled') { // 成功态
    return promise2 = new myPromise(function(resolve, reject){
      setTimeout(function(){
        try {
          let x = onResolve(self.data)
          resolvemyPromise(promise2, x, resolve, reject) // 新的promise resolve 上一个onFulfilled的返回值
        } catch (e) {
          reject(e) // 捕获前面onFulfilled中抛出的异常 then(onFulfilled, onRejected);
        }
      },0)
    })
  }

  if (self.status === 'rejected') { // 失败态
    return promise2 = new myPromise(function(resolve, reject){
      setTimeout(function(){
        try {
          let x = onReject(self.data)
          resolvemyPromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      },0)
    })
  }
}

/**
 * myPromise.all myPromise进行并行处理
 * 参数: promise对象组成的数组作为参数
 * 返回值: 返回一个myPromise实例
 * 当这个数组里的所有promise对象全部进入FulFilled状态的时候，才会resolve。
 */
myPromise.all = function (promises) {
  return new myPromise((resolve, reject) => {
    let values = []
    let count = 0
    promises.forEach((promise, index) => {
      promise.then(value => {
        console.log('value:', value, 'index:', index)
        values[index] = value
        count++
        if (count === promises.length) {
          resolve(values)
        }
      }, reject)
    })
  })
}

/**
 * myPromise.race
 * 参数: 接收 promise对象组成的数组作为参数
 * 返回值: 返回一个myPromise实例
 * 只要有一个promise对象进入 FulFilled 或者 Rejected 状态的话，就会继续进行后面的处理(取决于哪一个更快)
 */
myPromise.race = function (promises) {
  return new myPromise((resolve, reject) => {
      promises.forEach((promise) => {
         promise.then(resolve, reject);
      });
  });
}

// 用于promise方法链时 捕获前面onFulfilled/onRejected抛出的异常
myPromise.prototype.catch = function (onReject) {
  return this.then(null, onReject)
}

// 返回一个fulfilled状态的promise对象
myPromise.resolve = function (value) {
  return new myPromise(function(resolve, reject){resolve(value)})
}

// 返回一个rejected状态的promise对象
myPromise.reject = function (reason) {
  return new myPromise(function(resolve, reject){reject(reason)})
}

myPromise.deferred = myPromise.defer = function() {
  var defer = {}
  defer.promise = new myPromise(function(resolve, reject) {
    defer.resolve = resolve
    defer.reject = reject
  })
  return defer
}

let p1 = new myPromise((resolve,reject) => {
  resolve('111')
})

p1.then()
  .then()
  .then()
  .then((data)=>{console.log('ccc',data)})






