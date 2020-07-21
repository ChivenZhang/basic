
import * as basic from "./basic.mjs"

/**
 * Set集合
 * @param {*} compare 匹配函数，例如：(a, b) => { return a == b }
 */
export const Set = (compare = (a, b) => { return a == b }) => {
    // 匹配函数
    const _compare = compare
    // 元素数组
    let _data = []

    /**
     * 添加元素
     * @param {*} e 元素
     */
    function add(e) {
        for (let i in _data) {
            if (_compare(_data[i], e)) {
                return false
            }
        }
        _data.push(e)
        return true
    }

    /**
     * 删除元素
     * @param {*} e 元素
     */
    function remove(e) {
        return basic.remove(_data, ee => { return _compare(e, ee) })
    }

    /**
     * 获取元素
     * @param {*} index 索引
     */
    function get(index) {
        if (index >= 0 && index < _data.length) {
            return _data[index]
        }
        return null
    }

    /**
     * 是否存在元素
     * @param {*} e 元素
     */
    function exist(e) {
        return basic.indexOf(_data, ee => { return _compare(e, ee) }) !== -1
    }

    /**
     * 判断空集
     */
    function empty() {
        return size() == 0
    }

    /**
     * 查找元素
     * @param {*} equal 匹配函数，例如：e => {return true}
     */
    function find(e) {
        let result = null
        basic.stream(_data).foreach(ee => {
            if (_compare(e, ee)) {
                result = ee
                return false
            }
            return true
        })
        return result
    }

    /**
     * 查找所有元素
     * @param {*} equal 匹配函数，例如：e => {return true}
     */
    function findAll(e) {
        return basic.stream(_data).filter(ee => {
            return _compare(e, ee)
        }).value()
    }

    /**
     * 获取元素数目
     */
    function size() {
        return _data.length
    }

    /**
     * 获取数据
     */
    function value() {
        return basic.copy(_data);
    }

    /**
     * 清除所有元素
     */
    function clear() {
        _data.length = 0
    }

    /**
     * 遍历元素
     * @param {*} action 遍历函数，例如：e => {return true}
     * @param {*} forward 前向遍历标志
     */
    function foreach(action, forward = true) {
        if (forward == true) {
            for (let i=0; i<_data.length; ++i) {
                if (action(_data[i]) == false) break
            }
        } else {
            for (let i = _data.length - 1; i >= 0; --i) {
                if (action(_data[i]) == false) break
                if (_data.length <= i) i = _data.length - 1
            }
        }
    }

    return {
        add: add,
        remove: remove,
        get: get,
        exist: exist,
        find: find,
        findAll: findAll,
        value: value,
        clear: clear,
        size: size,
        empty: empty,
        foreach: foreach
    }
}