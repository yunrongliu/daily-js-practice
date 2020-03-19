/**
 * 比较两个数组，并返回一个新数组，其中包含仅在两个给定数组之一中找到的所有项目，但不能同时在两个数组中找到。换句话说，返回两个数组的对称差
 */
{
    let arr1 = []
    let arr2 = []
    for(let i = 0;i < 100000;i++) {
      if(i%2 === 0) {
        arr1.push(i)
      } else {
        arr2.push(i)
      }
      
    }
   function diffArray(arr1, arr2) {
    const sameArr = arr1.filter((current)=> arr2.includes(current))

    return [...new Set([...arr1,...arr2])].filter((current)=> sameArr.indexOf(current) === -1)
   }
   
   diffArray(arr1, arr2)
}

{
  let arr1 = []
  let arr2 = []
  for(let i = 0;i < 100000;i++) {
    if(i%2 === 0) {
      arr1.push(i)
    } else {
      arr2.push(i)
    }
  }
  function diffArray(arr1, arr2) {
    return [...diff(arr1, arr2), ...diff(arr2, arr1)];
  
    function diff(a, b) {
      return a.filter(item => b.indexOf(item) === -1);
    }
  }

  diffArray(arr1, arr2)
}