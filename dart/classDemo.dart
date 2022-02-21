class My_zsh {
  String name;
  int age;
  bool flag = false;
  List arr = [1, 2, 3, 4, 5];
  My_zsh(this.name, this.age);
  void show() {
    print('this is show my_zsh');
  }
}

class SupGeek {
  void show() {
    print('this is show SupGeek');
  }
}

class SubGeek extends SupGeek {
  @override
  void show() {
    print("This is class SubGeek child of SuperGeek.");
  }
}
