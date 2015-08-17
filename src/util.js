const toString = Object.prototype.toString

export function noop () {}

export function predicate () { return true }

export function curry (func, binding, ...oargs) {
  return (...args) => {
    args = oargs.concat(args)
    return Function.prototype.apply.call(func, binding, args)
  }
}

export function uncurry (func, ...oargs) {
  return (binding, ...args) => {
    args = oargs.concat(args)
    return Function.prototype.apply.call(func, binding, args)
  }
}

export function times (count, func, ...others) {
  let c = 0
  return (...args) => {
    const ret = []
    if (c < count) {
      ret.push(func.apply(null, args))
      c++
      // call others at the last time
      if (c === count) {
        for (let i = 0, l = others.length; i < l; i++) {
          others[i].call(null, ret)
        }
      }
    }
  }
}

export function once (...args) {
  return curry(times, null, 1).apply(null, args)
}

export function addClass (origin, ...names) {
  if (type(origin) === 'string') {
    if (origin === '') return names.join(' ')

    const classes = origin.split(/\s+/)
    for (let i = 0, l = names.length; i < l; i++) {
      if (classes.indexOf(names[i]) < 0) classes.push(names[i])
    }

    return classes.join(' ')
  }

  return ''
}

export function removeClass (origin, ...names) {
  if (type(origin) === 'string') {
    const classes = origin.split(/\s+/)

    for (let i = 0, l = names.length; i < l; i++) {
      const index = classes.indexOf(names[i])
      if (index > -1) classes.splice(index, 1)
    }

    return classes.join(' ')
  }

  return ''
}

export function type (obj) {
  if (obj == null) return '' + obj // null and undefined

  const t = typeof obj
  if (t === 'object' || t === 'function') {
    const m = /^\[object (\w+)\]$/.exec(toString.call(obj))
    if (m && m[1]) return m[1].toLowerCase()
    else return 'unknown'
  }
  else return t
}
