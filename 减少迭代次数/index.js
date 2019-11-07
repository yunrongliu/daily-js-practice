{
  let items = Array(1500).fill().map( (e,i) => 'item'+i)
  let i = items.length % 8

  while(i){
    process(items[i--])
  }

  i = Math.floor(items.length / 8)

  while(i){
    console.log(i)
    process(items[i--])
    console.log(i)
    process(items[i--])
    console.log(i)
    process(items[i--])
    console.log(i)
    process(items[i--])
    console.log(i)
    process(items[i--])
    console.log(i)
    process(items[i--])
    console.log(i)
    process(items[i--])
    console.log(i)
    process(items[i--])
    console.log(i)
  }

  function process(col){
    console.log(col)
  }

  
}