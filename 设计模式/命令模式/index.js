/**
 * 命令模式：
 *  将请求与执行的动作分为请求者和接收者。用于消除耦合
 *  命令模式还需要支持撤销操作和排队
 */

 // 模拟一个物体运动 
const move = (function(){
  let commandStack = []
  
  const moveWayFunc = {
    go() {
      console.log('go')
      return 'go'
    },
    back() {
      console.log('back')
      return 'back'
    },
    up() {
      console.log('up')
      return 'up'
    },
    down() {
      console.log('down')
      return 'down'
    }
  }

  const keyMap = {
    '119': 'up', // w
    '115': 'back', // a
    '97': 'down', // s
    '100': 'go', // d
  }

  const makeCommand = function (receiver,state) {
    return function () {
      return receiver[state]()
    }
  }

  const bindBackEvent = function (el,cb) {
    el.addEventListener('click',()=> {
      while(commandStack.length) {
        let command = commandStack.shift()
        let res = command()
        if(cb) {
          cb.call(this,res)
        }
      }
    })
  }

  document.onkeypress = function (ev) {
    let keyCode = ev.keyCode
    let command = makeCommand(moveWayFunc,keyMap[keyCode])

    if(command) {
      command()
      commandStack.push(command)
    }
  }

  const init = function (el,cb) {
    if(el) {
      bindBackEvent(el,cb)
    }
  }

  return {
    init
  }
})()
