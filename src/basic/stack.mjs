
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

    return {
        push: push,
        pop: pop,
        top: top,
        size: size,
        empty: empty,
        clear: clear
    }
}