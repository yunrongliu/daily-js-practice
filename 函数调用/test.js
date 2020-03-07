{
  let test1 = function(inx,data){
    console.log(arguments)
    console.log(inx)
    console.log(data)
    return data
  }

  let test2 = function(inx,data){
    console.log(arguments)
    console.log(inx)
    console.log(data)
    return data
  }
  
  let test3 = function(inx,data){
    console.log(arguments)
    console.log(inx)
    console.log(data)
    return data
  }

  let execStack = function(fnStack,efn){
    return fnStack.reduce((ret,fn,inx) => {
      let res = efn.call(fn,inx)
      ret.push(res)
      return ret
    },[])
  }

  let obj = {
    test(){
      let fnStack = []
      fnStack.push(test1)
      fnStack.push(test2)
      fnStack.push(test3)
      let _self = this
      let arg = [...arguments] //[1]

      let result = execStack(fnStack,function(inx){
        console.log(this)
        console.log(_self)
        arg.unshift(inx)
        return this.apply(_self,arg)
      })

      console.log(result)
    }
  }

  obj.test(1)
}