/**
 * Ӳ�� ��this��һ�ְ󶨷�ʽ
 * js ��Ӳ�󶨵ķ�ʽ�� call apply bind
 * �����ʹ�÷�ʽ�Լ�ʵ����������ԭ��
 */

/**
 * call
 */

 //call���÷�
 {
   let obj1 = {
     a: 1
   }

   let obj2 = {
     a: 2
   }

   let testFunc = function(b){
     console.log(this.a,b)
   }

   let testBindFunc = function(b,c){
     let sum = this.a + b + c
     return sum
   }
  //  testFunc.call(obj1,2) //print: 1 , 2

   /**
    * call�����ã�
    *   1.call ��λ��functionԭ���ϵ�
    *   2.����һ��context�������Ķ��� Ȼ�����context�󶨵����������� ������ն���Ϊnull ��󶨵�ȫ�ֶ����ϣ����������������
    *   3.���ղ����������ĸ�ʽ��rest��ʽ�� ���磺func(context,a,b,c)��
    *   4.����ִ�д˺�������
    *   5.����ִ�ж���
    * �����������Ϣ���������ǿ��Գ�����ʵ��һ��
    */

   /*
   * call ʵ�� 
   * Ҫע����� ��_call��ֵ�� �������ʽ������ ��ͷ���� ��Ϊ�������ò���Function��ʵ�� ����ͷ��������Ӧ�ĳ��� ��Ҫ����չԭ�ͷ����ϣ�
   * @params context ������
   * @params args ��������
   */
   Function.prototype._call = function(){
     //��������ȡ����
     //Array.from ��չ�������� ���ǽ�����iterator�ӿڵ�������ת������ ��չ���������и��������
     let [context,...args]  = Array.from(arguments)  // |console.log(args)| [...arguments] 

     //�ж�context�Ƿ�Ϊnul
     if(!context) context =  window ? window : global 
    
     //ʹ��symbol���Ա�����Ⱦԭ������
     let func = Symbol('func')

     //��ִ�к����󶨵�context��һ��������
     context[func] = this

     //ִ�к���
    let result = context[func](...args)

     //ɾ������ Reflect��һ��������� �߱��󲿷�Object����Func�Ĺ��� ������� ��Ҫ��Ϊ�˱��ִ������࣬Ȼ���ú��� ȡ�� ����ʽ��һЩ������
     Reflect.deleteProperty(context,func)

     //���ض���
     return result
   }

   testFunc._call(obj2,3) //print: 2,3

   /**
    * apply
    * ����һ�£��ڲ��������� applyʹ������
    */
   Function.prototype._apply = function(context,args){
    //�ж�context�Ƿ�Ϊnull
    if(!context) context =  window ? window : global 
   
    //ʹ��symbol���Ա�����Ⱦԭ������
    let func = Symbol('func')

    //��ִ�к����󶨵�context��һ��������
    context[func] = this

    //ִ�к���
    let result = Object.prototype.toString.call(args) === '[object Array]' ? context[func](...args) : context[func]()

    //ɾ������ Reflect��һ��������� �߱��󲿷�Object����Func�Ĺ��� ������� ��Ҫ��Ϊ�˱��ִ������࣬Ȼ���ú��� ȡ�� ����ʽ��һЩ������
    Reflect.deleteProperty(context,func)

    //���ض���
    return result
  }

   /**
    * bind
    * ʹ�÷�ʽ��call���
    * �����Ƿ���һ��������������ִ��
    */
   Function.prototype._bind = function(){
     //�õ�����
    let [context,...args] = Array.from(arguments)
    let _self = this
    //����һ������ ͵����~
    return function(){
      let innerArgs = Array.from(arguments)
      let totalArgs = [...args,...innerArgs]
      return _self._apply(context,totalArgs)
    }

   }

   let bindTest = testBindFunc._bind(obj2,3)
   console.log(bindTest(4)) //9

   /**
    * �ܽ᣺
    *   
    */

  }
  


 
 