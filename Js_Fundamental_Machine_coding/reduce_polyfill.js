// const arr=[,,,,];
// const arr=new Array(5);
const arr=[,,,2,3]
const obj={
    name:"madhav"
}

function sum(result,num){
    return result+num;
}

function reducepolyfill(callback,arr,initialValue,thisArg){
    let result=initialValue;
    const len=arr.length;
    for(let l=0;l<len;l++){
        if(Object.hasOwn(arr,l)){
            result=callback.call(thisArg,result,arr[l]);
        }
    }
    return result;
}

Array.prototype.myreduce=function(callback,initialValue,thisArg){
    if(typeof(callback)!=='function'){
        throw new TypeError('Callback function is not passed');
    }
    const hasInitialValue = arguments.length >= 2;
    if(!this.length && !hasInitialValue){
        throw new TypeError('Reduce called on empty array with no initial value');
    }
    let firstValue;
    let firstIndex;
    const obj = Object(this);
    const len = obj.length;
    for(let l=0;l<len;l++){
        if(Object.hasOwn(this,l)){
            firstValue=obj[l];
            firstIndex=l;
            break;
        }
    }
    if (!hasInitialValue && firstIndex === undefined) {
        throw new TypeError(
            "Reduce of empty array with no initial value"
        );
    }
    let acc;
    let startIndex;
    if (hasInitialValue) {
        acc = initialValue;
        startIndex = 0;
    } else {
        acc = firstValue;
        startIndex = firstIndex + 1;
    }
    for(let l=startIndex;l<len;l++){
        if(Object.hasOwn(this,l)){
            acc=callback.call(thisArg,acc,obj[l],l,this);
        }
    }
    return acc;
}

console.log(arr.myreduce(sum,0))
console.log(arr.reduce(sum,0))
