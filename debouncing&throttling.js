//Debouncing and throttling

const inputField=document.getElementById("search")
const outputField=document.getElementById("output")
function debounce(fn,delay){
    let timer;
    return function(...args){
        clearTimeout(timer);
        timer=setTimeout(()=>fn.apply(this,args),delay);
    }
}
let count=0;
const debouncedSearch=debounce(callApi,500)
inputField.addEventListener("input",debouncedSearch)


function callApi(e){
    outputField.innerText=e.target.value;
}

const throttledsearch=throttling(()=>{console.log(++count)},1000);
function throttling(fn,limit){
    let flag=true;
    return function(...args){
        if(flag){
            fn.apply(this,args);
            flag=false;
            setTimeout(()=>{flag=true},limit)
        }
    }
}
