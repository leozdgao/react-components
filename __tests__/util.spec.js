var util = require('../src/util');

jest.dontMock('../src/util');

describe('Test utililty', function() {
  it('Test [times]: run specific times, and excute other action at the last time.', function() {
    var count = 2, temp = 0, flag = false,
        action = function(seed) { temp += seed; },
        other = function() { flag = !flag; };

    var func = util.times(count, action, other);
    func(1);func(1);func(1);func(1); // execute 4 times, but it should just execute twice.

    expect(flag).toEqual(true);
    expect(temp).toEqual(2);
  });
  it('Test [type]: judge the type of first parameter.', function() {
    var type = util.type;
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
    var className = '', addClass = util.addClass, removeClass = util.removeClass;
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
  it('Test [curry, uncurry]: currify function', function() {
    var foo = {bar: 0}, func = function() {
      var args = Array.prototype.slice.call(arguments);
      return args.reduce(function(prev, cur) {
        return prev + cur;
      }, this.bar);
    };
    expect(util.curry(func, foo, 1)(2)).toEqual(3);
    expect(util.uncurry(func, 1)(foo, 2)).toEqual(3);
  });
});
