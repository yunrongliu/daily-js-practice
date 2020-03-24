// 高阶函数的定义
// 1. 接收一个函数作为参数
// 2. 返回一个函数

// 以接收函数为参数的函数
// forEach(()=>{})  map(()) every some window.addEventListener('click',()=> {})

// 以返回函数为结果的函数
// 1.bind 

// 代理 
// 生成div的函数，接收num，是否隐藏 
// 返回一个div的数组

// 不用代理模式
const genDivWithTargetNum = function(num,config) {

  return Array.from({length: num})
                .map((current)=> {
                  current = document.createElement('div')
                  if(!config.show) {
                    current.style.display = 'none'
                  }
                  if(config.html) {
                    current.innerHTML = config.html
                  }

                  return current
                })
}

// 使用代理模式

// 1. 回调函数代理

const genDiv = function(num,cb) {

  return Array.from({length: num})
                .map((current)=> {
                  current = document.createElement('div')

                  if(cb) {
                    cb(current)
                  }
                  return current
                })
}

const genDivWithUnshow = function (num) {
   const arr = genDiv(num,(divEl)=> {
    divEl.style.display = 'none'
   })

   return arr
}

const res = genDivWithUnshow (10)

console.log(res)
// 策略

// 迭代器