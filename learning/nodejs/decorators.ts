// Class decorator 
function Controller(prefix: string) {
    console.log("Controller  called")

    return function (construcor: Function) {
        console.log("Controller func called")

        console.log(construcor.prototype)
        construcor.prototype.prefix = prefix
        console.log(construcor)
        console.log(`added prefix to constructor ${prefix}`)
    }
}


function Log(message: string) {
    console.log("Log called")

    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        console.log("Log function called")

        console.log(target, propertyKey, descriptor, message)
        const original: Function = descriptor.value
        descriptor.value = function (...args: any[]) {
            console.log(`Log ${message}`)
            return original.apply(this, args)
        }
    }
}

function Post() {
    console.log("Post called")
    return function (...args: any[]) {
        console.log("Post function called")

        console.log(args)
    }
}

@Controller("/user")
class User {
    @Log("Getting route called")
    get(@Post() data1: string, data2:string) {
        return data1
    }
}

const u = new User()
// @ts-ignore
//console.log(u.prefix)
console.log(u.get("test calls"))

// const a = Controller("test")
// const f = function () { }
// const b = a(f)
const f = function () { }
// const b = a(f)
// console.log(b)