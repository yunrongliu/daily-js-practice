/**
 * 命令模式：
 *  将请求与执行的动作分为请求者和接收者。用于消除耦合
 *  命令模式还需要支持撤销操作和排队
 */

 // 模拟一个物体运动 
const move = (function(){
  let commandStack = []
  let currentStack = []
  
  const moveWayFunc = {
    go() {

     return new Promise((resolve)=> {
      setTimeout(() => {
        console.log('go')
        resolve()
      }, 2000);
    })
      // return 'go'
    },
    back() {
      return new Promise((resolve)=> {
        setTimeout(() => {
          console.log('back')
          resolve()
        }, 2000);
      })
      
      // return 'back'
    },
    up() {
      return new Promise((resolve)=> {
        setTimeout(() => {
          console.log('up')
          resolve()
        }, 2000);
      })
      
      // return 'up'
    },
    down() {
      return new Promise((resolve)=> {
        setTimeout(() => {
          console.log('down')
          resolve()
        }, 2000);
      })
      // return 'down'
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
      run(commandStack,cb)
    })
  }

  // function* genExec (arr,cb) {
  //   while(arr.length) {
  //     let res = yield arr.shift()()
  //     cb(res.value)
  //   }
  // }

 async function run(arr,cb) {
    // const exec = genExec(arr,cb)
    // exec.next()
    while(arr.length) {
      let res = await arr.shift()()
      console.log(new Date().getTime())
      if(cb) {
        cb(res)
      } 
    }
  }


  document.onkeypress = function (ev) {
    let keyCode = ev.keyCode
    if(!keyMap[keyCode]) return;
    let command = makeCommand(moveWayFunc,keyMap[keyCode])

    if(command) {
      currentStack.push(command)
      commandStack.push(command)
    }

    if(currentStack.length > 3) {
      run(currentStack)
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
