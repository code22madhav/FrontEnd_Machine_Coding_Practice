function map(arr,fn){
    const result=[];
    for(let i=0;i<arr.length;i++){
        result.push(fn(arr[i]));
    }
    return result;
}


function sqaure(x,i,arr){
    //arr.push(100); Edge case if you don't add len=this.length 
    // and use it in for loop then it will end in error or maybe 
    // infinite loop because for each callback it will add new element
    return x*x;
}


//Test Cases:
// const arr=new Array(5);
// const arr=[,,,]
// const arr={length:2, 0:10, 1:20, 3:30};
const arr=[12,2,3,4]
// console.log(arr)
// console.log(map(arr,sqaure));

Array.prototype.myMap=function (callback){
    if(typeof callback !== "function"){
        throw new TypeError("callback must be a function");
    }
    const len=this.length
    const result=new Array(this.length)
    for(let i=0;i<len;i++){
        if(this.hasOwnProperty(i)){
            result[i]=callback(this[i],i,this)
        }
    }
    return result;
}

console.log(arr)
console.log(arr.myMap(sqaure));

