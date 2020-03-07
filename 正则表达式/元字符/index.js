/** 
 * {
 *  . 匹配除换行符以外的任意字符
 *  \w 匹配字母或数字或下划线
 *  \s 匹配任意的空白符
 *  \d 匹配数字
 *  \b 匹配单词的开始或结束
 *  ^ 匹配字符串的开始
 *  $ 匹配字符串的结束
 * }
*/

/** . */
{
  var reg = /./
  var res = reg.test('\n') // true 
  var resWithStr = reg.test('\nfffff') // false
}

/** \w */
{
  var reg = /\w/
  var res = reg.test('cc') // true
  var resWithNum = reg.test(123) // true
  var resWithChinese = reg.test('汉字') // false js默认不支持\w匹配汉字
  var resWithUnderline = reg.test('_') // true
}

/** \s */
{
  var reg = /\s/
  var res = reg.test(' ') // true
}

/** \d */
{
  var reg = /\d/
  var res = reg.test(11111) // true
}

/** \bap */
{
  var reg = /\bap/
  var resWithStart = reg.test('apply') // true
  // /ap\b/
  var reg = /ap\b/
  var resWithEnd = reg.test('ffap') // false 
}


/** ^ */
{
  var reg = /^/
  var res = reg.test('add') // false
  var resWithD = reg.test('dog') // true
}

/** $ */ 
// d$
{
  var reg = /d$/
  var res = reg.test('end') // true
  console.log(resWithEnd)
}





