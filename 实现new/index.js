{
  let _new = () => {
    let thisObj = {}

    let {constructor,...args} = arguments

    thisObj._proto_ = constructor.prototype

    let result = constructor.call(thisObj,args)

    if(result && typeof result ==='function' || typeof result === 'object'){
      return result
    }

    return thisObj
  }

  function Person(name,age){
    this.name = name
    this.age = age
  }

  let person1 = _new(Person,'liu',18)
  let person2 = _new(Person,'yang',18)

  console.log(person1.name)
  console.log(person2.name)
}