/**
 * 策略模式的定义
 *    定义一系列的算法，把它们一个一个封装起来，并且使它们可以相互替换
 */


//  let dealMethodsObj = {
//    dealA() {
//      console.log('A')
//    },
//    dealB() {
//      console.log('B')
//    },
//    dealC() {
//      console.log('C')
//    }
//  }

function dealMethods (type) {
  if(type === 'A') {
    dealA()
  }
  if(type === 'B') {
    dealB()
  }
}


//  const dealMethods = function (type) {
//    dealMethodsObj[type]()
//  }

//  dealMethods('dealA') // A

// 当一个函数需要处理很多情况时，使用不同的函数去分解功能，然后通过对象映射避免多重判断


// 示例： 表单验证
// 功能： 验证表单是否为空 | 验证表单是否为纯数字 | 验证表单长度
//  功能可以组合 ， 最终返回boolean类型 用于判断有没有通过

// 创建处理对象
/**
 * @param val {any}  表单的值
 * @param config {object} 配置对象
 */
const verificationObj = {
  isEmpty(val,config) {
    if(val === '') {
      return config.errorMsg
    }
     
  },
  isPureNumber(val,config) {
    const reg = /(^[0-9]+(.[0-9]+)?)$/
    const flag = reg.test(val)

    if(!flag) {
      return config.errorMsg
    }
  },
  isTargetLength(val,config) {
    if(String(val).length !== config.length ) {
      return config.errorMsg
    }
     
  }
}

// 创建处理函数
const createVerifFunc = function () {
  this.catchs = []
}

// 添加处理规则
/**
 * @param target {object} 表单对象
 * @param rules {object}
 *  {
 *    name: {
 *      verifType: 'isEmpty',
 *      errorMsg: 'name不能为空'
 *    },
 *    password: {
 *      verifType: 'isTargetLength',
 *      length: 18,
 *      errorMsg: 'password不能超过18位'
 *    }
 *  }
 */
createVerifFunc.prototype.addRules = function (target,rules) {
 let rulesCol = Object.keys(rules)
          .reduce((ret,props)=> {
            const func = function() {
              const nowObj = rules[props]
              return verificationObj[nowObj.verifType](target[props],nowObj)
            }

            ret.push(func)

            return ret
          },[])

  this.catchs.push(...rulesCol)
}

// 验证 
/**
 * @return errormsg {string | undefined}
 */
createVerifFunc.prototype.verifData = function () {
  const msg = this.catchs.map((currFunc)=> {
    let res = currFunc()

    return res
  })

  if(msg) {
    return msg[0]
  }

  return true
}

const verif = new createVerifFunc()
const formObj = {
  name: '',
  password: 12354866
}
const rules = {
  name: {
    verifType: 'isEmpty',
    errorMsg: 'name，不能为空'
  },
  password: {
    verifType: 'isTargetLength',
    errorMsg: 'password不能超过18',
    length: 18
  }
}
verif.addRules(formObj,rules)

console.log(verif.verifData())

