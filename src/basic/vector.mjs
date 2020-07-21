
import * as basic from "./basic.mjs"

/**
 * Vector集合
 * @param {*} initial 初始数组
 * @param {*} compare 比较函数，例如：compare = (a, b) => { return a == b }
 */
export const Vector = (initial = null, compare = (a, b) => { return a == b }) => {
    // 匹配函数
    const _compare = compare
    // 元素数组
    let _data = basic.copy(initial)

    /**
     * 添加元素
     * @param {*} e 元素
     * @returns 操作结果
     */
    function add(e) {
        _data.push(e)
        return true
    }

    /**
     * 插入元素
     * @param {*} index 插入位置
     * @param {*} e 插入元素
     * @returns 操作结果
     */
    function insert(index, e) {
        return basic.insert(_data, index, e)
    }

    /**
     * 删除元素
     * @param {*} e 元素
     * @returns 操作结果
     */
    function remove(e) {
        return basic.remove(_data, ee => { return _compare(e, ee) })
    }

    /**
     * 删除元素
     * @param {*} index 索引
     * @returns 操作结果
     */
    function removeAt(index) {
        return basic.removeAt(_data, index)
    }

    /**
     * 替换元素
     * @param {*} e 元素
     * @param {*} equal 匹配函数，例如：e => {return true}
     * @returns 操作结果
     */
    function replace(e, equal) {
        return basic.replace(_data, e, equal)
    }

    /**
     * 获取元素
     * @param {*} index 索引
     * @returns 元素
     */
    function get(index) {
        if (index >= 0 && index < _data.length) {
            return _data[index]
        }
        return null
    }

    /**
     * 设置元素
     * @param {*} index 索引
     * @param {*} e 元素
     * @returns 操作结果
     */
    function set(index, e) {
        if (index >= 0 && index < _data.length) {
            _data[index] = e
            return true
        }
        return false
    }

    /**
     * 是否存在元素
     * @param {*} e 元素
     * @returns 操作结果
     */
    function exist(e) {
        return basic.indexOf(_data, ee => { return _compare(e, ee) }) !== -1
    }

    /**
     * 查找元素
     * @param {*} equal 匹配函数，例如：e => {return true}
     * @returns 元素数组
     */
    function find(equal) {
        return basic.stream(_data).filter(e => {
            return equal(e)
        }).value()
    }

    /**
     * 元素排序
     * @param {*} compare 比较函数，例如：(a, b) => { if (a < b) return -1; if (b < a) return 1; return 0; }
     */
    function sort(compare = (a, b) => { if (a < b) return -1; if (b < a) return 1; return 0; }) {
        basic.sort(_data, compare)
    }

    /**
     * 获取元素数目
     * @returns 数目
     */
    function size() {
        return _data.length
    }

    /**
     * 判断空集
     * @returns 操作结果
     */
    function empty() {
        return size() == 0
    }

    /**
     * 获取数据
     * @returns 数组
     */
    function value() {
        return basic.copy(_data)
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
        insert: insert,
        remove: remove,
        removeAt: removeAt,
        replace: replace,
        get: get,
        set: set,
        exist: exist,
        find: find,
        sort: sort,
        value: value,
        clear: clear,
        size: size,
        empty: empty,
        foreach: foreach
    }
}
