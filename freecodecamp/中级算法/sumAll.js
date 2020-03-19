/**
 * 记录freecodecamp 中级算法练习
 */

 /**
  * 1. 接收一个数组 [a,b] 取a和b中间所有数的和(包括a，b)
  * [1,4] 1+2+3+4
  * sumAll
  */
 {
   //1. 获取最大和做小，然后每一项相加
   let sumAll = function (arr) {
    const max = Math.max(...arr)
    const min = arr[0] === max ? arr[1] : arr[0]

    return Array.from({length: (max - min + 1)})
                  .reduce((ret,current,inx)=> {
                    ret += (min + inx)

                    return ret
                  },0)
   }

   let res = sumAll([1,4])
   console.log(res) // 10 => true
 
   //2. 计算连续范围之和为 ((start + end) * bitCount / 2)
   sumAll = function ([start,end]) {
    const bitCount = Math.abs(start - end) + 1

    return ((start + end) * bitCount / 2)
   }

   res = sumAll([1,4])
   console.log(res) // 10

   //3. 递归求解 
   /**
    * 拿到俩个数的差值 -> 判断俩个数是否相等 ? start + sumAll(start+diff,end) : start
    * @param start {number}
    * @param end {number}
    * @return sum {number}
    */
  sumAll = function ([start,end]) {
     const diff = (start - end) < 0 ? 1 : -1
     if(start === end) {
       return start
     }

     return start + sumAll([(start+diff),end])
   }

   res = sumAll([1,4])
   console.log(res) // 10
 }