import {times, type, addClass, removeClass, curry, uncurry} from '../src/util';

jest.dontMock('../src/util');

describe('Test utililty', () => {
  it('Test [times]: run specific times, and excute other action at the last time.', () => {
    let count = 2, temp = 0, flag = false,
        action = (seed) => { temp += seed; },
        other = () => { flag = !flag; };

    let func = times(count, action, other);
    func(1);func(1);func(1);func(1); // execute 4 times, but it should just execute twice.

    expect(flag).toEqual(true);
    expect(temp).toEqual(2);
  });
  it('Test [type]: judge the type of first parameter.', function() {
    expect(type(1)).toEqual('number');
    expect(type('text')).toEqual('string');
    expect(type(null)).toEqual('null');
    expect(type(undefined)).toEqual('undefined');
    expect(type(true)).toEqual('boolean');
    expect(type([])).toEqual('array');
    expect(type({})).toEqual('object');
    expect(type(/^a$/)).toEqual('regexp');
  });
  it('Test [addClass, removeClass]: modify the string of class', function() {
    var className = '';
    className = addClass(className, 'loading', 'disabled');
    expect(className).toEqual('loading disabled');
    className = removeClass(className, 'loading', 'disabled');
    expect(className).toEqual('');

    className = 'btn';
    className = addClass(className, 'loading');
    expect(className).toEqual('btn loading');
    className = removeClass(className, 'btn');
    expect(className).toEqual('loading');
  });
  it('Test [curry, uncurry]: currify function', () => {
    let foo = {bar: 0}, func = function() {
      let args = Array.prototype.slice.call(arguments);
      return args.reduce((prev, cur) => {
        return prev + cur;
      }, this.bar);
    };
    expect(curry(func, foo, 1)(2)).toEqual(3);
    expect(uncurry(func, 1)(foo, 2)).toEqual(3);
  });
});
