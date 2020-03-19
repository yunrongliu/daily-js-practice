/**
 * 您将获得一个初始数组（destroyer函数中的第一个参数），后跟一个或多个参数。从初始数组中删除与这些参数具有相同值的所有元素。
    注意
    您必须使用该arguments对象

    destroyer([1, 2, 3, 1, 2, 3], 2, 3)应该回来[1, 1]。
 */

 {
   let testArr = []
   for(let i = 0;i < 100000;i++) {
     testArr.push(i)
   }

   function destroyerInMap (arr,...args) {
      if(!Array.isArray(arr)) {
        console.error(`The first param must be a type of Array`)
      }

      const destroyerMap = transMap(args)

      // return arr.reduce((ret, current) => {
      //   if(!destroyerMap[current]) {
      //     ret.push(current)
      //   }

      //   return ret
      // }, [])
      let overArr = []
      let i = arr.length - 1
      while(i) {
        if(!destroyerMap[arr[i]]) {
          overArr.push(arr[i])
        }
        i--
      }
      // for(let i = 0;i < arr.length;i++) {
      //   if(!destroyerMap[arr[i]]) {
      //     overArr.push(arr[i])
      //   }
      // }

      return overArr
   }

   function destroyer (arr,...args) {
      if(!Array.isArray(arr)) {
        console.error(`The first param must be a type of Array`)
      }

      return arr.reduce((ret, current) => {
        if(!args.includes(current)) {
          ret.push(current)
        }

        return ret
      }, [])
   }

   console.time('destroyer')
   destroyer(testArr,2,99)
   console.timeEnd('destroyer')

   console.time('destroyerInMap')
   destroyerInMap(testArr,2,99)
   console.timeEnd('destroyerInMap')


   function transMap (arr) {
    return arr.reduce((ret, current) => {
      ret[current] = current

      return ret
    }, {})
   }
 }