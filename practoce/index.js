/**
 *如何让 (a == 1 && a == 2 && a == 3) 的值为true？  */ 
{
  /**
   * 1 definedProperty 局限性很大
   */

  // global.i = 1

  // Object.defineProperty(global,'a',{
  //   get: function(){
  //     return this.i++
  //   }
  // })

  // console.log(a)

  // console.log((a == 1 && a == 2 && a == 3))


  /**
   * 2 proxy 很方便 注意get 返回的是一个func
   */
  // let a = new Proxy({},{
  //   i: 1,
  //   get: function(){
  //     return () => this.i++
  //   }
  // })

  // // console.log(a)
  // //console.log(a.i())
  // console.log((a == 1 && a == 2 && a == 3))

  /**
   * Symbol.toPrimitive 最好理解的一版
   */
  // let a = {
  //   [Symbol.toPrimitive] : (function(){
  //     let i = 1
  //     return () => i++
  //   })()
  // }

  // console.log((a == 1 && a == 2 && a == 3))

  /**
   * 重写join
   */
  let a = [1,2,3]
  a.join = a.shift
  console.log(a == 1)
  // console.log((a == 1 && a == 2 && a == 3))
}