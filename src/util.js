let slice = Array.prototype.slice, toString = Object.prototype.toString;

export function curry(func, binding, ...oargs) {
  return (...args) => {
    args = oargs.concat(args);
    return Function.prototype.apply.call(func, binding, args);
  }
}

export function uncurry(func, ...oargs) {
  return (binding, ...args) => {
    args = oargs.concat(args);
    return Function.prototype.apply.call(func, binding, args);
  }
}

export function times(count, func, ...others) {
  let c = 0;
  return (...args) => {
    let ret = [];
    if(c < count) {
      ret.push(func.apply(null, args));
      c++;
      // call others at the last time
      if(c == count) {
        for(let i = 0, l = others.length; i < l; i++) {
          others[i].call(null, ret);
        }
      }
    }
  }
}

export function once(...args) {
  return curry(times, null, 1).apply(null, args);
}

export function addClass(origin, className) {
  if(type(origin) == 'string') {
    if(origin == '') return className;

    let classes = origin.split(/\s+/);
    if(classes.indexOf(className) < 0) classes.push(className);

    return classes.join(' ');
  }

  return '';
}

export function removeClass(origin, className) {
  if(type(origin) == 'string') {
    let classes = origin.split(/\s+/), index = classes.indexOf(className);
    if(index > -1) classes.splice(index, 1);

    return classes.join(' ');
  }

  return '';
}

export function type(obj) {
  if(obj == null) return '' + obj; // null and undefined

  let t = typeof obj;
  if(t == 'object' || t == 'function') {
    let m = /^\[object (\w+)\]$/.exec(toString.call(obj));
    if(m && m[1]) return m[1].toLowerCase();
    else return 'unknown';
  }
  else return t;
}
