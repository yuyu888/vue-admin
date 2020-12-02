const toString = Object.prototype.toString
const hasOwnProperty = Object.prototype.hasOwnProperty
const INFINITY = 1 / 0
const MAX_SAFE_INTEGER = 9007199254740991
const reIsUint = /^(?:0|[1-9]\d*)$/

function getTag(value) {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]'
  }
  return toString.call(value)
}

function isSymbol(value) {
  const type = typeof value
  return type == 'symbol' || (type === 'object' && value != null && getTag(value) == '[object Symbol]')
}

function isObject(value) {
  const type = typeof value
  return value != null && (type === 'object' || type === 'function')
}

function toKey(value) {
  if (typeof value === 'string' || isSymbol(value)) {
    return value
  }
  const result = `${value}`
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result
}

function isIndex(value, length) {
  const type = typeof value
  length = length == null ? MAX_SAFE_INTEGER : length

  return !!length &&
    (type === 'number' ||
      (type !== 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length)
}

function eq(value, other) {
  return value === other || (value !== value && other !== other)
}

function assignValue(object, key, value) {
  const objValue = object[key]
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value))) {
    // 处理 0 -0
    if (value !== 0 || (objValue === 0 && 1 / value !== 1 / objValue) || objValue !== 0) {
      if (Array.isArray(object)) {
        object.splice(key, 1, value);
      } else {
        Object.assign(object, { [key]: value })
      }
    }
  } else if (value === undefined && !(key in object)) {
    if (Array.isArray(object)) {
      object.push(value);
    } else {
      Object.assign(object, { [key]: value })
    }
  }
}

export default function setobj(object, path = [], value) {
  if (!isObject(object)) {
    return object
  }

  const length = path.length
  const lastIndex = length - 1

  let index = -1
  let nested = object

  while (nested != null && ++index < length) {
    const key = toKey(path[index])
    let newValue = value

    if (index != lastIndex) {
      const objValue = nested[key]
      newValue = isObject(objValue)
        ? objValue
        : (isIndex(path[index + 1]) ? [] : {})
    }
    assignValue(nested, key, newValue)
    nested = nested[key]
  }
  return object
}