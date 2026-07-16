function sum(...a){
    totalA=a.reduce((acc,next)=>acc+next,0)
    return function(...b){
        totalB=b.reduce((acc,next)=>acc+next,0)
        if(b?.length===0){
            return totalA;
        }else{
            return sum(totalA+totalB)
        }
    }
}

// console.log(sum(2,2)(3,2)(4,2)(6,2)(3,2)());

function curry(func){
    return function curriedFunc(...args){
        if(args.length>=func.length){
            return func(...args);
        }else{
            return function(...b){
                return curriedFunc(...args,...b);
            }
        }
    }
}

const sumNum=(a,b,c,d)=> a+b+c+d;

const curriedfunc=curry(sumNum);
console.log(curriedfunc(2)(2)(2)(2));
