/* 
算法题 多维数组变一维数组 [1,2,3,4,[3,4,6,[4,4,5]]]
数组自带方法可直接实现， flat   自封装方法 myFlat
*/
const arr = [1,2,3,4,[3,4,6,[4,4,5]]]
let newArray = []
const myFlat = (array) => {
    if(array.length > 0) {
        array.forEach(element => {
            if(Array.isArray(element)) {
                myFlat(element)
            }else {
                newArray.push(element)
            }
        });
    }
}
// myFlat(arr)
// console.log(newArray)

// ------- 作用域 ------
var name = 'a'

function outtr() {
    var name = 'b'
    function inner() {
        console.log(name)
        console.log(this.name)
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
var search = function(nums, target) {
    let right = nums.length -1
    let left = 0
    if(target > nums[right] || target < nums[left]) {
        return -1
    }
    while(right >= left) {
        let mid = Math.floor((right + left)/2)
        let midValue = nums[mid]
        if(target > midValue) {
            left = mid +1 
        }else if(target < midValue){
            right = mid - 1
        }else {
            return mid
        }
    }
    return -1
};

// console.log(search([-1,0,3,5,9,12], 9))