/**
 * ��Ƭ��������promise
 * 
 * promise ��һ���첽�������
 * 
 * �ڲ�������״̬����
 *  pending: promise����ĳ�ʼ״̬
 *  fulfilled: ��ζ�Ų������
 *  rejected: ��ζ�Ų���ʧ��
 * 
 * promise���캯������һ��executor����
 * executor�Ǵ���resolve��reject���������ĺ���
 * promise������ִ��executor����������Promise�����ڲ���ͬ�����룬then,catch,finally���첽��
 * 
 * promise��then������catchҲ����һ��promise�����Կ��Խ�����ʽ����
 * ����������첽���̹��ڸ��ӵĻ���promise��������ø�����
 * ������������async��await ��promise��generator��ϵ��첽���̽��������
 * 
 * promise�߱����漸��������
 *  (�Ƽ�then�������ڴ���ɹ��������catch���������Ԥ�����)
 *  1.then then�����������������������Ĳ�����Ӧ����Ӧ�Ľ��ͣ����ǻ���ϣ����catch������ڶ�������,������һ��promise����
 *  2.catch catch��������һ�������������Ĳ����Ǿܾ��Ľ��ͣ�������һ��promise����
 *  3.resolve ����һ��fulfilled״̬��promise���� ������then����
 *  4.reject ����һ��rejected״̬��promise���� ������catch����
 *  5.all �ȵ����promise��״̬��Ϊfulfilledʱ���Żᴥ��then����
 *    ʹ�÷���:
 *      Promise.all(iterable) ͨ���Ǹ�����
 *      then�����õ���dataҲ�Ǹ�����
 *  6.race
 *    ʹ�÷���:
 *      Promise.race(iterable) ͨ���Ǹ�����
 *      �õ���ǰ���������Ƚ�״̬�޸�Ϊ��pending��promise��Ȼ��ֹͣ������promise
 *      ����then��catch���ص�Ҳ�Ƕ�Ӧpromise��resolve��reject�Ľ��
 * 
 * �˽�promise�ڲ���ԭ�� ���� generator �� async �������кܴ����
 * 
 * ʵ�֣�
 * ������
 *    ��������Ҫ������״̬
 *    Ȼ��then����֧�������ص��������Ѷ�Ӧ�Ľ�����ӽ�ȥ
 *    Ȼ��catch���Բ���reject�ܾ������
 *    Ȼ��resolve��reject�����������Ը���promise�����״̬ ����Ӷ�Ӧ�Ļص�
 *    Ȼ��߱�all��race����
 */

 function myPromise(executor){
   this.status = 'pending' //״̬ 
   this.resolveCallbackCol = [] //�����յĻص��������У���Ϊthen��������һֱ����һ��promise
   this.rejectCallbackCol = [] //���ܾ��Ļص���������

   this.result = null //�ص������Ľ���

   const _self = this //����������

   function resolve(value){
     if(_self.status === 'pending'){
       setTimeout(() => {
        _self.status = 'fulfilled' //��״̬��Ϊ���
        _self.result = value //�������value��Ϊ����
 
        _self.resolveCallbackCol.forEach( cb => cb(value))
       }, 4);
       
     }
   }

   function reject(value){
     if(_self.status === 'pending'){
       setTimeout(() => {
        _self.status = 'rejected' //��״̬��Ϊ�ܾ�
        _self.result = value //�������value��Ϊ����
 
        _self.rejectCallbackCol.forEach( cb => cb(value))
       }, 4);
       
     }
   }

   try {
    executor(resolve,reject)
   } catch (error) {
     reject(error)
   }
 }

 //ʵ��then����
 myPromise.prototype.then = function(onResolve,onReject){
   //����������
   const _self = this

   //�жϱ�ʶ
   const flag = '[object Function]'
   //�жϷ���
   const judgeFunc = type => Object.prototype.toString.call(type)

   //����Ҫ���ص�promise
   let retPromise = null

   //�ж�then��������Ĳ����Ƿ��Ǹ�function�����������ֱ�Ӻ��� 
   onResolve = judgeFunc(onResolve) === flag ? onResolve : function(value){return value} //return value��ԭ���ǿ�����ֵһֱ����
   onReject = judgeFunc(onReject) === flag ? onReject : function(value){return value}

   //�жϴ����״̬������Ҫ���ص�promise
   //�Ż�if �����п��ܵķŵ�ǰ��
   if(_self.status === 'fulfilled'){
     return retPromise = new myPromise((resolve,reject) => {
       try {
         let result = onResolve(_self.data) //ִ�У�ȡ�÷��ؽ��
         if(result.isPrototypeOf(myPromise)){
           result.then(resolve,reject)
         }else{
           resolve(result)
         }
       } catch (error) {
         reject(error)
       }
     })
   }

   if(_self.status === 'rejected'){
     return retPromise = new  myPromise((resolve,reject) => {
       try {
         let result = onReject(_self.data)
         if(result.isPrototypeOf(myPromise)){
           result.then(resolve,reject)
         }else{
           resolve(result)
         }
       } catch (error) {
        reject(error)
       }
     })
   }

   
   if(_self.status === 'pending'){
    //���״̬���Ǵ���pending�� ��ʵ�͹��캯����� ��Ҫ����ɺ;ܾ������ص��������������Ӧ�Ļص�����
    return retPromise = new myPromise((resolve,reject) => {

      _self.resolveCallbackCol.push(function(value){
        try {
          let result = onResolve(_self.data) //���õ�����ֵ
          if(result.isPrototypeOf(myPromise)){ //�������ֵ��һ��promise
            result.then(resolve,reject) //��ô���ص�promise����Ľ��;��Ǵ�ʱ�Ľ���
          }else{          
            resolve(result) //������ǣ���ô�Է���ֵ��Ϊpromise�Ľ���
          }

        } catch (error) {
           reject(error) //����׳�������ô�Դ�����Ϊ����
        }
      })

      self.rejectCallbackCol.push(function(value){
        try {
          let result = onReject(_self.data) //���õ�����ֵ
          if(result.isPrototypeOf(myPromise)){ //�������ֵ��һ��promise
            result.then(resolve,reject) //��ô���ص�promise����Ľ��;��Ǵ�ʱ�Ľ���
          }else{          
            resolve(result) //������ǣ���ô�Է���ֵ��Ϊpromise�Ľ���
          }

        } catch (error) {
           reject(error) //����׳�������ô�Դ�����Ϊ����
        }
      })
    })

    
  }
 }

 let p1 = new myPromise((resolve,reject) => {
   setTimeout(() => {
     console.log('p1')
     resolve('111')
   }, 4);
 })

 let p2 = new myPromise((resolve,reject) => {
   setTimeout(() => {
     console.log('p2')
     resolve('222')
   }, 5);
 })

 p1.then((data)=>{
   console.log(data)
 })

 p2.then((data)=>{
  console.log(data)
})
