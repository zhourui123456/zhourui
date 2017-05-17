/**
 * Created by dream on 2017/5/12.
 */
var data1;
var p1=function () {
    const p=new Promise(function (resolve,reject) {
        setTimeout(function () {
            console.log("第一个打印")
            resolve("第一个打印")
        },4000)
    })
    return p
}
var p2=function () {
    const p=new Promise(function (resolve,reject) {
        setTimeout(function () {
            console.log("第二个打印")
            resolve("第二个打印")
        },3000)
    })
    return p
}

p1().then(function (data) {
    data1=data
    return p2()
}).then(function (data) {

    console.log(data1+"zuihou")
})