# *前端代码规范*

## 常见规范
   1. 使用let const替代var,使用const定义唯一引用,使用let定义变量。并将const let 分组
   2. 不要使用封号(除 return;)
   3. 使用换行或 {} 来进行代码的分区
   4. 对于常用的方法使用统一的名称
   `
    如:  通过查询条件请求列表或大量数据方法 querySelect
         导出 exportExcel
         重置 reset
         新增 addData
         修改 modifyData
         删除 deleteData 
         具有多个相同功能的函数放入组件中  一个组件对应一组功能
         在sotower中 使用语义进行区别
   `
   5. 禁止变量链式赋值
   6. 避免使用 ++ -- 一元运算符
   7. 用三元表达式替代不必要的if else 多级三元表达式必须分批处理
   `
      let a = true
      let b = true
      let res1 = b ? b : 1
      let res2 = a ? res1 : 2
   `
   8. 避免不必要的三元表达式
   `
      // bad
      const foo = a ? a : b
      const bar = c ? true : false
      const baz = c ? false : true
      
      // good
      const foo = a || b
      const bar = !!c
      const baz = !c
   `
   9. 使用=== 和 !===
   10. 使用 switch case 时 将 case里的代码块用 {} 包裹。同理，有段落意义的都应该使用 {} 包裹
   `
    switch (foo) {
      case 1: {
        let x = 1;
      break;
      }
      case 2: {
        const y = 2;
      break;
      }
      default: {
        class C {}
      }
    }
   `
   11. 当在一个语句中做运算或者使用三元表达式作为结果，每一段运算都应该用()包裹
   `
    const foo = (a && b < 0) || c > 0 || (d + 1 === 0)

    const bar = (a ** b) - (5 % d)
   `
   12. 注解
   `
      每一个函数外部都必须有一个关于参数的接收和返回相关的注解 
      每一个函数内部都必须具备函数作用域里变量的解释
      注解 段落之间 使用 空格分隔
      /*
      * 用途 ……
      * @param id [number] 含义：……
      * @return name [string] 含义: ……
      */
      function getNameById(id) {
        /*
        * @private obj {object} 含义： 名字 Id map
        */
        let obj = {
          1: 'cc'
        }
        let name = obj[id]
        return name
      }

      如果是todo 和 fixme 那么在代码上方使用 // 单行注释 并标识原因
      function test () {
        // ----todo 叙述下面的规划
      }

   `
## 1. 对象   
    1. 使用对象字面量创建对象
    `
      // bad
      const item = new Object();
      
      // good
      const item = {};
    `
    2. 创建动态属性的对象时使用 [] 包裹
    `
      const obj = {
          id: 5,
          name: 'San Francisco',
          [''+var]: true,
      }
    `
    3. 使用对象方法速记语法,并将速写属性写在上面
    `
      let a = 1

      // bad
      const atom = {
        value: 1,
        a: a
        addValue: function (value) {
          return atom.value + value;
        },
      }
      
      // good
      const atom = {
        a
        addValue(value) {
          return atom.value + value;
        },
        value: 1,
      }
    `
    4. 只用引号引无效标识符的属性或中文属性,并且只使用单引号
    `
      // bad
        const bad = {
          'foo': 3,
          'bar': 4,
          'data-blah': 5,
          '日期': '2019-12-18'
        }
        
        // good
        const good = {
          foo: 3,
          bar: 4,
          'data-blah': 5,
          '日期': '2019-12-18'
        }
    `
    5. 不要直接调用对象的 hasOwnProperty isPrototypeOf propertyIsEnumerable
    `
      //因为以上三个属性是可写的 且用于判断
      //可以使用反射来代理这三个方法
      export default reflectObj = {
        has: Object.prototype.hasOwnProperty.call
        ……
      }
    `
    6. 使用对象展开符取代assign浅复制对象
    `
      let obj = {
        a: 1,
        c: 1
      }

      //bad
      let copy = Object.assign({},obj)

      //good
      let copy = {...obj}
    `
    7. 使用Reflect来取代js的关键字
    `
      //Reflect 是一个内置对象，不是函数对象，所以不能构造

      //使用deleteProperty 取代 delete关键字
      let key = Symbol('key')
      let obj = {
        a: 2,
        [key]: 3
      }

      //bad
      delete obj.a

      //good
      Reflect.deleteProperty(obj,a)

      //使用has来判断对象是否具有某一属性
      //bad 
      obj.a ? xxx : xx
      //good
      Reflect.has(obj,a)

      //使用ownKeys来遍历对象的属性（全部属性，忽略enumerable）
      //bad
      Object.keys(obj).map
      //good
      Reflect.ownKeys(obj).map

      //使用 isExtensible preventExtensions getOwnPropertyDescriptor 来取代Object的同名方法

      Reflect.isExtensible(obj) //用于判断一个对象是否可拓展
      Reflect.preventExtensions(obj) //用于阻止对象添加属性
      Reflect.getOwnPropertyDescriptor(obj) //获取对象的装饰（计算）属性

      //与Object对象的区别在于 如果传入的不是一个对象，Reflect会报错 而Object会强制转换 
    `

## 2. 数组   
    1. 使用字面量创建数组
    `
      // bad
      const items = new Array()
      
      // good
      const items = []
    `
    2. 禁止使用数组长度去添加元素
    `
      const someStack = []
 
      // bad
      someStack[someStack.length] = 'abracadabra'
      
      // good
      someStack.push('abracadabra')
    `
    3. 使用数组展开操作符复制数组
    `
      // bad
      const len = items.length
      const itemsCopy = []
      let i
      
      for (i = 0; i < len; i += 1) {
          itemsCopy[i] = items[i]
      }
      
      // good
      const itemsCopy = [...items]
    `
    4.将一个类数组的对象（arguments,elementArr）转换成数组时，使用展开操作符，不使用Array.from
    `
      onst foo = document.querySelectorAll('.foo')
 
      // good
      const nodes = Array.from(foo)
      
      // best
      const nodes = [...foo]
    `
    5.迭代类数组时，使用Array.from进行迭代
    `
      const baz = [...foo].map(bar);
 
      // good
      const baz = Array.from(foo, bar)
    `
    6.使用高阶函数迭代数组时必须具有返回值
    `
      [1, 2, 3].map((x) => {
          const y = x + 1;
          return x * y;
      })
    `
    7.数组有多个项，换行格式如下
    `
      const arr = [
        1,
        2,
        5,
        6,
        7,
      ]
      //最后一项逗号在sotower里面不能保留，其他环境可以保留
    `
## 3. 解构赋值   
    1.如果函数接收一个对象作为参数，使用解构赋值
    `
      //bad
      let func = function(obj){
        let name = obj.name
        let id = obj.id

        console.log(name,id)
      }

      //best
      let func = function({name,id}){
        console.log(name,id)
      }

      //如果参数过多可以分批进行
      let func = function({name,id,...other}){
        console.log(name,id,other) //将常用的解构出来
      }
    `
    2. 使用数组解构来获取数组值
    `
      //bad
      let arr = [1,2,3]
      let first = arr[0]
      let second = arr[1]

      //good
      let [first,second] = arr
    `
    3. 当一个函数需要返回多个项时使用对象，而不是数组
    `
      let func = function () {
        return {
          a: 1,
          b: 2,
          c: 3
        }
      }

      let {a,c} = func() 
    `
## 3. String
    1. 字符串使用单引号
    `
      let str = 'cz'
    `
    2. 使用模板字符串来构建变量字符串
    `
      let name = 'lc'
      let age = 21
      let str = `UserName is ${name} and ${age} years old. `
    `
    3. 不要用eval解析一个字符串

## 4. Function   
    1. 定义函数 使用统一的函数名称去接收具有语义的函数
    `
      let queryTableList = function queryInStockTableListByNum () {

      }

      let obj = {
        queryTableList: function queryInStockTableListByNum (){

      }
    }`
    2. 使用IIFE表达式时，用花括号包裹
    `
      (function () {
          console.log('Welcome to the Internet. Please follow me.');
      }())
    `
    3. 禁止在if else语句中使用函数声明。
    4. 禁止使用arguments作为变量名或者参数名
    5. 使用展开操作符替代arguments
    `
      //bad
      let func = function () {
        let arg = Array.prototype.slice.call(arguments)
      }

      //good
      let func = function (...args) {
        console.log(args)
      }
    `
    6. 有使用默认参数的场景就使用默认参数,不要在定义默认参数上进行操作,始终将默认参数放到最后
    `
      let func = function (age,name = 'lc') {

      }
    `
    7. 定义函数时，隔开函数签名，括号俩边用空格隔开
    `
      let func = function a() {

      }
    `
    8. 不要改变参数
    `
      let func = function (a) {
        //error
        a = 4

        //good
        let c = a
      }
    `
## 5. 箭头函数
    1. 注意箭头函数的使用场景，不要滥用
    `
      箭头函数适用于在匿名函数里指定上下文的this
      箭头函数不适合在对象或定义原型方法时使用
    `
    2. 箭头函数格式
    `
      无论箭头函数参数是否大于1，都必须使用()包裹
      例： 
        let fn = (dd) => {}
      
      如果箭头函数只返回一行内容，将{}省略
      例: 
        let fn = (dd) => dd + 2

    `
## 6.模块
    1.使用 import 和 export 

    2.使用有语义的变量接收

    3.import 和 export 必须分开使用

    4.从统一路径中导入的必须在一行接受完

    5.export 导出的必须时不可变的值
    `
      //error
      let a = 1
      export default {a}

      //right
      const a = 1
      export default {a}
    `
    6.一个模块导出一个内容，尽量使用export default

    7.import 必须保证在文件的顶部

## 7.代码分格
    1. 使用俩个空白符来做分隔

    2. 在大括号前放置一个空格符
    `
      // bad
      function test(){
          console.log('test')
      }
      
      // good
      function test() {
          console.log('test')
      }
      
      // bad
      dog.set('attr',{
          age: '1 year',
          breed: 'Bernese Mountain Dog',
      })
      
      // good
      dog.set('attr', {
          age: '1 year',
          breed: 'Bernese Mountain Dog',
      })
    `

    3. 在控制语句（if、while 等）的小括号前放一个空格。在函数调用及声明中，不在函数的参数列表前加空格
    `
      // bad
      if(isJedi) {
          fight ();
      }
      
      // good
      if (isJedi) {
          fight();
      }
      
      // bad
      function fight () {
          console.log ('Swooosh!');
      }
      
      // good
      function fight() {
          console.log('Swooosh!');
      }
    `

    4. 使用空格把运算符隔开
    ` let a = 1 + 3`

    5. 长方法链式调用时使用缩进（2个以上的方法链式调用）。使用一个点 . 开头，强调该行是一个方法调用，不是一个新的声明
    `
      $('#items')
          .find('.selected')
          .highlight()
          .end()
          .find('.open')
          .updateCount()
    `

    6. return 所在行上一行必须是空白行

    7. 不要在圆括号内加空格
    `error: if ( foo ) {

    }`

    8. 不要在中括号内添加空格
    `error: [ 1 , 2 , 3]`
    
    9. 在大括号内添加空格
    `{ a: 1 }`

    10. 添加结尾的逗号
    `
      在sotower不能这样，这样会添加一个为undefined的值

      主要作用是方便 git diff 的比较
    `

## 8. 类型转换
    1. 字符串
      `let str = String(a)`

    2. 数字
      `
      let num = Number(b) //使用Number进行转换

      let a = parseInt(b,10) //parseInt 必需指定基数进行转换
      `

## 9. 命名规则
    1. 避免使用单字母名称。使你的命名具有描述性

    2. 当命名对象，函数和实例时使用驼峰式命名

    3. 命名构造函数时不允许使用首字母大写 如果很长使用 _分隔

    4. 不要使用下划线开头或结尾

    5. basename 应与其默认导出的名称正好匹配

    6. 当 导出(export) 一个默认函数时使用驼峰式命名

    7. 缩写词首字母应该总是全部大写，或全部小写 
      `
        AYCHttp

        aycHttp
      `