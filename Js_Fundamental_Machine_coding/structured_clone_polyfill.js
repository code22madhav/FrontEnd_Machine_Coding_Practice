const obj={
    name:undefined,
    age:25,
    add:{
        city:"gaya",
        state:"bihar"
    },
    func:function xyz(){
        console.log('hi')
    },
    datetime:new Date()
}


function deepClone(param, seen=new WeakMap()){
    const result=Array.isArray(param) ? [] : {}
    if(seen.has(param)){
        return seen.get(param)
    };
    Object.keys(param).forEach((key)=>{
        const data=param[key];
        if(typeof(data)==='object' && data!==null){
            result[key]=deepClone(data,seen);
        }else{
            if(data instanceof Date){
                result[key]=new Date(data.getTime());
            }
            result[key]=data;
        }
    })
    seen.set(param,result);
    return result;
}


//To be continued copy for map,weakmap, regx, set, date is pending




const clone=deepClone(obj);
console.log(clone)
