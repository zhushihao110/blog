import 'functionDemo.dart';
import './classDemo.dart';

void main() {
  test(3, 4);
  print('---voer---');

  var person = new My_zsh('zsh', 18);
  // 类实例化后得变量，无法添加新得属性
  // person.newProprety = '新增得';   报错
  // 由类生成得，无法直接看到具体信息， 但可以访问内部变量
  // print(person);
  // 如想动态改变变量的数据类型，应当使用dynamic或Object来定义变量
  // map 映射类型，类似与JS得 object
  final Map obj = {"name": 'zsh', "age": 18};
  if (obj['name'] == person.name) {
    print('''------age is ${obj['age']}------''');
  }
  // 三元表达式
  //dynamic 关键字表明变量可变
  // dynamic list = person.arr.length > 10 ? person.arr : null;
  // print(list?.length);
  // 插值法，类似于JS
  // print('${person.name}, ${person.age}');
  // person.arr.forEach((element) => print(element));
  print(person.arr.indexOf('zsh'));

  // 继承中得方法重写
  // SupGeek geek1 = new SupGeek();
  // SubGeek geek2 = new SubGeek();
  // geek1.show();
  // geek2.show();
}
