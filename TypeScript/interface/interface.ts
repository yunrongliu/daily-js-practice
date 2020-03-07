// {
//   function printLabel (labelObj: {label: string}) {
//     console.log(labelObj.label)
//   }

//   let testObj = {
//     name: 'yunrong',
//     label: 'hi!'
//   }

//   printLabel(testObj)
// }
{
  interface labelValue {
    label: string,
    age: number,
    job?: string // 代表可以缺省
    readonly id: number // 代表只读属性，在接口使用的地方不可改变的属性
  }

  // 使用接口来创建对象
  let tsObj : labelValue = {
    label: 'df',
    age: 13,
    id: 1
  }

  // testObj.id = 2

  // 使用接口来检测参数
  function printProps (obj: labelValue) : {info: object} {
    // obj.id = 2 
    console.log(obj.label)
    const res = {
      info: {...obj}
    }

    return res
  }

  let testObj = {
    label: 'test',
    name: 'yr',
    age: 22,
    id: 1,
  }

  console.log(printProps(testObj)) 

  // 函数接口
  interface funcSearch {
    (type: number,desc: string): object
  }

  let mySearch : funcSearch

  mySearch = function (type: number,desc: string) {
    return {
      type,
      desc
    }
  }

  /** 函数类型使用场景应该不高，有很大局限性 */

  // 可索引类型
  interface indexType {
    [index: number]: string
  }

  let testIndex : indexType = {
    1: 'cc',
    2: '1',
  }

  console.log(testIndex[2])

  /* 可索引类型只能定义为number或者string，可以限制只能以数字为下标访问，
  然后结合readonly，防止以下标的形式来该表数组，没用了。*/


  // 类接口
  interface classType {
    countNum (num1: number,num2: number) : number 
  }

  class counts implements classType {
    countNum (num1: number,num2: number) {
      return (num1 + num2)
    }

  }

  interface ClockConstructor {
      tick()
  }

  class Clock implements ClockConstructor {
      hour: number
      minute: number
      tick() {
        console.log(`${this.hour +':'+ this.minute}`)
      }

      constructor(hour: number, minute: number) { 
        this.hour = hour
        this.minute = minute
      }
  }

  let clock1 = new Clock (1,1)
  clock1.tick()

  // 继承接口
  interface Name {
    name: string,
  }

  interface Age {
    age: number
  }

  interface People extends Name , Age {
    brain: boolean
  }

  let p1 : People = {
    name: 'lc',
    age: 22,
    brain: true
  }

  /** 可以更灵活的进行组合 */

  // 混合类型 

  // 接口继承类
  class A {
    private a: string
  }

  interface ir extends A {
    test1(): void
  }

  class B extends A  implements ir {
    test1 () {
      console.log('some')
    }
  }

  /** 如果一个接口继承了某个类并且此类中具备私有属性，那么这个接口只能有该类或子类实现
   */
}