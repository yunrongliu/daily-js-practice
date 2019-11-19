{
  /**
   * ==
   * == 和 === 的区别不做讨论
   * == 会在 等号左右 进行隐式转换 并且如果是变量 等号俩边都会进行一次右查询进行取值
   * 罗列了几种情况
   */

   //1.布尔值 和 数字 进行比较 布尔值会转换成数字 true: 1 false: 0 和if判断是不一样的
   console.log(1 == true) //false
   console.log(2 == true) //true

   //2.数字 和 字符串 比较 字符串会转换成数字
   console.log("1" == 1) //true
   console.log("1d" == 1) //false

   //3.数字 字符串 和对象相比较 ，无论是数字还是字符串 对象会优先使用valueOf，然后再用toString  数组也是个对象 这个是很关键的
   //数组调用toString方法又会间接调用join方法,而我们可以修改join的属性,所以可以完成一些沙雕操作,当然建立在valueOf没有被重写的情况下
   //我大胆的猜测一下：原因是Object.valueOf实现的比较特殊，如果我们修改了对象的valueOf，其实是屏蔽了Object的valueOf的，所以会导致toString用不了
   //纯属瞎猜
  let arr = [1,2,3]
  console.log(arr == '1,2,3') //true

  arr.join = arr.shift //shift 从数组头部删除一个元素  js 的数组 是非常灵活的 
  console.log(arr == 1 && arr == 2 && arr == 3) //true


  console.log(null == undefined)
  console.log(NaN == NaN)
  //另外还有一些固定规则
  /**
   * null == undefined
   * NaN不等于任何值 包括自身
   */

  
}