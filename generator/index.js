/**
 * ��ƪ���� ������
 */

 /**
  * ��������������һ�� generator function ���ص�,���������Ͽɵ���Э��͵�����Э�� --MDN
  * �ɵ���Э��͵�����Э����Բο�MDN
  * ����һ��generator��  �ں�������ʱʹ��* function* fn(){}
  * ��ȡgenerator����: fn = fn()
  * 
  * generatorͨ��yield �� next ֮���˫�������� ʵ���첽���̿���
  */

function* gen(){
  let ret = yield 45 
  return ret
}

gen = gen()
let res0 = gen.next() //����������ĵ�һ��next �൱��������������
                      //��ʱ��next�������� �ǽ��ղ����ģ���Ϊnext�������������Ϊ��һ��yield���صĽ���ġ�
                      //�ڵ�һ��֮ǰ�ǲ�����yield��
                      //����һ��next���ÿһ��next���������ֵ����Ϊ��һ��yield�ķ��ؽ��
                      //generator�ķ���ֵ����һ�����󣬰���done���Ժ�value����

console.log(res0) //{ value: 45, done: false } done: false ˵��yield��δִ���� �����ִ�ж��Ǵ� ���yield �� ��һ��yield ����һ��yield���Ƭ�η���

let res1 = gen.next() //{ value: undefined, done: true } 
console.log(res1) //value: undefined ˵��ret Ϊundefined û����next()���Σ�Ĭ�ϸ�����undefined��done: true ˵���Ѿ�û��yield��
                  //ִ��Ƭ���Ǵӵ�һ��yield��return ret  ����û����next()���Σ�����û����һ�εķ���ֵ

let res2 = gen.next(2)//{ value: undefined, done: true }
console.log(res2) //��� done �Ѿ�Ϊ true����˵�������Ѿ�ִ���꣬��ʱ����next()����Ҳû���ˡ�
                  //���Եó���next()ִ�еľ���yield��yield֮��Ĵ���

//������һ������
function* gen2(){
  let value1 = yield 1
  let value2 = yield 45
  let add = yield value1  + value2
  return add
}

gen2 = gen2()
//���һֱnext��ȥ
// console.log('--------')
// console.log(gen2.next()) //1
// console.log(gen2.next()) //45 
// console.log(gen2.next()) //NaN undefined + undefined
// console.log(gen2.next()) //undefined

//�����õ�46�Ļ�
console.log('-------')
gen2.next()//{ value: 1, done: false }
gen2.next(1) //{ value: 45, done: false }
let res = gen2.next(45) //{ value: 46, done: false }
//gen2.next() //{ value: undefined, done: true }
gen2.next(res.value) //{ value: 45, done: true }
/**���ܿ��������е����ǣ����������ô�鷳����Ȼ�ˣ�������Ҳ���Ǹ����ģ����첽���ƣ�����iterator�ӿڶ�ߴ��ϣ�ÿ��������ÿ��api�����Լ������ã�����ҲӦ���ҵ�����ļ�ֵ��
 * �𲽷������£����������ֻ���ɻ�
 * gen2.next() ��ȡ��һ��yield��ֵ1 ����1
 * gen2.next(1) ��1��Ϊ��һ�εķ���ֵ��Ȼ��ִ�е� let value2 = yield 45 ����yield ���Ƭ�� 45
 * let res = gen2.next(45) ��45��Ϊ�ڶ��εķ���ֵ��Ȼ��yield value1  + value2 �ó�46������46 
 *                         ע���ʱֻ��ִ�е�yield value1  + value2 ��û�д�yield value1  + value2���ִ��
 * gen2.next(res.value) ��46��Ϊ�����εķ���ֵ  ����addΪ46 ����  ע�����ﷵ�ص�ȷʵ��add ��Ϊû��yield�ˣ�����������޸�add�����ص�Ҳ���޸ĺ��add
 * 
 * ����������Ӷ�generator�����ǳ�����
 */


/**�ܽ�
 * һ��next()���ûᵼ��yield���ᾭ�����λ��ִ�жΣ�
 * ��һ���Ǵ���һ��yield��yield��yield���Ƭ����Ϊvalue����(ע����ǵ�һ�ε�ʱ����Ϊû����һ��yield������ֱ�ӽ�yield���Ƭ�η��أ�yield��Ĳ�û��ִ��)
 * �ڶ����ǽ���yield��Ϊ�´ο�ʼ�ı�ʶ
 * 
 * ����һ�ε�next���������������⣬ÿһ��next()�����Ĳ�������Ϊ��һ��yield�ķ���ֵ
 * �����ٸ�������Ĵ���˼��һ��
 */
function* gen2(){
  let value1 = yield 1
  let value2 = yield 45
  let add = yield value1  + value2
  return add
}

gen2 = gen2()

gen2.next()//{ value: 1, done: false }
gen2.next(1) //{ value: 45, done: false }
let res = gen2.next(45) //{ value: 46, done: false }
//gen2.next() //{ value: undefined, done: true }
gen2.next(res.value) //{ value: 46, done: true }