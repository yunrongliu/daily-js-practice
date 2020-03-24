{
  let createSomeDiv = (()=>{
    let div 

    return function () {
      if(!div) {
        div = 'div'
      } else {
        div = 'hasDiv'
      }

      return div
    }
  })()


  let res = createSomeDiv()
  console.log(res)

  let res2 = createSomeDiv()
  console.log(res2)
}

