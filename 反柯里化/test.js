{
  Function.prototype.unCurring = function () {
    let _self = this
    return function () {
      let obj = Array.prototype.shift.call( arguments )
      return _self.apply( obj , arguments)
    }
  }

  // Array['push'] = Array.prototype['push'].unCurring()

  let obj = {
    length: 3,
    0: 1,
    1: 2,
    2: 3
  }

  Array.prototype.push.call(obj,4)

  console.log(obj)
}