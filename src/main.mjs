
import * as basic from "./basic/basic.mjs"
import * as com from "./basic/collection.mjs"

let queue = com.map()

basic.for1(5, i=>{
    queue.put(i, i*10)
})

console.log(queue.values())

