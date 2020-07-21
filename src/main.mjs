
import * as basic from "./basic/basic.mjs"
import * as com from "./basic/collection.mjs"

let vec = com.vector()

basic.for1(5, i=>{
    vec.add(i)
})

vec.foreach(k => {
    console.log(k)
})
console.log(vec.value())
console.log('size', vec.size())