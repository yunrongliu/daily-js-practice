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
 * promise������ִ��executor����������Promise�����ڲ���ͬ�����룬then,catch,finally���첽�ģ���then��ʵ����ֻ�ǽ����صĺ���������Ϊ�첽������Ļ���ͬ���ģ�
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
     console.log('status',_self.status)
     console.log('resolve: _self',_self)
     console.log('resolve: _self.name',_self.name)
     console.log('resolve p3',p3)
     if(_self.status === 'pending'){
       setTimeout(() => {
        console.log('times')
        _self.status = 'fulfilled' //��״̬��Ϊ���
        _self.result = value //�������value��Ϊ����
        console.log(_self.resolveCallbackCol)
        _self.resolveCallbackCol.forEach( cb => cb(value))
       }, 4);
       
     }
   }

   function reject(value){
     if(_self.status === 'pending'){
       setTimeout(() => {
        console.log('times')
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

 /**
  * ����then����ֵ
  * @param {myPromise} retPromise then�������ص�myPromise����
  * @param {any} retValue resolve��reject�õ��Ľ��
  * @param {function} resolve retPromise��resolve����
  * @param {function} reject retPromise��reject����
  */
 function dealMyPromise(retPromise,retValue,resolve,reject){
    console.log('dealMyPromise exec!')
    //������ص����� �׳�����
    if(retPromise === retValue){
      throw new Error('Cycle Reference!Can not return self!')
    }

    if(retValue instanceof myPromise){ //�����myPromise��ʵ��
      // if(retValue.status === 'pending'){ //��״̬Ϊpending״̬,��ע��then������Ȼ��ȴ�ִ��
      //   retValue.then(result => { 
      //     dealMyPromise(retPromise,result,resolve,reject)
      //   },error => {
      //     reject(error)
      //   })
      // }else{//�������pending��ֱ��ע��ִ��
      //   retValue.then(resolve,reject)
      // }
      retValue.then(resolve,reject) //ע��then
    }else{//�������ͨ��ֵ
      resolve(retValue) //ֱ��resolve
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
   console.log(_self.status)

   console.log('judgeFlag',judgeFunc(onResolve) === flag)
   onResolve = judgeFunc(onResolve) === flag ? onResolve : function(value){return value} //return value��ԭ���ǿ�����ֵһֱ����
   onReject = judgeFunc(onReject) === flag ? onReject : function(value){return value}

   //�жϴ����״̬������Ҫ���ص�promise
   //�Ż�if �����п��ܵķŵ�ǰ��
   if(_self.status === 'pending'){
    //���״̬���Ǵ���pending�� ��ʵ�͹��캯����� ��Ҫ����ɺ;ܾ������ص��������������Ӧ�Ļص�����
      return retPromise = new myPromise((resolve,reject) => {
        console.log('beforeResolve','  resolveCallbackCol push')
        _self.resolveCallbackCol.push(function(value){
        console.log('nowStatus',_self.status)
        console.log('newName',_self.name)  
        try {
            console.log('enter try catch')
            console.log('try now _self',_self)
            console.log('try p3',p3)
            console.log('onResolve',onResolve)
            let result = onResolve(_self.result) //���õ�����ֵ
            console.log('onResolve next p3',p3)
            console.log('pending result',result)
            console.log(_self.result)
            dealMyPromise(retPromise,result,resolve,reject)

          } catch (error) {
            reject(error) //����׳�������ô�Դ�����Ϊ����
          }
        })

        _self.rejectCallbackCol.push(function(value){
          try {
            let result = onReject(_self.result) //���õ�����ֵ
            dealMyPromise(retPromise,result,resolve,reject)

          } catch (error) {
            reject(error) //����׳�������ô�Դ�����Ϊ����
          }
        })
      })

      
    }

   if(_self.status === 'fulfilled'){
     return retPromise = new myPromise((resolve,reject) => {
      setTimeout(() => {
        try {
          let result = onResolve(_self.result) //ִ�У�ȡ�÷��ؽ��
          console.log('fulfilled result',result)
          dealMyPromise(retPromise,result,resolve,reject)
        } catch (error) {
          reject(error)
        }
      }, 4);
     })
   }

   if(_self.status === 'rejected'){
     return retPromise = new  myPromise((resolve,reject) => {
       setTimeout(() => {
        try {
          let result = onReject(_self.result)
          dealMyPromise(retPromise,result,resolve,reject)
        } catch (error) {
         reject(error)
        }
       }, 4);
     })
   }

 }

 //��������promise������Ӧ��������
 /**
  * ��һ�� ����ִ��promise�����executor����������promise��executor��ͬ������
  * �ڶ��� �������resolve����reject ��ִ�ж�Ӧ�ķ�����������resolve��reject���첽�ģ����Իᱻ����������У���������ִ�У����Ե���thenʱ��״̬���Ǹ��º��
  * ������ ����then then���ж�״̬�����Ե�һ�ε���thenʱ״̬һ��ʱpending�����Իᴥ��pending�����������������뵽��Ӧ��״̬������
  * ���Ĳ� ��Ϊ��ʱͬ�������Ѿ�û�ˣ����Ի������������е����񣬾��ǵ���resolve����reject Ȼ���ʱ�ı�״̬��Ȼ����ȥִ�ж�Ӧ״̬�����еĺ���
  * 
  * ��Ҫע����Ǳ�����״̬���еĺ��� Ӧ�ô��������
  *  �������Ǵ����������promise�⣬ֻ��Ϊ�˽���ԭ����Ϊ���ﱾ�����е��ƣ����Ի��Ǽ�Ϊ�ã�
  *   1.������ص������promise������ôӦ���׳�������Ϊ�����ᵼ��ѭ������
  *   2.������ص���һ��promise����ôӦ��ע�����promise��then���������������promise����һ��then����
  *   
  */

 let p1 = new myPromise((resolve,reject) => {
   setTimeout(() => {
     console.log('p1')
     resolve('111')
   }, 4);
 })
 p1.name = 'p1'

 let p3 = {}
 p3.name = 'p3'

 let p2 = p1.then((data)=> {
   p3.promise = new myPromise((resolve,reject)=> {
     console.log('ddd',2222)
     resolve('222')
   })
   return p3.promise
 })

 p2.name = 'p2'

 p2.then((data)=> {
   console.log('ccc',data)
 })

 /**�ڷ��������ӡ��һЩ��Ƿ������Ƿ�����Ȼ���������з����������У�������vscode˫������
  * ���н�����£�
  * 
  * 
  * pending //��Ϊp1 executor������һ��setTimeOut�����Դ���ᱻ����������С�����ִ�� p1 �� then ���� �ڴ˴�ӡ��pending
    beforeResolve   resolveCallbackCol push //��Ϊ״̬ʱpending�������ڴ˴�ӡ ��ʶ��p1�� resolveCallbackCol �� rejectCallbackCol ����������һ����Ӧ�ĺ���
    pending //Ȼ����õڶ���then���� �����ж� p1��״̬����Ϊ��ʱresolve��δִ�У�����״̬pending ����ʵ����setTimeOutģ���첽��resolve���״̬Ҳ����δ���µģ���Ϊresolve���첽�ģ�
    beforeResolve   resolveCallbackCol push //Ȼ����p2�Ķ������������Ӧ�ĺ���
    p1 //ִ��setTimeOut ��ӡp1
    status pending //ִ��resolve���� ��ӡ��ʱ��״̬
    times //��ӡtimes
    [ [Function] ] //��ӡ�����еĺ���
    afterResolve //ִ�к���
    status pending //�ٵ���һ��resolve���� ��Ϊ���첽�ģ������ӳ�ִ��
    result myPromise { //��ӡresult ��һ��then���� ���ص���һ��myPromise
      status: 'pending',
      resolveCallbackCol: [],
      rejectCallbackCol: [],
      result: null }
    111 //��ӡ��һ��resolve��ֵ
    dealMyPromise exec! //����dealMyPromise����
    pending  //��Ϊ��һ��myPromise��ʵ������������then��������ʱ��״̬��pending
    beforeResolve   resolveCallbackCol push //�����Ӧ������
    times //ִ��p3��resolve������ʵ���ϵ���then�������汻����ķ���
    [ [Function] ] //��ӡp3�ĺ���
    afterResolve // ִ�к���
    status pending //p3�ֵ�����һ��resolve��������������У��ȴ�ִ��
    result undefined //��Ϊ��û�з��ؽ�� ����δundefined
    222 //�����һ��resolve��ֵ
    dealMyPromise exec! //�ٴ�ִ��dealMyPromise
    status pending //��Ϊ��һ����ֵͨ�����Ե���resolve���ٴα�����������У��ȴ�ִ�� error
    times //ע�� ���������һ��myPromise����resolve���Զ�����then���� ����Ϊ�Ѿ�ע�ᣬ���Ժ������ǿյģ���
          //Ȼ�����promise�᷵�ظ�һ��������promise������resolve�����Դ�ӡtimes
    [ [Function] ] //��ӡp2�ĺ�������
    afterResolve //ִ�к���
    ccc 222 //����������
    result undefined //��Ϊ�޷���ֵ�����Դ�ӡundefined 
    222 //Ȼ��ִ��֮ǰ��Ϊ����onResolve�ķ���
    dealMyPromise exec!
    status pending
    times
    []
    times
    []
  */



 

