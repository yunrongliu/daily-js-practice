/**
 * 迭代器模式用于将 一个可迭代对象的迭代过程分离出来，只关心其中元素的访问
 * 
 *  主要分为 内部迭代器 和 外部迭代器
 */

 // 1. 内部迭代器 规则隐藏在迭代器内部

 const innerForEach = function (iterator,cb) {
   for(let i = 0;i < iterator.length;i++) {
     cb.call(null,iterator[i],i,iterator)
   }
 }

 const testArr = [1,2,3]

 innerForEach(testArr,function(current,i,arr) {
  console.log(current,i,arr)
 })

 // 2. 外部迭代器 规则暴露在外部
const outerIterator = function (iterator) {
  let index = 0

  const next = ()=> index++

  const isDone = ()=> index >= iterator.length

  const gutCurrItem = ()=> iterator[index]

  return {
    next,
    isDone,
    gutCurrItem
  }
}

const compare = function (iter1,iter2) {
  while(!iter1.isDone() && !iter2.isDone()) {
    if(iter1.gutCurrItem() !== iter2.gutCurrItem()) {
      return false
    }

    iter1.next()
    iter2.next()
  }

  return true
}

const iter1 = outerIterator([1,2,3])
const iter2 = outerIterator([1,2,3])

console.log(compare(iter1,iter2))
