// 分为订阅者和发布者
// 订阅者订阅一个key，并传入对应的回调
// 发布者发布一个key，并传入对应的参数
// 支持先发布，后订阅
// 支持只订阅一次
// 支持命名空间 => 块的概念
const pubsub = (function(){
  const blockCatchs = {} // 命名块空间
  const offlineCatchs = {} // 离线事件
  let nowBlockName = 'default'
  let currentBlock = blockCatchs[nowBlockName] = {}
  let currentOffLine = offlineCatchs[nowBlockName] = {}

  function _publish (key,...data) {
    const _self = this
    if(currentBlock[key] && currentBlock[key].length) {

      return run(currentBlock[key],function () {

        return this.call(_self,...data)
      })
    }
  }

  function _subscribe (key,cb) {
    if(!currentBlock[key]) {
      currentBlock[key] = []
    }
    currentBlock[key].push(cb)
  }

  function _removeSubscribe () {

  }

  function _once () {

  }

  function resetNowBlockName () {
    nowBlockName = 'default'
    currentBlock = blockCatchs[nowBlockName]
  }

  function _withBlock (blockName) {
    nowBlockName = blockName
    if(!blockCatchs[nowBlockName]) {
      blockCatchs[nowBlockName] = {}
    }
    currentBlock = blockCatchs[nowBlockName]
  }

  function run (arr,fn) {
    return arr.reduce((ret,currFn)=> {
      let res = fn.call(currFn)
      ret.push(res) 

      return ret
    },[])
  }

  const _pubsub = {
    withBlock(blockName) {
      _withBlock(blockName)

      return this
    },
    subscribe(key,cb) {
      if(!currentOffLine[key]) {
        currentOffLine[key] = []
      }
      
      _subscribe(key,cb)
      if(currentOffLine && currentOffLine[key]) {
        run(currentOffLine[key],function(){
          this()
        })
        currentOffLine[key] = null
      } 
      resetNowBlockName()
    },
    publish(key,...args) {
      let fn =  ()=> {
        _publish.call(this,key,...args)
        resetNowBlockName()
      }

      if(currentOffLine[key] !== null) {
        currentOffLine[key] = currentOffLine[key] ?  currentOffLine[key] : [] 
        return currentOffLine[key].push(fn)
      }

      return fn()
      
      
    }
  }

  return _pubsub
})()

pubsub.publish('test','ccc')

pubsub.subscribe('test',(data)=> {
  console.log(data)
})

pubsub.withBlock('block1').subscribe('test',(data)=> {
  console.log('block1',data)
})

pubsub.withBlock('block2').subscribe('test',(data)=> {
  console.log(data)
})

pubsub.withBlock('block1').publish('test','ddd')

pubsub.publish('test','ccc')
