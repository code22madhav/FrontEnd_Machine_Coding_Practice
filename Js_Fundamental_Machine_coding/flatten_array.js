let arr=[[12,12,12,[12,12,[12]]],12]

// function flatten(arr,level=Infinity){
//     let ans=[];
//     for(let i=0;i<arr.length;i++){
//         if(Array.isArray(arr[i]) && level>0) ans.push(...flatten(arr[i],level-1));
//         else ans.push(arr[i]);
//     }
//     return ans;
// }
function flatten(arr,level=Infinity){
    let ans=[];
    arr.forEach((element)=>{
        if(Array.isArray(element) && level>0) ans.push(...flatten(element,level-1));
        else ans.push(element);
    })
    return ans;
}
console.log(flatten(arr,1));
