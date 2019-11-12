/**
 * �����reg ����һ��rep����
 * �����date ����һ��date
 * �������Object��ֱ�ӷ���
 * ��� map������key���ͷ���value
 * ���������  ��prototype��constructorΪArray������ΪObject
 */

//es6
function deepClone(obj, hash = new WeakMap()){
  if(obj instanceof RegExp){
    return new RegExp(obj)
  } 
  if(obj instanceof Date){
    return new Date(obj)
  } 

  if(typeof obj !== 'object' || obj === null){
    return obj
  }

  //?
  //�������ѭ�����õ����  ��ֱ�ӷ���
  if(hash.has(obj)){
    return hash.get(obj)
  }

  let t = Object.create(obj)  //�ܶ����»��� new obj.constructor() ���ַ�ʽ
                              //����ʵÿ��������constructor����,��������ڶ����ԭ��δ���޸�ǰ��������Ƕ����������
                              //���ʹ��toString��ӡ����Ӧ�������ָ�ʽ [Function: ���������]
                              //��������ǲ���ö�٣������ǿ��޸ĵ�
                              //��Ϊ obj.constructor������Ǹ�function�����Կ���ʹ��new����
                              //���˶����ԭ�ͱ��޸�ʱ������js��ʵ��α�̳е�ʱ�򣩣�constructor���Ի����
                              //Ϊʲô����Ϊԭ��Ҳ��һ�����󣬽��и�ֵ������constructor�϶����Ҳ�ѯ���Ǹ������
                              //����ǿն����Ǿ�ɶҲû��,���Ժܲ���ȫ��
                              //˵ʵ�����Ҿ��ý�self���ԱȽϺã���tm��constructor��˭����Ϊ�ǹ������ԣ��С������찡֮��ģ�
                              //�ܽ᣺ �������
                              //�ٿ���Object.create ������˼ �Ҵ��������� ʲô���� obj��ԭ�Ͷ���(�ұ�������ԭ�͵�����) 
                              //create���еڶ������� ���Ը���ԭ��ԭ���ϵ����� �������Ը��õķ�ֹ����
  console.log(t)
  hash.set(obj,t)
  console.log(hash)

  for(let key in obj){
    if(obj.hasOwnProperty(key)){
      t[key] = deepClone(obj[key],hash)
    }
  }

  return t
}

let date = new Date()
let loop = {}
let arr = [
  {
    name: 'yunrong',
    age: 21,
    job: 'front-end',
    oo: {
      dream: 'to be myself'
    }
  },
  {
    now: date
  }
]
arr[0].b = loop
loop.c = arr[0]

let da = deepClone(arr)
console.log(da)

arr[0].name = 'liu'