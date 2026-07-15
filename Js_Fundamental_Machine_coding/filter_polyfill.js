function filterFunc(array,callback){
    const result=[];
    for(let l=0;l<array.length;l++){
        if(callback(array[l])){
            result.push(array[l]);
        }
    }
    return result;
}

// const arr=[1,2,3,4,5,6]
const arr=new Array(10);

// console.log(filterFunc(arr,evenNums));

function evenNums(x,i,arr){
    if(x%2==0){
        return x;
    }
}

const obj={
    name:'madhav'
}

Array.prototype.myfilter=function(callback,thisArg){
    if(typeof(callback)!=='function'){
        throw new Error('callback not defined')
    }
    const len=this.length
    const result=[];
    for(let l=0;l<len;l++){
        if(Object.hasOwn(this,l)){
            callback.call(thisArg,this[l],l,this) && result.push(this[l]);
        }
    }
    return result;
}

console.log(arr.myfilter(evenNums,obj))
