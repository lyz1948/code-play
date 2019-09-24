# Vue

### vue源码中的一些工具方法
```bash
function isUnDef(v) {
  return v === undefined || v === null
}

function isDef(v) {
  return v !== undefined && v !== null
}

function isTrue(v) {
  return v === true
}

function isFalse(v) {
  return v === false
}

function isPrimitive(value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  )
}

function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

var _toString = Object.prototype.toString;

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp(v) {
  return _toString.call(v) === '[object RegExp]'
}

function isValidArrayIndex(v) {
  var n = parseFloat(v)
  return n > 0 && Math.floor(n) === n && isFinite(v)
}

function toString(val) {
  return val == null ? '' : typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val)
}

function toNumber(val) {
  var n = parseFloat(val)
  return isNaN(n) ? val : n
}

function makeMap(str, expectsLowerCase) {
  var map = Object.create(null)
  var list = str.split(',')

  for(var i = 0; i < list.length; i++) {
    map[list[i]] = true
  }

  return expectsLowerCase
    ? function(v) {return map[v.toLowerCase()]}
    : function(v) {return map[v]}
}

function remove(arr, item) {
  if(arr.length) {
    var index = arr.indexOf(item)
    if(index > -1) {
      return arr.splice(index, 1)
    }
  }
}

var hasOwnProperty = Object.prototype.hasOwnProperty

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, kay)
}

function cached(fn) {
  var cache = Object.create(null)
  return (functoin cachedFn(str) {
    var hit = cache[str]

    return hit || (cache[str] = fn(str))
  })
}

var camelizeRE = /-(\w)/g
var camelize = cached(function(str) {
  return str.replace(camelizeRE, function(_, c) {return c ? c.toUpperCase() : ''})
})

var capitalize = cached(function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
})

var hypenateRE = /([^-])([A-Z])/g
var hypenate = cached(function(str) {
  return str
    .replace(hypenateRE, '$1-$2')
    .replace(hypenateRE, '$1-$2')
    .toLowerCase()
})

function bind(fn, ctx) {
  function boundFn(a) {
    var len = arguments.length
    return len
      ? len > 1
        ? fn.call(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  boundFn._length = fn.length
  return boundFn
}

function toArray(list, start) {
  start = start || 0
  var i = list.length - start
  var ret = new Array(i)
  while(i--) {
    ret[i] = list[i + start]
  }
  return ret
}

function extend(to, _from) {
  for(var key in _from) {
    to[key] = _from[key]
  }
  return to
}

function toObject(arr) {
  var ret = {}
  for(var i = 0; i < arr.length; i++) {
    if(arr[i]) {
      extend(ret, arr[i])
    }
  }
  return ret
}

function loopEqual(a, b) {
  if(a === b) return
  var isObjectA = isObject(a)
  var isObjectB = isObject(b)

  if(isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a)
      var isArrayB = Array.isArray(b)

      if(isArrayA && isArrayB) {
        return a.length === b.length && a.every(function(e, i) {
          return loopEqual(e, b[i])
        })
      }
      else if(!isArrayA && !isArrayB) {
        var keysA = Object.keys(a)
        var keysB = Object.keys(b)

        return keysA.length === keysB.length && keysA.every(function(key) {
          return loopEqual(a[key], b[key])
        })
      }
      else {
        return false
      }
    }
    catch(e) {
      return false
    }
  }
  else if(!isObjectA && !isObjectB) {
    return String(a) === String(b)
  }
  else {
    return false
  }
}

function looseIndexOf(arr, val) {
  for(var i = 0; i < arr.length; i++) {
    if(loopEqual(arr[i], val)) {
      return i
    }
  }
  return -1
}

function once(fn) {
  var cache = false
  return function() {

    if(!cache) {
      cache = true
      fn.call(this, arguments)
    }
  }
}

function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    configurable: true,
    writable: true
  })
}

var baiRE = /[^\w.$]/
function parsePath(path) {
  if(baiRE.test(path)) {
    return
  }

  var segments = path.split('.')
  return function(obj) {
    for(var i = 0; i < segments.length; i++) {
      if(!obj) {return }
      obj = obj[segments[i]]
    }
    return obj
  }
}

var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
}
```
