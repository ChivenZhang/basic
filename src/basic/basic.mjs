// 数组工具库

/**
 * 初始化数组
 * @param {*} num 元素数目
 * @param {*} action 初始化函数，例如：index => { return index }
 * @returns 数组
 */
export const init = (num, action = i => { return i }) => {
    let result = []
    if (num > 0) {
        for (let index = 0; index < num; ++index) {
            let e = action(index)
            result.push(e)
        }
    }
    return result
}

/**
 * 判断数组是否为空
 * @param array 数组
 * @returns 判断结果
 */
export const empty = (array) => {
    if (array instanceof Array) return array.length == 0
    return true
}

/**
 * 查找数组元素
 * @param {*} array 数组
 * @param {*} equal 匹配函数，例如：e => {return true}
 * @returns 索引
 */
export const indexOf = (array, equal) => {
    if (empty(array) == false) {
        for (let index in array) {
            if (equal(array[index])) {
                return index
            }
        }
    }
    return -1
}

/**
 * 查找数组元素
 * @param {*} array 数组
 * @param {*} equal 匹配函数，例如：e => {return true;}
 * @returns 元素
 */
export const valueOf = (array, equal) => {
    if (empty(array) == false) {
        for (let index in array) {
            if (equal(array[index])) {
                return array[index]
            }
        }
    }
    return null
}

/**
 * 替换所有元素
 * @param {*} array 数组
 * @param {*} e0 新元素
 * @param {*} equal 匹配函数，例如：e => {return true}
 * @returns 操作结果
 */
export const replace = (array, e0, equal) => {
    let result = false
    if (empty(array) == false) {
        for (let index in array) {
            if (equal(array[index])) {
                array[index] = e0
                result = true
            }
        }
    }
    return result
}

/**
 * 插入元素
 * @param {*} array 数组
 * @param {*} index 索引
 * @param {*} e0 元素
 */
export const insert = (array, index, e0) => {
    if (array instanceof Array) {
        let len = array.length
        if (index >= 0 && index <= len) {
            let temp = array[index]
            let next = null
            array.push(0)
            for (let i = index; i < len; ++i) {
                next = array[i + 1]
                array[i + 1] = temp
                temp = next
            }
            array[index] = e0
            return true
        }
    }
    return false
}

/**
 * 删除数组元素
 * @param {*} array 数组
 * @param {*} equal 匹配函数，例如：e => { return true }
 */
export const remove = (array, equal) => {
    if (empty(array) == false) {
        let start = 0
        for (let i in array) {
            if (equal(array[i]) == false) {
                array[start++] = array[i]
            }
        }
        array.length = start
        return true
    }
    return false
}

/**
 * 删除数组元素
 * @param {*} array 数组
 * @param {*} index 索引
 */
export const removeAt = (array, index) => {
    let result = false
    if (empty(array) == false) {
        let start = 0
        for (let i in array) {
            if (i == index) {
                result = true
            } else {
                array[start++] = array[i]
            }
        }
        array.length = start
    }
    return result
}

/**
 * 快速排序
 * @param {*} array 
 * @param {*} compare 
 * @param {*} from 
 * @param {*} to 
 */
const quick_sort = function (array, compare, from, to) {
    let j = from
    let k = to
    let mid = array[to]
    if (j < k) {
        while (j < k) {
            while (j < k) {
                if (compare(array[j], mid) < 0) {
                    ++j
                }
                else {
                    array[k] = array[j]
                    --k
                    break
                }
            }
            while (j < k) {
                if (compare(mid, array[k]) <= 0) {
                    --k
                }
                else {
                    array[j] = array[k]
                    ++j
                    break
                }
            }
        }
        array[k] = mid
        quick_sort(array, compare, from, k - 1)
        quick_sort(array, compare, k + 1, to)
    }
}

/**
 * 数组元素排序
 * @param {*} array 数组
 * @param {*} compare 比较函数，例如：(a,b) => {if(a<b)return -1;if(b<a)return 1;return 0;}
 */
export const sort = (array, compare = (a, b) => { if (a < b) return -1; if (b < a) return 1; return 0; }) => {
    if (empty(array) == false) {
        quick_sort(array, compare, 0, array.length - 1)
    }
}

/**
 * 复制数组元素
 * @param {*} array 
 */
export const copy = (array) => {
    let result = []
    if (empty(array) == false) {
        for (let index in array) {
            result.push(array[index])
        }
    }
    return result
}

/**
 * 数组降维（扁平化）
 * @param array 多维数组
 * @returns 一维数组
 */
export const flatten = (array) => {
    let result = []
    let stack = []
    if (empty(array) == false) {
        stack.push(array)
        while (stack.length) {
            let index = stack.length - 1
            let top = stack[index]
            stack.length = index
            for (let i in top) {
                if (top[i] instanceof Array) {
                    for (let ii = top.length - 1; ii >= i; --ii) stack.push(top[ii])
                    break
                } else {
                    result.push(top[i])
                }
            }
        }
    }
    return result
}

/**
 * 过滤数组元素
 * @param {*} array 数组
 * @returns 数据流
 */
export const stream = (array) => {
    //当前数组
    let _array = flatten(array)
    //当前索引
    let _index = -1

    /**
     * 数据流处理
     * @param {*} equal 匹配函数，例如：e => {return true}
     */
    function filter(equal) {
        let result = []
        if (empty(_array) == false) {
            for (let index in _array) {
                _index = index
                if (equal(_array[index])) {
                    result.push(_array[index])
                }
            }
        }
        _array = result
        _index = -1
        return {
            filter: filter,
            value: value,
            clone: clone,
            index: index,
            set: set,
            get: get,
            size: size
        }
    }

    /**
     * 数据流遍历
     * @param {*} action 遍历函数，例如：e => {return true}
     */
    function foreach(action) {
        if (empty(_array) == false) {
            for (let index in _array) {
                _index = index
                if (action(_array[index]) == false) {
                    break
                }
            }
        }
        _index = -1
        return {
            filter: filter,
            foreach: foreach,
            value: value,
            clone: clone,
            index: index,
            set: set,
            get: get,
            size: size
        }
    }

    /**
     * 获取当前数组
     */
    function value() {
        return _array
    }

    /**
     * 复制当前数组
     */
    function clone() {
        return copy(_array)
    }

    /**
     * 获取当前数组长度
     */
    function size() {
        return _array.length
    }

    /**
     * 设置当前元素
     * @param {*} e 元素
     */
    function set(e) {
        if (_index >= 0 && _index < _array.length) {
            _array[_index] = e
        }
    }

    /**
     * 获取当前元素
     */
    function get() {
        if (_index >= 0 && _index < _array.length) {
            return _array[_index]
        }
        return null
    }

    /**
     * 设置当前索引 
     */
    function index() {
        return _index
    }

    return {
        filter: filter,
        foreach: foreach,
        value: value,
        clone: clone,
        index: index,
        set: set,
        get: get,
        size: size
    }
}

/**
 * 索引遍历：for(let i=0; i<=num; ++i)
 * @param num 循环次数
 * @param action 遍历函数，例如：i => { }
 */
export const for1 = (num, action) => {
    for (let i = 0; i < num; ++i) {
        if (action(i) == false) break
    }
}

/**
 * 索引遍历：for(let i=index; i<=index+num; ++i)
 * @param index 起始索引
 * @param num 循环次数
 * @param action 遍历函数，例如：i => { }
 */
export const for2 = (index, num, action) => {
    let end = index + num
    for (let i = index; i < end; ++i) {
        if (action(i) == false) break
    }
}

/**
 * 索引遍历：for(let i=index; i<=index+num; i+=span)
 * @param index 起始索引
 * @param num 循环次数
 * @param span 索引步进
 * @param action 遍历函数，例如：i => { }
 */
export const for3 = (index, num, span, action) => {
    let end = index + num
    for (let i = index; i < end; i += span) {
        if (action(i) == false) break
    }
}