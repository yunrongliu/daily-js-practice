/**
 * 此篇描述 生成器
 */

 /**
  * 生成器对象是由一个 generator function 返回的,并且它符合可迭代协议和迭代器协议 --MDN
  * 可迭代协议和迭代器协议可以参考MDN
  * 定义一个generator：  在函数定义时使用* function* fn(){}
  * 获取generator对象: fn = fn()
  * 
  * generator通过yield 和 next 之间的双向数据流 实现异步流程控制
  */

function* gen(){
  let ret = yield 45 
  return ret
}

gen = gen()
let res0 = gen.next() //生成器对象的第一次next 相当于启动生成器。
                      //此时向next传递数据 是接收不到的，因为next传输的数据是作为上一次yield返回的结果的。
                      //在第一次之前是不存在yield的
                      //除第一次next后的每一次next（）里面的值都作为上一次yield的返回结果
                      //generator的返回值总是一个对象，包含done属性和value属性

console.log(res0) //{ value: 45, done: false } done: false 说明yield还未执行完 代码的执行段是从 虚空yield 到 第一个yield 将第一个yield后的片段返回

let res1 = gen.next() //{ value: undefined, done: true } 
console.log(res1) //value: undefined 说明ret 为undefined 没有向next()传参，默认给的是undefined。done: true 说明已经没有yield了
                  //执行片段是从第一次yield后到return ret  由于没有向next()传参，所以没有上一次的返回值

let res2 = gen.next(2)//{ value: undefined, done: true }
console.log(res2) //如果 done 已经为 true，则说明代码已经执行完，这时候往next()传参也没用了。
                  //可以得出，next()执行的就是yield与yield之间的代码

//看另外一个例子
function* gen2(){
  let value1 = yield 1
  let value2 = yield 45
  let add = yield value1  + value2
  return add
}

gen2 = gen2()
//如果一直next下去
// console.log('--------')
// console.log(gen2.next()) //1
// console.log(gen2.next()) //45 
// console.log(gen2.next()) //NaN undefined + undefined
// console.log(gen2.next()) //undefined

//如果想得到46的话
console.log('-------')
gen2.next()//{ value: 1, done: false }
gen2.next(1) //{ value: 45, done: false }
let res = gen2.next(45) //{ value: 46, done: false }
//gen2.next() //{ value: undefined, done: true }
gen2.next(res.value) //{ value: 45, done: true }
/**可能看起来会有点弱智，算个东西这么麻烦。当然了，生成器也不是干这活的，做异步控制，部署iterator接口多高大上，每个函数，每个api都有自己的作用，人生也应该找到个体的价值。
 * 逐步分析以下，可能这里又会很疑惑
 * gen2.next() 获取第一次yield的值1 返回1
 * gen2.next(1) 以1作为第一次的返回值，然后执行到 let value2 = yield 45 返回yield 后的片段 45
 * let res = gen2.next(45) 以45最为第二次的返回值，然后yield value1  + value2 得出46，返回46 
 *                         注意此时只是执行到yield value1  + value2 还没有从yield value1  + value2向后执行
 * gen2.next(res.value) 将46作为第三次的返回值  所以add为46 返回  注意这里返回的确实是add 因为没有yield了，如果在这里修改add，返回的也是修改后的add
 * 
 * 所以这个例子对generator的理解非常有用
 */


/**总结
 * 一个next()调用会导致yield都会经历俩次活动（执行段）
 * 第一次是从上一次yield到yield，yield后的片段作为value返回(注意的是第一次的时候，因为没有上一次yield，所以直接将yield后的片段返回，yield后的并没有执行)
 * 第二次是将此yield作为下次开始的标识
 * 
 * 除第一次的next方法激活生成器外，每一次next()函数的参数都做为上一次yield的返回值
 * 可以再根据下面的代码思考一遍
 */
function* gen2(){
  let value1 = yield 1
  let value2 = yield 45
  let add = yield value1  + value2
  return add
}

gen2 = gen2()

gen2.next()//{ value: 1, done: false }
gen2.next(1) //{ value: 45, done: false }
let res = gen2.next(45) //{ value: 46, done: false }
//gen2.next() //{ value: undefined, done: true }
gen2.next(res.value) //{ value: 46, done: true }