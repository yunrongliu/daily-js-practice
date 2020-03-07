function defineReactive (target,key,val) {
  observe(val)

  var dep = new Dep()

  Object.defineProperty(target,key,{
    enumerable: true,
    configurable: true,
    get () {
      console.log('init defineProperty Dep.target?',Dep.target)
      if(Dep.target) {
        dep.addSub(Dep.target)
      }
      return val
    },
    set (newVal) {
      if(val === newVal) {
        return;
      }
      val = newVal
      console.log('属性' + key + '已经被监听了，现在值为：“' + newVal.toString() + '”')
      dep.notify()
    }
  })
}

function observe (target) {
  if(!target || Object.prototype.toString.call(target) !== '[object Object]') {
    return;
  }

  Object.keys(target).forEach((key)=> {
    defineReactive(target,key,target[key])
  })
}

function Watcher (vm,exp,cb) {
  this.vm = vm
  this.exp = exp
  this.cb = cb
  this.value = this.get()
}

Watcher.prototype = {
  update: function () {
    this.run()
  },
  run: function () {
    var value = this.vm.data[this.exp]
    var oldVal = this.value
    if(value !== oldVal) {
      this.value = value
      this.cb.call(this.vm,value,oldVal)
    }
  },
  get: function () {
    console.log('init Watcher getter')
    Dep.target = this
    var value = this.vm.data[this.exp]
    Dep.target = null
    return value
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