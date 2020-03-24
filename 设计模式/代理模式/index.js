/**
 * 代理模式
 *  理解：1.一个函数有它的唯一职责，比如生成div，加载图片等
 *          如果希望对此函数拓展功能，比如div增加控制样式或内容，图片增加懒加载等
 *          如果直接在此函数上面拓展，则会造成功能混乱，可能会造成不必要的判断，函数自身变得难以维护
 * 
 *       2. 所以代理模式的主要思想 是 将最基本或者核心的功能放在一个被代理函数中（比如生成div，那核心就是生成div的代码），此函数的功能应尽可能简单
 *          然后将需要添加或选择的功能放在一个代理函数中，代理函数本身不具备核心功能，所以在处理前或者处理后，将功能转发到被代理函数中
 * 
 *  代理模式在前端有很多应用场景，但是核心就是把控制权交给代理函数，使得代码更加灵活
 */

 //  比如一个函数，可以生成指定数量的div，并可以控制生成的div是否显示

 // 1. 不用代理
  /**
   * @param num {number} 要生成的个数
   * @param opt {object} 配置
   * 
   * @return divCol {Array} 生成的div集合 
   */
  const genTargetNumDiv = function (num,opt) {

    return Array.from({length: num})
                  .map((current)=> {
                    current = document.createElement('div')

                    if(!opt.show) {
                      current.style.display = 'none'
                    }

                    return current
                  })
  }

  // 使用代理
  const genDiv = function () {
    let div = document.createElement('div')

    return div
  }

  // 创建指定的div
  const genTarNumDiv = function (num,cb) {

    return Array.from({length: num})
                  .map((current)=> {
                    current = genDiv()
                    if(cb) {
                      cb.call(null,current)
                    }

                    return div
                  })
  }

  // 回调代理
  let divCol = genTarNumDiv(10,(el)=> {
    el.style.display = 'none'
  })

  // 函数代理
  const genTarNumDivWithUnShow = function (num) {
    const divCol = genTarNumDiv(num)

    return divCol.map((current)=> current.style.display = 'none')
  }


  // 缓存代理
  const mult = function (...args) {
    
    return args.reduce((ret,current)=> {
      ret = ret * current

      return ret
    },1)
  }

  const plus = function (...args) {
    
    return args.reduce((ret,current)=> {
      ret += current

      return ret
    },0)
  }

  const proxyComputed = function (fn) {
    var cache = {}

    return function (...args) {
      args = args.sort((a,b)=> a-b)
      let key = args.join(',')
      if(cache[key]) {
        return cache[key]
      }
      cache[key] = fn.call(null,args)
      return cache[key]
    }
  }