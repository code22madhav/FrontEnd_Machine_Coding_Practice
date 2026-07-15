const obj={
    name:"madhav"
}

function person(name){
    return this.name;
}

Function.prototype.myCall=function(thisArg,...args){
    if (typeof this !== "function") {
        throw new TypeError("Caller must be a function");
    }
    thisArg = thisArg ?? globalThis;
    thisArg = Object(thisArg); //this line handle these cases like: person.myCall('string') or myCall(10) because it will do 10[key] = test;
    const key = Symbol();
    thisArg[key] = this;
    try {
        return thisArg[key](...args);
    } finally {
        delete thisArg[key];
    }
}

console.log(person.myCall(obj));
