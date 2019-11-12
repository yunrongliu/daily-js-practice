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

    console.log(constructor.prototype)

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
 * new �� ���ܴ��������  ����ԭ��new ��ʹ��ʱ ����һЩ���ӵ����� 
 * ���Կ���  js�е�new  �� ���������ǲ�һ����
 * new������ �����Ǹ����� ����ʵֻҪ��function���͵ľͿ��ԣ�������constructor����(�����Ƽ�ʹ��)�� 
 * ֻ�б�new ���õĺ��� �ſ������Ϊ���캯��
 * �� new �ı��� ֻ�Ǵ�����һ������ Ȼ�󽫹��캯����ԭ��ί�и��ö������ �����ڸ���
 * ����js �в����ڼ̳�������� ֻ��ԭ��ί�� ��ԭ��ί�еı��� ��ʵ���� ��ԭ�����ϵ�һ�β��ң����ѯ �� �Ҳ�ѯ ���������Щ��ͬ��
 * 
 */