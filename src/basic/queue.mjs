
import * as basic from "./basic.mjs"
import * as Vector from "./vector.mjs"

/**
 * Queue集合
 */
export const Queue = () => {
    let _vector = Vector.Vector()

    function push(e) {
        _vector.add(e)
    }

    function pop() {
        if (_vector.empty()) {
            return null
        }
        let result = _vector.get(0)
        _vector.removeAt(0)
        return result
    }

    function top() {
        return _vector.get(0)
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