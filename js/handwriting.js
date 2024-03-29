// new 操作符
// 1，创建一个控对象  2，设置原型 将对象的原型设置为函数的 prototype 对象
// 3，让函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）
// 4，判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象
const objectFn = () => {
  let newObj = null;
  let constructor = Array.prototype.shift.call(arguments);
  let result = null;
  if (typeof constructor !== "function") {
    console.error("type error");
    return;
  }
  // Object.create创建新对象 原型为构造函数的 prototype 对象
  newObj = Object.create(constructor.prototype);
  result = constructor.apply(newObj, arguments);
  // 判断数据类型
  let flag =
    result && (typeof result === "object" || typeof result === "function");
  // 判断返回结果
  return flag ? result : newObj;
};

// apply--call

function myApply(context) {
  if (typeof this !== "function") {
    console.error("Error");
    return;
  }
  context = context || window;
  let result = null;
  let args = [...arguments].slice(1);
  // 修改上下文
  context.fn = this;
  // apply 第二个参数为数组 args
  // call按照参数个数传入 ...args
  result = conten.fn(args);
  // 删除属性
  delete context.fn;
  return result;
}

// 函数柯里化
function curry(fn, ...args) {
  let length = fn.length;
  args = args || [];
  return function () {
    // 拼接得到所有参数
    let subArgs = [...args, ...arguments];
    // 判断参数的长度是否已经满足函数所需参数的长度
    if (subArgs.length >= length) {
      // 满足 则直接调用fn
      return fn.apply(this, subArgs);
    } else {
      // 不满足 递归返回柯里花函数，继续等待参数的传入
      return curry.call(this, fn, subArgs);
    }
  };
}
// const sum = (a,b,c) => {
//     console.log(a+b+c)
// }
// let currySum = curry(sum, 1,2)
// currySum(3)

// 深拷贝
function deepClone(obj) {
  if (!obj || typeof obj !== "object") {
    return obj;
  }
  let result = null;
  result = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] =
        typeof obj[key] === "object" ? deepClone(obj[key]) : obj[key];
    }
  }
  return result;
}

// 斐波拉契数列

function fibonacci(n) {
  let arr = [1, 1, 2];
  let arrlength = arr.length;
  if (n <= arrlength) {
    return arr[n - 1];
  }
  for (let i = arrlength; i < n; i++) {
    arr.push(arr[i - 1] + arr[i - 2]);
  }
  return arr[arr.length - 1];
}
// console.log(fibonacci(6))

/* 
  数组对象转 树状结构
  利用对象印射来实现
  把数组的每一项 放到对象里面去，根据ID来存放
*/

const toTree = (arr) => {
  let obj = {}
  if(!Array.isArray(arr) || arr.length === 0) {
    return obj
  }
  // !将数组的每一项放到 对象里面去
  let map = {}
  arr.forEach((item) => {
    map[item.id] = item
  })
  arr.forEach((item) => {
    // 根据parentId 来拿到父级对象
    let parent = map[item.parentId]
    if(parent) {
      // 有parent 则判断是否有children， 没有就默认为数组，把item添加进去
      parent.children = parent.children || []
      parent.children.push(item)
      
    }else {
      // 没有找到 parent 则默认为最高级
      // 此处不能复制对象，直接赋值即可
      obj = item
    }
  })

  return obj
}
const arr = [
  {
    label: '1',
    id: 1,
    parentId: null
  },
  {
    label: '2',
    id: 2,
    parentId: 1
  },
  {
    label: '3',
    id: 3,
    parentId: 2
  },
  {
    label: '4',
    id: 4,
    parentId: 3
  }
]
// console.log(toTree(arr))

// 递归实现 数组转 树
const arrTotree = (arr, parentId) => {
  //   return arr.filter((item) => item.parentId === parentId).map((item) => {
  //     return {
  //       ...item,
  //       children:arrTotree(arr, item.id)
  //     }
  //   })
  let data = []
      arr.forEach(element => {
         if(element.parentId === parentId) {
          data.push({
              ...element,
              children: arrTotree(arr, element.id)
          })
         } 
      })
      return data
  }
  console.log(arrTotree(arr, null))