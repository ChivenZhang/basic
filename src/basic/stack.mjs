
import * as basic from "./basic.mjs"
import * as Vector from "./vector.mjs"

/**
 * Stack集合
 */
export const Stack = () => {
    let _vector = Vector.Vector()

    function push(e) {
        _vector.add(e)
    }

    function pop() {
        let index = _vector.size() - 1
        let result = _vector.get(index)
        _vector.removeAt(index)
        return result
    }

    function top() {
        let index = _vector.size() - 1
        return _vector.get(index)
    }

    /**
     * 获取数据
     * @returns 数组
     */
    function value() {
        let result = []
        _vector.foreach(e => {
            result.push(e)
            return true
        }, false)
        return result
    }

    /**
     * 判断空集
     */
    function size() {
        return _vector.size()
    }

    /**
     * 判断空集
     */
    function empty() {
        return size() == 0
    }

    /**
     * 清空集合
     */
    function clear() {
        _vector.clear()
    }

    /**
     * 遍历元素
     * @param action 
     */
    function foreach(action) {
        _vector.foreach(action, false)
    }

    return {
        push: push,
        pop: pop,
        top: top,
        value: value,
        size: size,
        empty: empty,
        clear: clear,
        foreach: foreach
    }
}