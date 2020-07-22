
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
            if (_compare(_data[i], e) == true) {
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
        return basic.remove(_data, ee => _compare(e, ee))
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
        return basic.indexOf(_data, ee => _compare(e, ee)) != -1
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
     * @returns 元素数组
     */
    function find(equal) {
        return basic.stream(_data).filter(e => equal(e) == true).value()
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
            for (let i = 0; i < _data.length; ++i) {
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
        value: value,
        clear: clear,
        size: size,
        empty: empty,
        foreach: foreach
    }
}