/**
 * 函数节流
 */
// let throttle = {
//   /**
//    * @private onProcessFn {function} 要执行的fn
//    * @private process {function} 初始化的fn
//    * @private delay {number} 规定多久触发一次
//    * @private timer {webApis -> setTimeout} 定时器对象
//    */
//   onProcessFn: null,
//   delay: 500,
//   timer: null,
//   process(){
//     clearTimeout(this.timer)
//     this.timer = setTimeout(() => {
//       this.onProcessFn()
//     }, this.delay);
//   },
//   /**
//    * @param fn {function} 作为传入的fn
//    */
//   init(fn){
//     this.onProcessFn = fn
//   }
// }

