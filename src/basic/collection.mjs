// 集合工具库库

import * as List from "./list.mjs"
import * as Vector from "./vector.mjs"
import * as Set from "./set.mjs"
import * as Map from "./map.mjs"
import * as Queue from "./queue.mjs"
import * as Stack from "./stack.mjs"

/**
 * List集合
 * @param {*} compare 
 */
export const list = (compare = (a, b) => { return a === b }) => {
    return List.List(compare)
}

/**
 * Vector集合
 * @param {*} compare 
 */
export const vector = (compare = (a, b) => { return a === b }) => {
    return Vector.Vector(compare)
}

/**
 * Set集合
 * @param {*} compare 匹配函数
 */
export const set = (compare = (a, b) => { return a === b }) => {
    return Set.Set(compare)
}

/**
 * Map集合
 * @param bucket 列数
 * @param hash 键哈希函数，例如：numhash 或 strhash
 */
export const map = (bucket = 33, hash = Map.numhash) => {
    return Map.Map(bucket, hash)
}

/**
 * Queue集合
 */
export const queue = () => {
    return Queue.Queue()
}

/**
 * Stack集合
 */
export const stack = () => {
    return Stack.Stack()
}
