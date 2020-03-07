const rawToReactive = new WeakMap()
const reactiveToRaw = new WeakMap()
 
// utils
function isObject(val) {
  // console.log(val)
 return typeof val === 'object'
}
 
function hasOwn(obj, key) {
 const hasOwnProperty = Object.prototype.hasOwnProperty
 return hasOwnProperty.call(obj, key)
}
 
// traps
function createGetter() {
 return function get(target, key, receiver) {
  console.log(target, key)
  console.log(window.target)
  if(window.target) {
    target.dep.addSub(window.target)
  }
  const res = Reflect.get(target, key, receiver)
  return isObject(res) ? reactive(res) : res
 }
}
 
function set(target, key, val, receiver) {
 const hadKey = hasOwn(target, key)
 const oldValue = target[key]
 
 console.log(target,key)
 val = reactiveToRaw.get(val) || val

 const result = Reflect.set(target, key, val, receiver)
 
 if (!hadKey) {
  target.dep.notify()
  console.log('trigger ...')
 } else if(val !== oldValue) {
  target.dep.notify()
  console.log('trigger ...')
 }
 
 return result
}
 
// handler
const mutableHandlers = {
 get: createGetter(),
 set: set,
}
 
// entry
function reactive(target) {
   if(!target.dep) {
     target.dep = new Dep()
   }
   return createReactiveObject(
      target,
      rawToReactive,
      reactiveToRaw,
      mutableHandlers,
   )
}
 
function createReactiveObject(target, toProxy, toRaw, baseHandlers) {
   let observed = toProxy.get(target)
   // 原数据已经有相应的可响应数据, 返回可响应数据
   if (observed !== void 0) {
      return observed
   }
   // 原数据已经是可响应数据
   if (toRaw.has(target)) {
      return target
   }
   observed = new Proxy(target, baseHandlers)
   toProxy.set(target, observed)
   toRaw.set(observed, target)
   console.log(' toRaw', toRaw)
   return observed
}


// let data = {
//   a: 'a',
//   b: 'b',
//   c: 'c',
//   obj: {
//     a: 'c',
//     b: 'e',
//     secObj: {
//       cc: 'dd'
//     }
//   }
// }

// data = reactive(data)

// data.a = 'test1'
// data.obj.a = 'test2'
// data.obj.secObj.cc = 'gg'

function Watcher (vm,exp,cb) {
  this.vm = vm
  this.getter = parsePath(exp)
  this.cb = cb
  this.value = this.get()
}

Watcher.prototype = {
  update: function () {
    this.run()
  },
  run: function () {
    var value = this.get()
    var oldVal = this.value
    console.log(value,oldVal)
    if(value !== oldVal) {
      this.value = value
      this.cb.call(this.vm,value,oldVal)
    }
  },
  get: function () {
    console.log('init Watcher getter')
    window.target = this
    var value = this.getter.call(this.vm,this.vm.data)
    window.target = null
    return value
  }
}

function parsePath(path) {
  const bailRE = /[^\w.$]/
  if(bailRE.test(path)) {
    return;
  }
  const segments = path.split('.')
  return function (obj) {
    for(let i = 0;i < segments.length;i++) {
      if(!obj) return;
      obj = obj[segments[i]]
    }
    return obj
  }
}

function Dep () {
  this.subs = []
}

Dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub)
  },
  notify: function () {
    this.subs.forEach(function (sub) {
      sub.update()
    })
  }
}