### JavaScript的原型，原型链

![](E:\blog\image\原型.png)

每个函数都有一个 prototype 属性，函数的 prototype 属性指向了一个对象，这个对象正是调用该构造函数而创建的**实例**的原型

![](https://github.com/zhushihao110/blog/blob/master/image/%E5%8E%9F%E5%9E%8B%E9%93%BE.png)

通过原型互相关联组成链状结构就是原型链（蓝色那条线）

注意： Function.\__proto__ === Function.prototype,  Function作为一个内置对象，是运行前就已经存在的东西，现有的Function，然后实现上把原型指向了Function.prototype

------

### JavaScript的词法作用域和动态作用域

- 作用域是指程序源代码中定义变量的区域。
- 作用域规定了如何查找变量，也就是确定当前执行代码对变量的访问权限。
- JavaScript 采用词法作用域(lexical scoping)，也就是静态作用域

因为 JavaScript 采用的是词法作用域，**函数的作用域在函数定义的时候就决定了**。

而与词法作用域相对的是动态作用域，函数的作用域是在函数调用的时候才决定的

JavaScript 函数的执行用到了作用域链，这个作用域链是在函数定义的时候创建的

------

### JavaScript的