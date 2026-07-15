// const arr=[,,,,];
// const arr=new Array(5);
const arr=[,,,2,3]




// function mybind(callback,thisArg){
//     return function(args){
//         callback.call(thisArg,args);
//     }
// }

// const boundfn=mybind(logName,obj);
// console.log(boundfn('hello'))

const obj={
    name:"madhav"
}

function person(name){
    this.name=name
}

Function.prototype.mybind=function(thisArg,...args){
    if(typeof(this)!=='function'){
        throw new  TypeError("Caller not of type function");
    }
    const self=this;
    function boundFunction(...bindargs){
        if(this instanceof boundFunction){
            return self.call(this,...args,...bindargs)
        }else{
            return self.call(thisArg,...args,...bindargs)
        }
    }
    boundFunction.prototype = Object.create(self.prototype);
    return boundFunction;
}

Function.prototype.mybind1=function(thisArg,...args){
    if(typeof(this)!=='function'){
        throw new  TypeError("Caller not of type function");
    }
    const self=this;
    function boundFunction(...bindargs){
        const key=Symbol()
        if(this instanceof boundFunction){
            this[key]=self;
            const result=this[key](...bindargs,...args);
            delete this[key];
            return result
        }else{
            thisArg[key]=self;
            const result=thisArg[key](...bindargs,...args);
            delete thisArg[key];
            return result
        }
    }
    boundFunction.prototype = Object.create(self.prototype);
    return boundFunction;
}

const func=person.mybind(obj);
const ob=new func('pathak')
console.log(ob)
console.log(obj)


/*
checking if(this instanceof boundFunction){
this is important becaue:
if we create object with new keyword it will bind the 
constructor function with thisArg which should not happen 
because new keyword creates a {} object and bind this to it
so we looses this inside the boundfunction


why this boundFunction.prototype = Object.create(self.prototype);
is important? 
because let suppose you do 
Person.prototype.sayHi = function () {
    console.log("Hi", this.name);
};
const Bound = Person.mybind(obj);

const p = new Bound("Madhav");

p.sayHi(); 

this will fail because:
New keyword internall does:
const p = {};
p.__proto__ = boundFunction.prototype;
boundFunction.call(p);

so: p.__proto__ = boundFunction.prototype

p
 ↓
boundFunction.prototype   ← empty object
 ↓
Object.prototype

p
 ↓
boundFunction.prototype   ❌ no sayHi
 ↓
Object.prototype          ❌ no sayHi
 ↓
null

therefore if we do boundFunction.prototype = Object.create(self.prototype);

it creates a link and our prototype chain is preserved:

p
 ↓
boundFunction.prototype
 ↓
Person.prototype
 ↓
Object.prototype
*/
