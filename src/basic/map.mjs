
import * as basic from "./basic.mjs"
import * as Set from "./set.mjs"

/**
 * Map集合
 * @param bucket 列数
 * @param hash 键哈希函数，例如：numhash 或 strhash
 */
export const Map = (bucket = 33, hash = numhash) => {
    const _hash = hash
    let _data = basic.init(bucket, i => {
        return Set.Set((a, b) => {
            if (a.hash == null || b.hash == null) return false
            return a.hash == b.hash
        })
    })
    let _size = 0

    /**
     * 根据哈希值计算索引
     * @param hash 哈希值
     * @returns 索引
     */
    function _index(hash) {
        if (typeof hash == 'number') {
            let len = _data.length
            return (parseInt(hash % len) + len) % len
        }
        return 0
    }

    /**
     * 添加键值对
     * @param key 键
     * @param value 值
     * @returns 操作结果
     */
    function put(key, value) {
        let hash = _hash(key)
        let col = _index(hash)
        let column = _data[col]
        let result = column.add({ hash: hash, key: key, value: value })
        if (result) {
            ++_size
        }
        return result
    }

    /**
     * 获取值
     * @param key 键
     * @returns 值
     */
    function get(key) {
        let hash = _hash(key)
        let col = _index(hash)
        let column = _data[col]
        let result = column.find({ hash: hash })
        return (result) ? result.value : null
    }

    /**
     * 删除值
     * @param key 键
     * @returns 操作结果
     */
    function remove(key) {
        let hash = _hash(key)
        let col = _index(hash)
        let column = _data[col]
        let result = column.remove({ hash: hash })
        if (result) {
            --_size
        }
        return result
    }

    /**
     * 是否存在元素
     * @param key 键
     * @returns 操作结果
     */
    function exist(key) {
        let hash = _hash(key)
        let col = _index(hash)
        let column = _data[col]
        return column.exist({ hash: hash })
    }

    /**
     * 判断空集
     */
    function empty() {
        return size() == 0
    }

    /**
     * 获取键集合
     * @returns 键数组
     */
    function keys() {
        let result = []
        basic.stream(_data).filter(e => {
            e.foreach(ee => {
                result.push(ee.key)
            })
            return false
        })
        return result
    }

    /**
     * 获取值集合
     * @returns 值数组
     */
    function values() {
        let result = []
        basic.stream(_data).filter(e => {
            e.foreach(ee => {
                result.push(ee.value)
            })
            return false
        })
        return result
    }

    /**
     * 获取元素数目
     * @returns 元素数目
     */
    function size() {
        return _size
    }

    /**
     * 清空元素
     */
    function clear() {
        basic.stream(_data).filter(e => {
            e.clear()
            return false
        })
        _size = 0
    }

    /**
     * 遍历元素
     * @param action 遍历函数，例如：key => { }
     */
    function foreach(action) {
        basic.stream(_data).foreach(e => {
            let result = true
            e.foreach(ee => {
                result = action(ee.key)
                return result
            })
            return result
        })
    }

    return {
        put: put,
        get: get,
        remove: remove,
        exist: exist,
        keys: keys,
        values: values,
        clear: clear,
        size: size,
        empty: empty,
        foreach: foreach
    }
}

/**
 * 获取字符串哈希值
 * @param string 字符串
 */
export const strhash = (string) => {
    if (typeof string == 'string') {
        let hash = 0
        for (let i in string) {
            hash = hash * 31 + string.charCodeAt(i++)
        }
        return hash
    }
    return 0
}

/**
 * 获取数值哈希值
 * @param number 数值
 */
export const numhash = (number) => {
    if (typeof number == 'number') {
        return number
    }
    return 0
}