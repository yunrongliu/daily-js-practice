{
  /**
   * ==
   * == �� === ������������
   * == ���� �Ⱥ����� ������ʽת�� ��������Ǳ��� �Ⱥ����߶������һ���Ҳ�ѯ����ȡֵ
   * �����˼������
   */

   //1.����ֵ �� ���� ���бȽ� ����ֵ��ת�������� true: 1 false: 0 ��if�ж��ǲ�һ����
   console.log(1 == true) //false
   console.log(2 == true) //true

   //2.���� �� �ַ��� �Ƚ� �ַ�����ת��������
   console.log("1" == 1) //true
   console.log("1d" == 1) //false

   //3.���� �ַ��� �Ͷ�����Ƚ� ����ʹ��valueOf �� toString���бȽ� ����Ҳ�Ǹ����� ����Ǻܹؼ���
   //���������Ļ� ���۱Ƚϵ����ַ����������ֶ�����toString����
   //�������toString�����ֻ��ӵ���join����,�����ǿ����޸�join������,���Կ������һЩɳ�����
  let arr = [1,2,3]

  console.log(arr == '1,2,3') //true

  arr.join = arr.shift //shift ������ͷ��ɾ��һ��Ԫ��  js ������ �Ƿǳ����� 
  console.log(arr == 1 && arr == 2 && arr == 3) //true


  console.log(null == undefined)
  console.log(NaN == NaN)
  //���⻹��һЩ�̶�����
  /**
   * null == undefined
   * NaN�������κ�ֵ ��������
   */

  
}