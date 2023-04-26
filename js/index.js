/* 
算法题 多维数组变一维数组 [1,2,3,4,[3,4,6,[4,4,5]]]
数组自带方法可直接实现， flat   自封装方法 myFlat
*/
const arr = [1, 2, 3, 4, [3, 4, 6, [4, 4, 5]]]
let newArray = []
const myFlat = (array) => {
  if (array.length > 0) {
    array.forEach((element) => {
      if (Array.isArray(element)) {
        myFlat(element)
      } else {
        newArray.push(element)
      }
    })
  }
}
// myFlat(arr)
// console.log(newArray)

// ------- 作用域 ------
var name = "a"
function outtr() {
  var name = "b"
  function inner() {
    console.log(name)
    console.log(this.name, "函数内")
  }
  inner()
}
// outtr()

// ------ 二分查找 ------
/**
 * @param {number[]} nums   [-1,0,3,5,9,12]
 * @param {number} target  9
 * @return {number}
 */
var search = function (nums, target) {
  let right = nums.length - 1
  let left = 0
  if (target > nums[right] || target < nums[left]) {
    return -1
  }
  while (right >= left) {
    let mid = Math.floor((right + left) / 2)
    let midValue = nums[mid]
    if (target > midValue) {
      left = mid + 1
    } else if (target < midValue) {
      right = mid - 1
    } else {
      return mid
    }
  }
  return -1
}

// console.log(search([-1,0,3,5,9,12], 9))

// ------ 双指针 ------
// 移动0 到最右边，其他非0 保持位置不变
var moveZeroes = function (nums) {
  let left = 0
  let right = 0
  let l = nums.length
  while (right < l) {
    if (nums[right] != 0) {
      nums[left] = nums[right]
      left++
    }
    right++
  }
  for (let i = left; i < l; i++) {
    nums[i] = 0
  }
  console.log(nums)
}
// moveZeroes([0])

// 翻转字符串的 单个单词， 整个字符串顺序不变
var reverseWords = function (s) {
  let arr = s.split(" ")
  console.log(arr)
  for (let i = 0; i < arr.length; i++) {
    let newArr = arr[i].split("")
    console.log(newArr)
    let left = 0
    let right = newArr.length - 1
    while (left < right) {
      let temp = newArr[right]
      newArr[right] = newArr[left]
      newArr[left] = temp
      left++
      right--
    }
    arr[i] = newArr.join("")
  }
  s = arr.join(" ")
  return s
}
//console.log(reverseWords("God Ding"))

// 字符串不出现重复最长长度
// ! 用一个滑动窗口装没有重复的字符，枚举字符记录最大值即可
// ! 对于遇到重复字符如何收缩窗口大小？
// ! 我们可以用 map 维护字符的索引，遇到相同的字符，把左边界移动过去即可
// ! 挪动的过程中记录最大长度
const str = "asdafgjhcdsafc"
const lengthOfStr = (str) => {
  let map = new Map()
  let res = 0
  let i = -1
  for (let j = 0; j < str.length; j++) {
    if (map.has(str[j])) {
      i = Math.max(i, map.get(str[j]))
    }
    res = Math.max(res, j - i)
    map.set(str[j], j)
  }
  return res
}
// console.log("lengthOfStr", lengthOfStr(str))

/* 
  需求：js 手写快排实现数组从小到大排序
  !   1.获取中间下标的位置，得到中间下标的值
  !   2.以中间下标的值，将数组分成左右两部分，
  !   3.对数组值进行对比大小，小于中间值的放左边，大于的放右边，
  !   4.递归重复2,3步骤，直到排序完成
*/

const quickSort = (arr) => {
  if (arr.length < 2) {
    return arr
  }
  let midIndex = Math.floor(arr.length / 2)
  let midValue = arr.splice(midIndex, 1)[0]
  let left = []
  let right = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < midValue) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }

  return quickSort(left).concat([midValue], quickSort(right))
}
console.log(quickSort([9, 8, 5, 4, 7, 1, 2]))
