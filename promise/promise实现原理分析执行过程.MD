new a myPromise //首先调用 myPromise方法 打印了此步骤
first exec //然后执行myPromise的executor函数，打印了first exxec，然后setTimeOut代码被推入任务队列准备执行
pending //然后是p1.then方法，先打印此时的状态
myPromise { //打印此时的对象 为p1
  status: 'pending',
  resolveCallbackCol: [],
  rejectCallbackCol: [],
  result: null,
  name: 'p1' }
new a myPromise //因为满足条件，所以new 了一个myPromise对象，所以打印了new……  并且这个对象会赋值给p2
beforeResolve   resolveCallbackCol push //将对应的函数推入p1的队列
pending //然后是p2 的then方法 继续打印此时的then方法
new a myPromise //继续new 了一个 myPromise对象，这个myPromise对象没有赋值
beforeResolve   resolveCallbackCol push //将对应的函数推入p2的队列

------同步任务执行完毕---------
------读取任务队列的任务---------
p1 //打印p1
resolve: _self myPromise { //打印此时的myPromise对象  为p1
  status: 'pending',
  resolveCallbackCol: [ [Function] ],
  rejectCallbackCol: [ [Function] ],
  result: null,
  name: 'p1' }
resolve p3 { name: 'p3' } //打印此时 的p3
resolve p1 myPromise { //打印此时的 p1
  status: 'pending',
  resolveCallbackCol: [ [Function] ],
  rejectCallbackCol: [ [Function] ],
  result: null,
  name: 'p1' }
resolve p2 myPromise { //打印此时的p2
  status: 'pending',
  resolveCallbackCol: [ [Function] ],
  rejectCallbackCol: [ [Function] ],
  result: null,
  name: 'p2' }
-----遇到setTimeout推入任务队列-----
-----此时无同步任务，从任务队列中读取刚才推入的setTimeout执行-----
setTimeout _self myPromise { //打印此时的对象 为p1
  status: 'pending',
  resolveCallbackCol: [ [Function] ],
  rejectCallbackCol: [ [Function] ],
  result: null,
  name: 'p1' }
[ [Function] ] //打印此时对象的队列 
//执行函数
nowStatus fulfilled //打印此时状态 为fulfilled
before onResolve _self myPromise { //打印在调用onResolve之前的对象 为p1
  status: 'fulfilled',
  resolveCallbackCol: [ [Function] ],
  rejectCallbackCol: [ [Function] ],
  result: '111',
  name: 'p1' }
before onResolve p3 { name: 'p3' } //打印在调用onResolve之前的 p3
onResolve (data)=> { //打印当前对象传入then方法的resolve函数
   p3.promise = new myPromise((resolve,reject)=> {
     console.log('ddd',2222)
     resolve('222')
   })
   return p3.promise
 }
//执行onResolve函数，并将result传入
new a myPromise //首先又new 了一个myPromise对象，所以打印了new…
ddd 2222 //执行executor里的内容 打印
//调用resolve方法
resolve: _self myPromise { //打印此时的对象 是一个初始化的myPromise 再后面要赋值给p3的promise属性
  status: 'pending',
  resolveCallbackCol: [],
  rejectCallbackCol: [],
  result: null }
resolve p3 { name: 'p3' } //打印此时的p3对象  因为还未完成赋值操作
resolve p1 myPromise { //打印p1
  status: 'fulfilled',
  resolveCallbackCol: [ [Function] ],
  rejectCallbackCol: [ [Function] ],
  result: '111',
  name: 'p1' }
resolve p2 myPromise { //打印p2
  status: 'pending',
  resolveCallbackCol: [ [Function] ],
  rejectCallbackCol: [ [Function] ],
  result: null,
  name: 'p2' }
----遇到setTimeout推入任务队列 队列中有一个任务----
----继续执行onResolve方法后的代码-------
onResolve next p3 { name: 'p3', //打印执行过onResolve方法后的p3，因为完成赋值操作
  promise:
   myPromise {
     status: 'pending',
     resolveCallbackCol: [],
     rejectCallbackCol: [],
     result: null } }
onResolve next p2 myPromise { //打印执行过onResolve方法后的p2
  status: 'pending',
  resolveCallbackCol: [ [Function] ],
  rejectCallbackCol: [ [Function] ],
  result: null,
  name: 'p2' }
onResolve next _self myPromise { //打印此时的对象 为p1
  status: 'fulfilled',
  resolveCallbackCol: [ [Function] ],
  rejectCallbackCol: [ [Function] ],
  result: '111',
  name: 'p1' }
onResolve next result myPromise { //打印此时执行过onResolve方法的返回值，是一个promise
  status: 'pending',
  resolveCallbackCol: [],
  rejectCallbackCol: [],
  result: null }
----执行dealMyPromise方法------------
dealMyPromise exec! //打印
---- 因为是一个myPromise对象，所以调用传入的myPromise的then方法
pending //打印此时的状态
myPromise { //打印此时的对象 就是刚才执行onResolve返回的result
  status: 'pending',
  resolveCallbackCol: [],
  rejectCallbackCol: [],
  result: null }
new a myPromise //因为状态为pending，所以new 了一个myPromise对象，所以打印了new…
beforeResolve   resolveCallbackCol push //将函数推入对应队列
----同步代码结束，执行此时任务队列中的任务，此时任务队列任务数量为0-----
setTimeout _self myPromise { //打印此时的对象，还是那个result
  status: 'pending',
  resolveCallbackCol: [ [Function] ],
  rejectCallbackCol: [ [Function] ],
  result: null }
[ [Function] ] //打印队列中的函数
//执行函数
nowStatus fulfilled //打印此时的状态
before onResolve _self myPromise { //打印此时的对象，result的值我们也拿到了
  status: 'fulfilled',
  resolveCallbackCol: [ [Function] ],
  rejectCallbackCol: [ [Function] ],
  result: '222' }
before onResolve p3 { name: 'p3', //打印此时的p3对象
  promise:
   myPromise {
     status: 'fulfilled',
     resolveCallbackCol: [ [Function] ],
     rejectCallbackCol: [ [Function] ],
     result: '222' } }
//查看此时的onResolve函数，其实就是一开始return掉的那个myPromise对象，也就是p2
onResolve function resolve(value){ 
     console.log('resolve: _self',_self)
     console.log('resolve p3',p3)
     console.log('resolve p1',p1)
     console.log('resolve p2',p2)
     if(_self.status === 'pending'){
       setTimeout(() => {
        _self.status = 'fulfilled' //??????????
        _self.result = value //???????value???????
        console.log(_self.resolveCallbackCol)
        _self.resolveCallbackCol.forEach( cb => cb(value))
       }, 4);
       
     }
   }
//调用p2的resolve方法，并将此时对象的result传入（也就是222）
resolve: _self myPromise { //打印此时的对象 为p2
  status: 'pending',
  resolveCallbackCol: [ [Function] ],
  rejectCallbackCol: [ [Function] ],
  result: null,
  name: 'p2' }
resolve p3 { name: 'p3', //打印此时的p3对象
  promise:
   myPromise {
     status: 'fulfilled',
     resolveCallbackCol: [ [Function] ],
     rejectCallbackCol: [ [Function] ],
     result: '222' } }
resolve p1 myPromise { //打印此时的p1对象
  status: 'fulfilled',
  resolveCallbackCol: [ [Function] ],
  rejectCallbackCol: [ [Function] ],
  result: '111',
  name: 'p1' }
resolve p2 myPromise { //打印此时的p2对象
  status: 'pending',
  resolveCallbackCol: [ [Function] ],
  rejectCallbackCol: [ [Function] ],
  result: null,
  name: 'p2' }
-----因为状态满足pedding，执行setTimeout，推入任务队列，任务数为1 任务为p2的setTimeout-----
-----然后继续执行onResolve函数后的代码----
onResolve next p3 { name: 'p3', //打印此时的p3
  promise:
   myPromise {
     status: 'fulfilled',
     resolveCallbackCol: [ [Function] ],
     rejectCallbackCol: [ [Function] ],
     result: '222' } }
onResolve next p2 myPromise { //打印此时的p2，因为被推入任务队列，赋值操作还未进行，result为null
  status: 'pending',
  resolveCallbackCol: [ [Function] ],
  rejectCallbackCol: [ [Function] ],
  result: null,
  name: 'p2' }
onResolve next _self myPromise { //打印此时的myPromise对象 为p3.promise
  status: 'fulfilled',
  resolveCallbackCol: [ [Function] ],
  rejectCallbackCol: [ [Function] ],
  result: '222' }
onResolve next result undefined //打印此时的结果，因为无返回值 为undefined
dealMyPromise exec! //执行dealMyPromise方法
----因为传入的对象是p3.promise对象，此时状态已经为fulfilled，所以直接resolve-----
----因为resolve方法是传入的，所以此时调用resolve函数的时对应p3.then时生成的匿名myPromise对象-----
resolve: _self myPromise { //打印此时的对象 可见不是p1 p2 p3
  status: 'pending',
  resolveCallbackCol: [],
  rejectCallbackCol: [],
  result: null }
resolve p3 { name: 'p3', //打印此时的p3对象
  promise:
   myPromise {
     status: 'fulfilled',
     resolveCallbackCol: [ [Function] ],
     rejectCallbackCol: [ [Function] ],
     result: '222' } }
resolve p1 myPromise { //打印此时的p1对象
  status: 'fulfilled',
  resolveCallbackCol: [ [Function] ],
  rejectCallbackCol: [ [Function] ],
  result: '111',
  name: 'p1' }
resolve p2 myPromise { //打印此时的p2对象
  status: 'pending',
  resolveCallbackCol: [ [Function] ],
  rejectCallbackCol: [ [Function] ],
  result: null,
  name: 'p2' }
//因为此时的状态为pending
----推入任务队列，任务数为2，分别是p2的setTimeout和匿名myPromise的setTimeout---
----同步任务执行完毕，读取任务队列代码执行 执行的是p2的setTimeout，此时任务队列还剩一个（匿名myPromise）--------
setTimeout _self myPromise { //读取此时的对象 为 p2
  status: 'pending',
  resolveCallbackCol: [ [Function] ],
  rejectCallbackCol: [ [Function] ],
  result: null,
  name: 'p2' }
[ [Function] ] //打印队列中的函数
//执行函数
nowStatus fulfilled //打印现在的状态
before onResolve _self myPromise { //打印在调用onResolve之前的 对象 
  status: 'fulfilled',
  resolveCallbackCol: [ [Function] ],
  rejectCallbackCol: [ [Function] ],
  result: '222',
  name: 'p2' }
before onResolve p3 { name: 'p3', //打印在调用onResolve之前的 p3
  promise:
   myPromise {
     status: 'fulfilled',
     resolveCallbackCol: [ [Function] ],
     rejectCallbackCol: [ [Function] ],
     result: '222' } }

onResolve (data)=> { //打印p2的then方法中的resolve函数
   console.log('ccc',data)
 }
----执行此函数---------
ccc 222 //打印ccc 222 因为是同步代码 继续向后执行
onResolve next p3 { name: 'p3',  //打印执行过onResolve方法后的p3
  promise:
   myPromise {
     status: 'fulfilled',
     resolveCallbackCol: [ [Function] ],
     rejectCallbackCol: [ [Function] ],
     result: '222' } }
onResolve next p2 myPromise { //打印执行过onResolve方法后的p2
  status: 'fulfilled',
  resolveCallbackCol: [ [Function] ],
  rejectCallbackCol: [ [Function] ],
  result: '222',
  name: 'p2' }
onResolve next _self myPromise { //打印执行过onResolve方法后的 对象 为 p2
  status: 'fulfilled',
  resolveCallbackCol: [ [Function] ],
  rejectCallbackCol: [ [Function] ],
  result: '222',
  name: 'p2' }
onResolve next result undefined //因为无返回值所以 打印undefined
dealMyPromise exec! //执行dealMyPromise方法
//因为无返回值，所以执行resolve方法
//因为resolve方法是传入的 所以是p2.then时对应的匿名promise的resolve
resolve: _self myPromise {  //打印此时的对象，是匿名promise对象
  status: 'pending',
  resolveCallbackCol: [],
  rejectCallbackCol: [],
  result: null }
resolve p3 { name: 'p3', //打印此时的p3
  promise:
   myPromise {
     status: 'fulfilled',
     resolveCallbackCol: [ [Function] ],
     rejectCallbackCol: [ [Function] ],
     result: '222' } }
resolve p1 myPromise { //打印此时的p1
  status: 'fulfilled',
  resolveCallbackCol: [ [Function] ],
  rejectCallbackCol: [ [Function] ],
  result: '111',
  name: 'p1' }
resolve p2 myPromise { //打印此时的p2
  status: 'fulfilled',
  resolveCallbackCol: [ [Function] ],
  rejectCallbackCol: [ [Function] ],
  result: '222',
  name: 'p2' }
----执行遇到setTimeout 推入任务队列，此时任务队列任务数为2，分别是俩个匿名myPromise的setTimeout----
----同步代码执行完毕，执行第一个匿名myPromise对象的setTimeout，此时还剩一个-----
setTimeout _self myPromise {//打印此时的对象 ----匿名myPromise对象
  status: 'pending',
  resolveCallbackCol: [],
  rejectCallbackCol: [],
  result: null }
[] //打印此时对应的回调队列
----执行最后一个任务队列中的任务-------
setTimeout _self myPromise { //打印此时的对象 -----匿名myPromise对象
  status: 'pending',
  resolveCallbackCol: [],
  rejectCallbackCol: [],
  result: null }
[] /打印此时对应的回调队列
----至此，代码结束------

