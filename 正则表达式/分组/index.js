/**
 * 分组
 * 正则表达式中用小括号()来做分组，也就是括号中的内容作为一个整体。
 */

 // 匹配多个以ab开头的字符串
 {
  let reg = /^(ab)+/
  let res = reg.test('abcc') // true

  console.log(res)
 }
