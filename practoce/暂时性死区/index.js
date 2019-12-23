{
  if(false){
    var a = 1
  }
  console.log(a)
}

{
  let fn = function(x = 2,y = x){
    return [x,y]
  }

  let tempDeadZone = function(x = y,y = 2){
    return [x,y]
  }
  console.log(fn()) //2,2
  console.log(tempDeadZone()) //Cannot access 'y' before initialization

  /**
   * 简单来说，就是AO里面已经存了变量x，y，但是值是未定义的undefined，且在执行到赋值语句前无法访问
   */
}

