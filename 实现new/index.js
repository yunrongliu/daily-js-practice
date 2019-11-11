/**
 * new �� �������캯����һ�ַ�ʽ 
 * Ҳ���ж�this �󶨵�һ�ֹ���
 * ʹ��this�������� �������¹���
 *  1.�½�һ��this����
 *  2.�����캯����ԭ��ί�и�this������һ��ԭ��ί�ж�ʹ��Object.create��
 *  3.������캯��������һ��������ߺ������򷵻ض������
 *  4.���û�У��򷵻�this
 */

 /**ʵ�� */
{
  let _new = function(){
    let thisObj = {}

    let [constructor,...args] = [...arguments]

    thisObj = Object.create(constructor.prototype) 

    let result = constructor.apply(thisObj,args)

    if(result && typeof result ==='function' || typeof result === 'object'){
      return result
    }

    return thisObj
  }

  function Person(name,age){
    this.name = name
    this.age = age
  }

  let person1 = _new(Person,'liu',18)
  let person2 = _new(Person,'yang',18)

  console.log(person1.name)
  console.log(person2.name)
}

/**�ܽ�
 * new ��js�� ���������������캯�����ɵĶ��� Ҳ�������ڼ̳�
 * ����˵ JavaScript�󲿷ֵײ�Ĳ�������ԭ���й�
 * ��js������ʹ���κ�ģʽȥʵ�ּ̳У����Ʋ���prototype��constructor����Ϊ�̳еı����Ǹ��ƻ����ǲ���
 * ������α�̳� ��ʼ����������Ѷ� �Լ� �鷳��ԭ��ָ��
 * ���Ը��˸��Ƽ� ֱ��ʹ��ί�У��Ӹ�������˵�������඼��ƽ���Ĺ�ϵ  �е�ֻ��ί�еĹ�ϵ
 * ί�еı��� ���� ԭ����������
 */