/**
 * 重复限定符
 * {
 *    * : 重复零次或多次
 *    + : 重复一次或多次
 *    ? : 重复一次或零次 
 *    {n} : 重复n次
 *    {n,} 重复n或更多次
 *    {n,m} 重复n到m次
 * }
 */

 // 匹配8位数字的qq号码
 {
  var reg = /\d{9}/

  var res = reg.test(152632499) // true
  var resWithNotEight = reg.test(352652) // false
 
  console.log(res)
  console.log(resWithNotEight)

 }

 // 匹配1开头11位数字的手机号码：
 {
   var reg = /1\d{10}$/

   var res = reg.test('18855606463') // true

   var resWithNoEndNum = reg.test('1885560646.') // false

   console.log(res) 
   console.log(resWithNoEndNum) 
 }

 // 匹配银行卡号是14~18位的数字：
 {
   var reg = /\d{14,18}$/

   var res = reg.test(111112222245678) // bit: 15 true

   var resWithNoFourteenToEighteen = reg.test(11) // false

   console.log(res)
   console.log(resWithNoFourteenToEighteen)
 }

 // 匹配以a开头的，0个或多个b结尾的字符串
 {
   var reg = /ab*$/
   var reg2 = /ab+$/
   var reg3 = /ab?$/

   var res = reg2.test('a') // reg: true reg2: false

   var resWithEndWithB = reg3.test('abbbb') // reg: true reg3: false

   console.log(res)
   console.log(resWithEndWithB)
 }