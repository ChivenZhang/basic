
import * as basic from "./basic.mjs"

/**
 * List集合
 * @param {*} compare 比较函数，例如：compare = (a, b) => { return a == b }
 */
export const List = (compare = (a, b) => { return a == b }) => {
    const _compare = compare
    let _head = { next: null, last: null, data: null }
    let _tail = _head
    let _size = 0

    /**
     * 添加元素
     * @param {*} e 元素
     * @returns 操作结果
     */
    function add(e) {
        let _new = { next: null, last: _tail, data: e }
        _tail.next = _new
        _tail = _new
        ++_size
    }

    /**
     * 插入元素
     * @param {*} index 插入位置
     * @param {*} e 插入元素
     * @returns 操作结果
     */
    function insert(index, e) {
        if (index >= 0 && index <= _size) {
            let _new = { next: null, last: null, data: e }
            let ptr = _head
            for (let i = 0; i < index; ++i) ptr = ptr.next
            if (ptr == _tail) {
                _tail = _new
            }
            let current = ptr.next
            if (current) {
                current.last = _new
            }
            _new.next = current
            _new.last = ptr
            ptr.next = _new
            ++_size
            return true
        }
        return false
    }

    /**
     * 删除元素
     * @param {*} e 元素
     * @returns 操作结果
     */
    function remove(e) {
        let result = false
        let ptr = _head
        while (ptr.next) {
            if (_compare(e, ptr.next.data)) {
                let current = ptr.next
                if (_tail == current) {
                    _tail = ptr
                }
                if (current.next) {
                    current.next.last = ptr
                }
                ptr.next = current.next
                current.last = null
                current.next = null
                --_size
                result = true
            }
            ptr = ptr.next
        }
        return result
    }

    /**
     * 删除元素
     * @param {*} index 索引
     * @returns 操作结果
     */
    function removeAt(index) {
        if (index >= 0 && index < _size) {
            let ptr = _head
            for (let i = 0; i < index; ++i) ptr = ptr.next
            let current = ptr.next
            if (_tail == current) {
                _tail = ptr
            }
            if (current.next) {
                current.next.last = ptr
            }
            ptr.next = current.next
            current.last = null
            current.next = null
            --_size
            return true
        }
        return false
    }

    /**
     * 替换元素
     * @param {*} e 元素
     * @param {*} equal 匹配函数，例如：e => {return true}
     * @returns 操作结果
     */
    function replace(e, equal) {
        let result = false
        let ptr = _head.next
        while (ptr) {
            if (equal(ptr.data)) {
                ptr.data = e
                result = true
            }
            ptr = ptr.next
        }
        return result
    }

    /**
     * 获取元素
     * @param {*} index 索引
     * @returns 元素
     */
    function get(index) {
        if (index >= 0 && index < _size) {
            let ptr = _head.next
            for (let i = 0; i < index; ++i) ptr = ptr.next
            return ptr.data
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
        if (index >= 0 && index < _size) {
            let ptr = _head.next
            for (let i = 0; i < index; ++i) ptr = ptr.next
            ptr.data = e
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
        let ptr = _head.next
        while (ptr) {
            if (_compare(e, ptr.data)) {
                return true
            }
            ptr = ptr.next
        }
        return false
    }

    /**
     * 查找元素
     * @param {*} equal 匹配函数，例如：e => {return true}
     * @returns 元素数组
     */
    function find(equal) {
        let result = []
        foreach(e => {
            if (equal(e)) {
                result.push(e)
            }
            return true
        })
        return result
    }

    /**
     * 获取元素数目
     */
    function size() {
        return _size
    }

    /**
     * 判断空集
     */
    function empty() {
        return size() == 0
    }

    /**
     * 获取数据
     * @returns 数组
     */
    function value() {
        let result = []
        foreach(e => {
            result.push(e)
            return true
        })
        return result
    }

    /**
     * 清除所有元素
     */
    function clear() {
        let ptr = _head
        while(ptr){
            let next = ptr.next
            ptr.next = null
            ptr.last = null
            ptr = next
        }
        _tail = _head
        _size = 0
    }

    /**
     * 遍历元素
     * @param {*} action 遍历函数，例如：e => {return true}
     * @param {*} forward 前向遍历标志
     */
    function foreach(action, forward = true) {
        if (forward == true) {
            let ptr = _head.next
            while (ptr) {
                if (action(ptr.data) == false) break
                ptr = ptr.next
            }
        } else {
            let ptr = _tail
            while(ptr != null && ptr != _head){
                if (action(ptr.data) == false) break
                ptr = ptr.last
            }
        }
    }

    return {
        add: add,
        insert: insert,
        remove: remove,
        removeAt: removeAt,
        replace: replace,
        find: find,
        exist: exist,
        get: get,
        set: set,
        size: size,
        value: value,
        empty: empty,
        clear: clear,
        foreach: foreach
    }
}