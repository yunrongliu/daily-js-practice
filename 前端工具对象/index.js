let myUtils = {
  /**判断类型
   * @param target [any] 要检测的对象
   * @param type [any] 要匹配的类型 首字母大写
   * @output flag [boolean] 返回结果
   */
  isTargetType (target,type) {
    return  Object.prototype.toString.call(target) === '[object '+type+']' ? true : false
  },
  deepClone (obj, hash = new WeakMap()) {
    if(obj instanceof RegExp){
      return new RegExp(obj)
    } 
    if(obj instanceof Date){
      return new Date(obj)
    } 
  
    if(typeof obj !== 'object' || obj === null){
      return obj
    }
  
    //如果存在循环引用的情况  则直接返回
    if(hash.has(obj)){
      return hash.get(obj)
    }
  
    let t = Object.create(obj)  

    hash.set(obj,t)
  
    Reflect.ownKeys(obj).forEach((key) => {
      if(obj.hasOwnProperty(key)){
        t[key] = this.deepClone(obj[key],hash)
      }
    })
  
    return t
  }
}

let ArrayUtils = {
  /**
   * 异常处理 用于判断传入值是否是一个数组
   * @param arr [Array] 传入的数组
   * @param msg [string] 抛出异常的信息
   */
  dealError (arr,msg) {
    if(! myUtils.isTargetType(arr,'Array')) {
      throw new Error(msg)
    }
  },
  /**
   * 数组拼接
   * @param args [ArrayLike] 参数 传入的必须是数组 否则抛出error
   * @return ret [Array] 拼接完成的数组
   */
  concat (...args) {
    return args.reduce((ret,current) => {
      this.dealError(current,'At ArrayUtils concat,current should be a Array type!')

      return ret.concat(current) //拼接
    },[])
  },
  /**
   * 数组扁平化
   * @param arr [Array] 要扁平化的数组
   * @return ret [Array] 扁平化后的数组
   */
  flattenDeep (arr) {
    this.dealError(arr,'At ArrayUtils flattenDeep,arr should be a Array type!')

    return arr.reduce ((ret,current) => {
      return myUtils.isTargetType(current,'Array') ? ret.concat(this.flattenDeep(current)) : ret.concat(current)
    },[])
  },
  /**
   * 数组去重
   * @param arr [Array] 要去重的数组
   * @return ret [Array] 去重后的数组
   */
  unique (arr) {
    this.dealError(arr,'At ArrayUtils unique,arr should be a Array type!')

    return [...new Set(arr)]
  },
  /**
   * 返回 left中具备，但right中不具备的部分
   * @param left [Array] 第一个数组
   * @param right [Array] 第二个数组
   * @return ret [Array] 不同部分组成的数组
   */
  difference (left,right) {
    this.dealError(left,'At ArrayUtils difference,left should be a Array type!')
    this.dealError(right,'At ArrayUtils difference,right should be a Array type!')

    const leftSet = new Set(left)
    const rightSet = new Set(right)

    return [...leftSet].filter((current) => {
      return !rightSet.has(current)
    })
  },
  /**
   * 求数组的交集
   * 返回 left 和 right 都具备的元素
   * @param left [Array] 第一个数组
   * @param right [Array] 第二个数组
   * @return ret [Array] 相同同部分组成的数组
   */
  intersection (left,right) {
    this.dealError(left,'At ArrayUtils intersection,left should be a Array type!')
    this.dealError(right,'At ArrayUtils intersection,right should be a Array type!')

    const leftSet = new Set(left)
    const rightSet = new Set(right)

    return [...leftSet].filter((current) => {
      return rightSet.has(current)
    })
  },
  /**
   * 删除数组中的元素
   * @param arr [Array] 传入的数组
   * @param index [number] 数组下标 从哪开始
   * @param fn [function] 判断方法
   * @return copy [Array] 删除指定元素后的数组
   */
  remove (arr,index = 0,fn) {
    this.dealError(left,'At ArrayUtils remove,left should be a Array type!')

    let copy = [...arr]

    copy.slice(index)
      .filter(fn)
      .forEach((current) => {
        copy.splice(copy.indexOf(current),1)
      })

    return copy
  },
  /**
   * 随机获取数组中的一项
   * @param arr [Array]
   * @return item [any]
   */
  sample (arr) {
    this.dealError(arr,'At ArrayUtils sample,arr should be a Array type!')

    return arr[~~(Math.random() * arr.length)]
  },
  /**
   * 返回俩个数组合集，并去除重复元素
   * @param left [Array] 第一个数组
   * @param right [Array] 第二个数组
   * @return ret [Array] 合集数组
   */
  union (left,right) {
    return [...new Set([...left,...right])]
  },
  /**
   * 从数组中排除给定值
   * @param arr [Array] 要操作的数组
   * @param args [arguments] 参数
   */
  without (arr,...args) {
    this.dealError(arr,'At ArrayUtils without,arr should be a Array type!')

    return arr.filter((current) => !args.includes(current))
  },
  /**
   * zip 将传入的数组按相同的下标
   * @param fill [String] 如果为空要填充的值
   * @param args [arguments] 参数
   */
  zip (fill,...args) {
    const maxLength = Math.max.apply(null,args.map((current) => {
      this.dealError(current,'At ArrayUtils zip,current should be a Array type!')

      return current.length
    }))

    return Array.from({length: maxLength})
                  .map((n,i) => {
                    return Array.from({length: args.length},(n,k) => {
                      return args[k][i] || fill
                    })
                  })
  }
}

// ---test for ArrayUtils.concat
// let res = ArrayUtils.concat([1],[1,2,3],[4,5]) 

// ---test for ArrayUtils.flattenDeep
// let res = ArrayUtils.flattenDeep([1,2,[1,2,[1,2]]])

// ---test for ArrayUtils.unique
// res = ArrayUtils.unique(res)


let left = [1,1,2,3,4,88,4]
let right = [1,2,4,6,7,7,88,99]

// ---test for ArrayUtils.difference
// let res = ArrayUtils.difference(left,right)

// ---test for ArrayUtils.intersection
// let res = ArrayUtils.intersection(left,right)

// ---test for ArrayUtils.remove
// let res = ArrayUtils.remove(left,2,(current)=> {
//   return current === 4
// })

// ---test for ArrayUtils.sample
// let res = ArrayUtils.sample(left)

// ---test for ArrayUtils.union
// let res = ArrayUtils.union(left,right)

// ---test for ArrayUtils.without
// let res = ArrayUtils.without(left,3,4,88)

// ---test for ArrayUtils.zip

let res = ArrayUtils.zip('lc',[1,2,3,4,5,6],[1,2],[4],[5])


console.log(res)