/**
 * 此片文章描述promise
 * 
 * promise 是一种异步解决方案
 * 
 * 内部由三种状态控制
 *  pending: promise对象的初始状态
 *  fulfilled: 意味着操作完成
 *  rejected: 意味着操作失败
 * 
 * promise构造函数接收一个executor函数
 * executor是带有resolve和reject俩个参数的函数
 * promise会立即执行executor函数，所以Promise函数内部是同步代码，then,catch,finally是异步的（但then的实现中只是将返回的函数体内设为异步，其余的还是同步的）
 * 
 * promise的then方法和catch也返回一个promise，所以可以进行链式调用
 * 但如果整个异步流程过于复杂的话，promise会把问题变得更复杂
 * 所以现在推用async和await （promise和generator结合的异步流程解决方案）
 * 
 * promise具备下面几个方法：
 *  (推荐then方法用于处理成功的情况，catch方法处理非预期情况)
 *  1.then then方法包含俩个函数，函数的参数对应着相应的解释，但是还是希望用catch来代替第二个参数,并返回一个promise对象
 *  2.catch catch方法包含一个函数，函数的参数是拒绝的解释，并返回一个promise对象
 *  3.resolve 返回一个fulfilled状态的promise对象 并触发then方法
 *  4.reject 返回一个rejected状态的promise对象 并触发catch方法
 *  5.all 等到多个promise的状态都为fulfilled时，才会触发then方法
 *    使用方法:
 *      Promise.all(iterable) 通常是个数组
 *      then方法拿到的data也是个数组
 *  6.race
 *    使用方法:
 *      Promise.race(iterable) 通常是个数组
 *      拿到当前参数中最先将状态修改为非pending的promise，然后停止其他的promise
 *      所以then，catch返回的也是对应promise的resolve或reject的结果
 * 
 * 了解promise内部的原理 对于 generator 和 async 的理解会有很大帮助
 * 
 * 实现：
 * 分析：
 *    首先我们要有三个状态
 *    然后then方法支持俩个回调函数并把对应的解释添加进去
 *    然后catch可以捕获reject拒绝的情况
 *    然后resolve和reject两个函数可以更新promise对象的状态 并添加对应的回调
 *    然后具备all和race方法
 */

 function myPromise(executor){
   this.status = 'pending' //状态 
   this.resolveCallbackCol = [] //被接收的回调函数队列，因为then方法可以一直返回一个promise
   this.rejectCallbackCol = [] //被拒绝的回调函数队列

   this.result = null //回调函数的解释

   const _self = this //保存上下文

   function resolve(value){
     console.log('status',_self.status)
     console.log('resolve: _self',_self)
     console.log('resolve: _self.name',_self.name)
     console.log('resolve p3',p3)
     if(_self.status === 'pending'){
       setTimeout(() => {
        console.log('times')
        _self.status = 'fulfilled' //将状态置为完成
        _self.result = value //将传入的value作为解释
        console.log(_self.resolveCallbackCol)
        _self.resolveCallbackCol.forEach( cb => cb(value))
       }, 4);
       
     }
   }

   function reject(value){
     if(_self.status === 'pending'){
       setTimeout(() => {
        console.log('times')
        _self.status = 'rejected' //将状态置为拒绝
        _self.result = value //将传入的value作为解释
 
        _self.rejectCallbackCol.forEach( cb => cb(value))
       }, 4);
       
     }
   }

   try {
    executor(resolve,reject)
   } catch (error) {
     reject(error)
   }
 }

 /**
  * 处理then返回值
  * @param {myPromise} retPromise then方法返回的myPromise对象
  * @param {any} retValue resolve或reject得到的结果
  * @param {function} resolve retPromise的resolve方法
  * @param {function} reject retPromise的reject方法
  */
 function dealMyPromise(retPromise,retValue,resolve,reject){
    console.log('dealMyPromise exec!')
    //如果返回的自身 抛出错误
    if(retPromise === retValue){
      throw new Error('Cycle Reference!Can not return self!')
    }

    if(retValue instanceof myPromise){ //如果是myPromise的实例
      // if(retValue.status === 'pending'){ //且状态为pending状态,先注册then方法，然后等待执行
      //   retValue.then(result => { 
      //     dealMyPromise(retPromise,result,resolve,reject)
      //   },error => {
      //     reject(error)
      //   })
      // }else{//如果不是pending，直接注册执行
      //   retValue.then(resolve,reject)
      // }
      retValue.then(resolve,reject) //注册then
    }else{//如果是普通的值
      resolve(retValue) //直接resolve
    }
 }

 //实现then方法
 myPromise.prototype.then = function(onResolve,onReject){
   //保存上下文
   const _self = this

   //判断标识
   const flag = '[object Function]'
   //判断方法
   const judgeFunc = type => Object.prototype.toString.call(type)

   //定义要返回的promise
   let retPromise = null

   //判断then方法传入的参数是否是个function，如果不是则直接忽略 
   console.log(_self.status)

   console.log('judgeFlag',judgeFunc(onResolve) === flag)
   onResolve = judgeFunc(onResolve) === flag ? onResolve : function(value){return value} //return value的原因是可以让值一直传递
   onReject = judgeFunc(onReject) === flag ? onReject : function(value){return value}

   //判断传入的状态，设置要返回的promise
   //优化if 把最有可能的放到前面
   if(_self.status === 'pending'){
    //如果状态还是处于pending的 其实和构造函数差不多 需要往完成和拒绝俩个回调队列里面推入对应的回调函数
      return retPromise = new myPromise((resolve,reject) => {
        console.log('beforeResolve','  resolveCallbackCol push')
        _self.resolveCallbackCol.push(function(value){
        console.log('nowStatus',_self.status)
        console.log('newName',_self.name)  
        try {
            console.log('enter try catch')
            console.log('try now _self',_self)
            console.log('try p3',p3)
            console.log('onResolve',onResolve)
            let result = onResolve(_self.result) //先拿到返回值
            console.log('onResolve next p3',p3)
            console.log('pending result',result)
            console.log(_self.result)
            dealMyPromise(retPromise,result,resolve,reject)

          } catch (error) {
            reject(error) //如果抛出错误，那么以错误作为解释
          }
        })

        _self.rejectCallbackCol.push(function(value){
          try {
            let result = onReject(_self.result) //先拿到返回值
            dealMyPromise(retPromise,result,resolve,reject)

          } catch (error) {
            reject(error) //如果抛出错误，那么以错误作为解释
          }
        })
      })

      
    }

   if(_self.status === 'fulfilled'){
     return retPromise = new myPromise((resolve,reject) => {
      setTimeout(() => {
        try {
          let result = onResolve(_self.result) //执行，取得返回结果
          console.log('fulfilled result',result)
          dealMyPromise(retPromise,result,resolve,reject)
        } catch (error) {
          reject(error)
        }
      }, 4);
     })
   }

   if(_self.status === 'rejected'){
     return retPromise = new  myPromise((resolve,reject) => {
       setTimeout(() => {
        try {
          let result = onReject(_self.result)
          dealMyPromise(retPromise,result,resolve,reject)
        } catch (error) {
         reject(error)
        }
       }, 4);
     })
   }

 }

 //所以整体promise的流程应该是这样
 /**
  * 第一步 立即执行promise传入的executor函数，所以promise的executor是同步代码
  * 第二步 如果调用resolve或者reject 就执行对应的方法，但由于resolve和reject是异步的，所以会被推入任务队列，不会立即执行，所以调用then时的状态不是更新后的
  * 第三步 调用then then会判断状态，所以第一次调用then时状态一定时pending，所以会触发pending的条件，将函数推入到对应的状态队列中
  * 第四步 因为此时同步代码已经没了，所以会调用任务队列中的任务，就是调用resolve或者reject 然后此时改变状态，然后再去执行对应状态队列中的函数
  * 
  * 需要注意的是被推入状态队列的函数 应该处理几种情况
  *  （不考虑处理兼容其他promise库，只是为了讲解原理，因为这里本来就有点绕，所以还是简单为好）
  *   1.如果返回的是这个promise本身，那么应该抛出错误，因为这样会导致循环引用
  *   2.如果返回的是一个promise，那么应该注册这个promise的then方法，就是用这个promise调用一遍then方法
  *   
  */

 let p1 = new myPromise((resolve,reject) => {
   setTimeout(() => {
     console.log('p1')
     resolve('111')
   }, 4);
 })
 p1.name = 'p1'

 let p3 = {}
 p3.name = 'p3'

 let p2 = p1.then((data)=> {
   p3.promise = new myPromise((resolve,reject)=> {
     console.log('ddd',2222)
     resolve('222')
   })
   return p3.promise
 })

 p2.name = 'p2'

 p2.then((data)=> {
   console.log('ccc',data)
 })

 /**在方法里面打印了一些标记方便我们分析，然后我们逐行分析代码运行，建议用vscode双屏分析
  * 运行结果如下：
  * 
  * 
  * pending //因为p1 executor里面是一段setTimeOut，所以代码会被推入任务队列。所以执行 p1 的 then 方法 在此打印了pending
    beforeResolve   resolveCallbackCol push //因为状态时pending，所以在此打印 标识着p1的 resolveCallbackCol 和 rejectCallbackCol 都被推入了一个对应的函数
    pending //然后调用第二个then方法 继续判断 p1的状态，因为此时resolve还未执行，所以状态pending （其实不用setTimeOut模拟异步，resolve里的状态也还是未更新的，因为resolve是异步的）
    beforeResolve   resolveCallbackCol push //然后向p2的队列里面推入对应的函数
    p1 //执行setTimeOut 打印p1
    status pending //执行resolve方法 打印此时的状态
    times //打印times
    [ [Function] ] //打印队列中的函数
    afterResolve //执行函数
    status pending //再调用一遍resolve方法 因为是异步的，所以延迟执行
    result myPromise { //打印result 第一个then里面 返回的是一个myPromise
      status: 'pending',
      resolveCallbackCol: [],
      rejectCallbackCol: [],
      result: null }
    111 //打印上一次resolve的值
    dealMyPromise exec! //调用dealMyPromise方法
    pending  //因为是一个myPromise的实例，继续调用then方法，此时的状态是pending
    beforeResolve   resolveCallbackCol push //推入对应的数组
    times //执行p3的resolve方法，实际上调用then方法里面被推入的方法
    [ [Function] ] //打印p3的函数
    afterResolve // 执行函数
    status pending //p3又调用了一次resolve，继续被推入队列，等待执行
    result undefined //因为并没有返回结果 所以未undefined
    222 //输出上一次resolve的值
    dealMyPromise exec! //再次执行dealMyPromise
    status pending //因为是一个普通值，所以调用resolve，再次被推入任务队列，等待执行 error
    times //注意 如果返回了一个myPromise并且resolve会自动调用then方法 （因为已经注册，所以函数不是空的），
          //然后这个promise会返回给一个匿名的promise，继续resolve，所以打印times
    [ [Function] ] //打印p2的函数队列
    afterResolve //执行函数
    ccc 222 //函数输出结果
    result undefined //因为无返回值，所以打印undefined 
    222 //然后执行之前因为调用onResolve的方法
    dealMyPromise exec!
    status pending
    times
    []
    times
    []
  */



 

