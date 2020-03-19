/**
 * 断言： 正则可以指明在指定的内容的前面或后面会出现满足指定规则的内容
 * 零宽:  断言只是匹配位置，不占字符，也就是说，匹配结果里是不会返回断言本身
 * 
 * 使用js有字符串和字面量俩种方式，字符串方式需要转义
 */

 const template = "<span class=\"read-count\">阅读数：641</span>"
 // 解析出对应的阅读数是多少

 /**
  * 1.正向先行断言（正前瞻）：
  *  语法： (?=pattern)
  *  作用：匹配pattern表达式的前面内容，不返回本身。
  * */ 

  {
    // let reg = /\d+(?=<\/span>)/
    let reg = '\\d+(?=<\/span>)'

    let regexp = new RegExp(reg)

    let res = template.match(regexp)

    console.log(res) // 641
    /**
     * [
        '641',
        index: 29,
        input: '<span class="read-count">阅读数：641</span>',
        groups: undefined
      ]
     */
  }

  /**
   * 正向后行断言（正后顾）:
   * 语法：（?<=pattern）
   * 作用：匹配pattern表达式的后面的内容，不返回本身。
   */
  {
    let reg = '(?<=<span class=\"read-count\">阅读数：)\\d+'
    let regexp = new RegExp(reg)

    let res = template.match(regexp)
    console.log(res)
    /** 
     * [
        '641',
        index: 29,
        input: '<span class="read-count">阅读数：641</span>',
        groups: undefined
      ]
    */
  }

  /**
   * 负向先行断言（负前瞻）
   * 语法：(?!pattern)
   * 作用：匹配非pattern表达式的前面内容，不返回本身。
   */
  {
    let reg = '\\d+(?!<\/span>)'
    let regexp = new RegExp(reg)

    let res = template.match(regexp)
    console.log(res)
    /** 
     * 只匹配了俩位，指定位数后可匹配指定位数
     * 因为非pattern匹配到的第一位是1，前面内容为数字的是64
     * [
        '64',
        index: 29,
        input: '<span class="read-count">阅读数：641</span>',
        groups: undefined
      ]
    */
  }

  /**
   *  负向后行断言（负后顾）
   *  语法：(?<!pattern)
   *  作用：匹配非pattern表达式的后面内容，不返回本身。
   */
  {
    let reg = '(?<!<span class=\"read-count\">阅读数：)\\d+'
    let regexp = new RegExp(reg)

    let res = template.match(regexp)

    console.log(res) // 41
    /**
     * 原因同上
     * [
        '41',
        index: 30,
        input: '<span class="read-count">阅读数：641</span>',
        groups: undefined
      ]
     */
  }