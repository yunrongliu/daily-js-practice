function myPromise (executor) {
  let self = this
  self.status = 'pending' //myPromise��ǰ״̬
  self.data = undefined //��ǰmyPromise��ֵ
  self.onResolvedCallback = [] //myPromise resolveʱ�Ļص���������
  self.onRejectedCallback = [] //myPromise rejectʱ�Ļص���������

  function resolve (value) { // value�ɹ�̬ʱ���յ���ֵ
    if (value instanceof myPromise) {
      value.then(resolve, reject)
      return
    }

    // Ϊʲôresolve ��setTimeout?
    // 2.2.4�淶 onFulfilled �� onRejected ֻ������ execution context ջ������ƽ̨����ʱ����.
    // ע1 �����ƽ̨����ָ�������桢�����Լ� promise ��ʵʩ���롣ʵ����Ҫȷ�� onFulfilled �� onRejected �����첽ִ�У���Ӧ���� then ���������õ���һ���¼�ѭ��֮�����ִ��ջ��ִ�С�
    setTimeout(function(){
      // ����resolve �ص���ӦonFulfilled����
      if (self.status === 'pending') {
        console.log('times')
        // ֻ����pending״̬ => fulfilled״̬ (������ö��resolve reject)
        self.status = 'fulfilled'
        self.data = value
        //ִ��resolve�Ļص���������value���ݵ�callback��
        console.log(self.onResolvedCallback)
        self.onResolvedCallback.forEach(callback => callback(value))
      }
    })
  }

  function reject (reason) { // reasonʧ��̬ʱ���յľ���
    setTimeout(function(){
      // ����reject �ص���ӦonRejected����
      if (self.status === 'pending') {
        // ֻ����pending״̬ => rejected״̬ (������ö��resolve reject)
        self.status = 'rejected'
        self.data = reason
        //ִ��reject�Ļص���������reason���ݵ�callback��
        self.onRejectedCallback.forEach(callback => callback(reason))
      }
    })
  }

  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
  
}

/**
 * resolve�е�ֵ���������
 * 1.��ֵͨ
 * 2.promise����
 * 3.thenable����/����
 */

/**
 * ��resolve ���и�����ǿ ���resolve�в�ֵͬ��� ���д���
 * @param  {promise} promise2 promise1.then�������ص��µ�promise����
 * @param  {[type]} x         promise1��onFulfilled�ķ���ֵ
 * @param  {[type]} resolve   promise2��resolve����
 * @param  {[type]} reject    promise2��reject����
 */
function resolvemyPromise (promise2, x, resolve, reject) {
  let then 
  let thenCalledOrThrow = false // �����ε���

  if (promise2 === x) { // �����onFulfilled�з��ص�x ����promise2 �ͻᵼ��ѭ�����ñ���
    reject(new TypeError('Chaining cycle detected for promise!'))
    return
  }

  // ���x��һ�������Լ�д��promise���� 
  if (x instanceof myPromise) {
    if (x.status === 'pending') { // ���Ϊ�ȴ�̬��ȴ�ֱ�� x ��ִ�л�ܾ� ������valueֵ
      x.then(value => {
        resolvemyPromise(promise2, value, resolve, reject)
      }, err => {
        reject(err)
      })
    }  else { // ��� x �Ѿ�����ִ��̬/�ܾ�̬(ֵ�Ѿ�������Ϊ��ֵͨ)������ͬ��ִֵ�д�����ȥ promise
      x.then(resolve, reject)
    }
    return
  }

  // ��� x Ϊ������ߺ���
  if ((x !== null) && ((typeof x === 'function') || (typeof x === 'object'))) {
    try {
      then = x.then //because x.then could be a getter
      if (typeof then === 'function') { // �Ƿ���thenable���󣨾���then�����Ķ���/������
        then.call(x, value => {
          if (thenCalledOrThrow) return
          thenCalledOrThrow = true
          resolvemyPromise(promise2, value, resolve, reject)
          return
        }, err => {
          if (thenCalledOrThrow) return
          thenCalledOrThrow = true
          reject(err)
          return
        })
      } else { // ˵����һ����ͨ����/����
        resolve(x)
      }
    } catch (e) {
      if (thenCalledOrThrow) return
      thenCalledOrThrow = true
      reject(e)
      return
    }
  } else {
    resolve(x)
  }

}

/**
 * [ע��fulfilled״̬/rejected״̬��Ӧ�Ļص�����]
 * @param  {function} onFulfilled fulfilled״̬ʱ ִ�еĺ���
 * @param  {function} onRejected  rejected״̬ʱ ִ�еĺ���
 * @return {function} newPromsie  ����һ���µ�promise����
 */
myPromise.prototype.then = function (onResolve, onReject) {
  let self = this
  let promise2

  // �������Ĭ��ֵ ��֤���������ܹ�����ִ��
  onResolve = typeof onResolve==='function' ? onResolve : function(value){return value}
  onReject = typeof onReject==='function' ? onReject : function(reason){throw reason}
  
  console.log(self.status)

  if (self.status === 'pending') { // �ȴ�̬
     return promise2 = new myPromise(function(resolve, reject){
      
      // ���첽����resolve/rejectedʱ ��onFulfilled/onRejected�ռ��ݴ浽������
      self.onResolvedCallback.push(function(value){
        try {
          let x = onResolve(value)
          resolvemyPromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })

      self.onRejectedCallback.push(function(reason){
        try {
          let x = onReject(reason)
          resolvemyPromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    })
  }

  // then�����FULFILLED/REJECTED״̬ʱ ΪʲôҪ��setTimeout ?
  // ԭ��:
  // ��һ 2.2.4�淶 Ҫȷ�� onFulfilled �� onRejected �����첽ִ��(��Ӧ���� then ���������õ���һ���¼�ѭ��֮�����ִ��ջ��ִ��) ����Ҫ��resolve�����setTimeout
  // ��� 2.2.6�淶 ����һ��promise������then�������Ե��ö��.���������������ж�ε���ͬһ��promise��thenʱ ����֮ǰ״̬�Ѿ�ΪFULFILLED/REJECTED״̬������ߵ������߼�),����Ҫȷ��ΪFULFILLED/REJECTED״̬�� ҲҪ�첽ִ��onFulfilled/onRejected

  // ��� 2.2.6�淶 Ҳ��resolve�������setTimeout��ԭ��
  // ��֮���� ��then�����첽ִ�� Ҳ����ȷ��onFulfilled/onRejected�첽ִ��

  // �����������龰 ��ε���p1.then
  // p1.then((value) => { // ��ʱp1.status ��pending״̬ => fulfilled״̬
  //     console.log(value); // resolve
  //     // console.log(p1.status); // fulfilled
  //     p1.then(value => { // �ٴ�p1.then ��ʱ�Ѿ�Ϊfulfilled״̬ �ߵ���fulfilled״̬�ж�����߼� ��������ҲҪȷ���ж�����onFuilled�첽ִ��
  //         console.log(value); // 'resolve'
  //     });
  //     console.log('��ǰִ��ջ��ͬ������');
  // })
  // console.log('ȫ��ִ��ջ��ͬ������');
  //
  if (self.status === 'fulfilled') { // �ɹ�̬
    return promise2 = new myPromise(function(resolve, reject){
      setTimeout(function(){
        try {
          let x = onResolve(self.data)
          resolvemyPromise(promise2, x, resolve, reject) // �µ�promise resolve ��һ��onFulfilled�ķ���ֵ
        } catch (e) {
          reject(e) // ����ǰ��onFulfilled���׳����쳣 then(onFulfilled, onRejected);
        }
      },0)
    })
  }

  if (self.status === 'rejected') { // ʧ��̬
    return promise2 = new myPromise(function(resolve, reject){
      setTimeout(function(){
        try {
          let x = onReject(self.data)
          resolvemyPromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      },0)
    })
  }
}

/**
 * myPromise.all myPromise���в��д���
 * ����: promise������ɵ�������Ϊ����
 * ����ֵ: ����һ��myPromiseʵ��
 * ����������������promise����ȫ������FulFilled״̬��ʱ�򣬲Ż�resolve��
 */
myPromise.all = function (promises) {
  return new myPromise((resolve, reject) => {
    let values = []
    let count = 0
    promises.forEach((promise, index) => {
      promise.then(value => {
        console.log('value:', value, 'index:', index)
        values[index] = value
        count++
        if (count === promises.length) {
          resolve(values)
        }
      }, reject)
    })
  })
}

/**
 * myPromise.race
 * ����: ���� promise������ɵ�������Ϊ����
 * ����ֵ: ����һ��myPromiseʵ��
 * ֻҪ��һ��promise������� FulFilled ���� Rejected ״̬�Ļ����ͻ�������к���Ĵ���(ȡ������һ������)
 */
myPromise.race = function (promises) {
  return new myPromise((resolve, reject) => {
      promises.forEach((promise) => {
         promise.then(resolve, reject);
      });
  });
}

// ����promise������ʱ ����ǰ��onFulfilled/onRejected�׳����쳣
myPromise.prototype.catch = function (onReject) {
  return this.then(null, onReject)
}

// ����һ��fulfilled״̬��promise����
myPromise.resolve = function (value) {
  return new myPromise(function(resolve, reject){resolve(value)})
}

// ����һ��rejected״̬��promise����
myPromise.reject = function (reason) {
  return new myPromise(function(resolve, reject){reject(reason)})
}

myPromise.deferred = myPromise.defer = function() {
  var defer = {}
  defer.promise = new myPromise(function(resolve, reject) {
    defer.resolve = resolve
    defer.reject = reject
  })
  return defer
}

let p1 = new myPromise((resolve,reject) => {
  resolve('111')
})

p1.then()
  .then()
  .then()
  .then((data)=>{console.log('ccc',data)})






