import 'functionDemo.dart';
import './classDemo.dart';

void main() {
  test(10, 5);
  print('---voer---');
  var preson = new My_zsh('zsh', 18);

  // 由类生成得，无法直接看到具体信息， 但可以访问内部变量
  print(preson);

  print('${preson.name}, ${preson.age}');
}
