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
 * promise会立即执行executor函数，所以Promise函数内部是同步代码，then,catch,finally是异步的
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
     if(_self.status === 'pending'){
       setTimeout(() => {
        _self.status = 'fulfilled' //将状态置为完成
        _self.result = value //将传入的value作为解释
 
        _self.resolveCallbackCol.forEach( cb => cb(value))
       }, 4);
       
     }
   }

   function reject(value){
     if(_self.status === 'pending'){
       setTimeout(() => {
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
   onResolve = judgeFunc(onResolve) === flag ? onResolve : function(value){return value} //return value的原因是可以让值一直传递
   onReject = judgeFunc(onReject) === flag ? onReject : function(value){return value}

   //判断传入的状态，设置要返回的promise
   //优化if 把最有可能的放到前面
   if(_self.status === 'fulfilled'){
     return retPromise = new myPromise((resolve,reject) => {
       try {
         let result = onResolve(_self.data) //执行，取得返回结果
         if(result.isPrototypeOf(myPromise)){
           result.then(resolve,reject)
         }else{
           resolve(result)
         }
       } catch (error) {
         reject(error)
       }
     })
   }

   if(_self.status === 'rejected'){
     return retPromise = new  myPromise((resolve,reject) => {
       try {
         let result = onReject(_self.data)
         if(result.isPrototypeOf(myPromise)){
           result.then(resolve,reject)
         }else{
           resolve(result)
         }
       } catch (error) {
        reject(error)
       }
     })
   }

   
   if(_self.status === 'pending'){
    //如果状态还是处于pending的 其实和构造函数差不多 需要往完成和拒绝俩个回调队列里面推入对应的回调函数
    return retPromise = new myPromise((resolve,reject) => {

      _self.resolveCallbackCol.push(function(value){
        try {
          let result = onResolve(_self.data) //先拿到返回值
          if(result.isPrototypeOf(myPromise)){ //如果返回值是一个promise
            result.then(resolve,reject) //那么返回的promise对象的解释就是此时的解释
          }else{          
            resolve(result) //如果不是，那么以返回值作为promise的解释
          }

        } catch (error) {
           reject(error) //如果抛出错误，那么以错误作为解释
        }
      })

      self.rejectCallbackCol.push(function(value){
        try {
          let result = onReject(_self.data) //先拿到返回值
          if(result.isPrototypeOf(myPromise)){ //如果返回值是一个promise
            result.then(resolve,reject) //那么返回的promise对象的解释就是此时的解释
          }else{          
            resolve(result) //如果不是，那么以返回值作为promise的解释
          }

        } catch (error) {
           reject(error) //如果抛出错误，那么以错误作为解释
        }
      })
    })

    
  }
 }

 let p1 = new myPromise((resolve,reject) => {
   setTimeout(() => {
     console.log('p1')
     resolve('111')
   }, 4);
 })

 let p2 = new myPromise((resolve,reject) => {
   setTimeout(() => {
     console.log('p2')
     resolve('222')
   }, 5);
 })

 p1.then((data)=>{
   console.log(data)
 })

 p2.then((data)=>{
  console.log(data)
})
