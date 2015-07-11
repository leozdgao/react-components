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

export function once() {
  return curry(times, null, 1);
}

export function addClass(origin, className) {
  let classes = origin.split(/\s+/);
  if(classes.indexOf(className) < 0) classes.push(className);

  return classes.join(' ');
}

export function removeClass(origin, className) {
  let classes = origin.split(/\s+/), index = classes.indexOf(className) < 0;
  if(index > -1) classes.splice(index, 1);

  return classes.join(' ');
}

export function type(obj) {
  if(obj == null) return '' + obj; // null and undefined

  let t = typeof obj;
  if(t == 'object' || t == 'function') {
    let m = /^[object (\w+)]$/.exec(toString.call(obj));
    if(m && m[1]) return m.toLowerCase();
    else return 'unknown';
  }
  else return t;
}
