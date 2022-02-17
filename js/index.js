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

var name = 'a'

function outtr() {
    var name = 'b'
    function inner() {
        console.log(name)
        console.log(this.name)
    }
    inner()
}
outtr()