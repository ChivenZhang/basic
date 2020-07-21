
import * as basic from "./basic/basic.mjs"
import * as com from "./basic/collection.mjs"

let m = com.map()
basic.for1(10, i => {
    m.put(i, i * 10)
})
m.foreach(k => {
    console.log(m.get(k))
})

