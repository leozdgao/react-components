(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react")) : factory(root["React"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var ActionButton = __webpack_require__(1);
	exports.ActionButton = ActionButton;
	var Portal = __webpack_require__(5);
	exports.Portal = Portal;
	var Modal = __webpack_require__(6);
	exports.Modal = Modal;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _classnamesDedupe = __webpack_require__(3);

	var _classnamesDedupe2 = _interopRequireDefault(_classnamesDedupe);

	var _util = __webpack_require__(4);

	var T = _react2['default'].PropTypes;

	exports['default'] = _react2['default'].createClass({
	  displayName: 'actionButton',

	  // define property types here
	  propTypes: {
	    className: T.string,
	    action: T.oneOfType([T.func, T.object]),
	    disabled: T.bool,
	    onResolving: T.func,
	    onResolved: T.func,
	    onError: T.func,
	    onFinish: T.func,
	    only: T.bool,
	    children: T.node
	  },
	  getDefaultProps: function getDefaultProps() {
	    return {
	      action: _util.noop,
	      onResolving: _util.predicate,
	      onResolved: _util.noop,
	      onError: _util.noop,
	      only: true // disabled button when action is executing, if false, it will handled by property
	    };
	  },
	  // handle disable property
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.disabled !== this.state.disabled) {
	      this.setState({ disabled: nextProps.disabled });
	    }
	  },
	  getInitialState: function getInitialState() {
	    return {
	      className: this.props.className || '',
	      disabled: this.props.disabled || false
	    };
	  },
	  render: function render() {
	    return _react2['default'].createElement(
	      'button',
	      { className: this.state.className, onClick: this._handleClick,
	        disabled: this.state.disabled ? 'disabled' : null },
	      this.props.children
	    );
	  },
	  // handle click event here
	  _handleClick: function _handleClick(e) {
	    var _this = this;

	    // invoke onResolving before action, the action can be canceled if onResolving return false
	    if (!this.state.disabled && this.props.onResolving() !== false) {
	      (function () {
	        // set disable if set only to true
	        _this._setDisableWhenOnly(true);
	        // add class
	        _this.setState({ className: (0, _classnamesDedupe2['default'])(_this.state.className, 'loading') });

	        // declare
	        var action = _this.props.action,
	            rmLoadingClass = function rmLoadingClass() {
	          _this.setState({ className: (0, _classnamesDedupe2['default'])(_this.state.className, { 'loading': false }) });
	        },
	            setDisable = (0, _util.curry)(_this._setDisableWhenOnly, _this, false),
	            onFinish = function onFinish() {
	          setTimeout(function () {
	            var func = _this.props.onFinish || _util.noop;func();
	          }, 0);
	        },
	            onResolved = (0, _util.once)(_this.props.onResolved, rmLoadingClass, setDisable, onFinish),
	            onError = (0, _util.once)(_this.props.onError, rmLoadingClass, setDisable, onFinish),
	            callback = function callback(err) {
	          for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            args[_key - 1] = arguments[_key];
	          }

	          if (err) onError.call(null, err);else {
	            onResolved.apply(null, args);
	          }
	        };

	        if (action.length > 1) {
	          // callback as second parameter
	          action.call(null, e, callback);
	        } else {
	          if ((0, _util.type)(action.then) === 'function') {
	            // action is promise
	            action.then.call(action, onResolved, onError);
	          } else {
	            // it is a sync action
	            var ret = action.call(null, e);
	            if (ret && (0, _util.type)(ret.then) === 'function') ret.then.call(ret, onResolved, onError);else onResolved.call(null, ret);
	          }
	        }
	      })();
	    }
	  },
	  _setDisableWhenOnly: function _setDisableWhenOnly(val) {
	    if (this.props.only) {
	      this.setState({ disabled: val, className: (0, _classnamesDedupe2['default'])(this.state.className, { 'disabled': val }) });
	    }
	  }
	});
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/

	(function () {
		'use strict';

		var classNames = (function () {
			function _parseArray (resultSet, array) {
				var length = array.length;

				for (var i = 0; i < length; ++i) {
					_parse(resultSet, array[i]);
				}
			}

			function _parseNumber (resultSet, num) {
				resultSet[num] = true;
			}

			function _parseObject (resultSet, object) {
				for (var k in object) {
					if (object.hasOwnProperty(k)) {
						if (object[k]) {
							resultSet[k] = true;

						} else {
							delete resultSet[k];
						}
					}
				}
			}

			var SPACE = /\s+/;
			function _parseString (resultSet, str) {
				var array = str.split(SPACE);
				var length = array.length;

				for (var i = 0; i < length; ++i) {
					resultSet[array[i]] = true;
				}
			}

			function _parse (resultSet, arg) {
				if (!arg) return;
				var argType = typeof arg;

				// 'foo bar'
				if ('string' === argType) {
					_parseString(resultSet, arg);

				// ['foo', 'bar', ...]
				} else if (Array.isArray(arg)) {
					_parseArray(resultSet, arg);

				// { 'foo': true, ... }
				} else if ('object' === argType) {
					_parseObject(resultSet, arg);

				// '130'
				} else if ('number' === argType) {
					_parseNumber(resultSet, arg);
				}
			}

			function _classNames () {
				var classSet = {};
				_parseArray(classSet, arguments);

				var classes = '';
				for (var k in classSet) {
					classes += ' ' + k;
				}

				return classes.substr(1);
			}

			return _classNames;

		})();

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true){
			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}

	}());


/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.noop = noop;
	exports.predicate = predicate;
	exports.curry = curry;
	exports.uncurry = uncurry;
	exports.times = times;
	exports.once = once;
	exports.addClass = addClass;
	exports.removeClass = removeClass;
	exports.type = type;
	var toString = Object.prototype.toString;

	function noop() {}

	function predicate() {
	  return true;
	}

	function curry(func, binding) {
	  for (var _len = arguments.length, oargs = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    oargs[_key - 2] = arguments[_key];
	  }

	  return function () {
	    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      args[_key2] = arguments[_key2];
	    }

	    args = oargs.concat(args);
	    return Function.prototype.apply.call(func, binding, args);
	  };
	}

	function uncurry(func) {
	  for (var _len3 = arguments.length, oargs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	    oargs[_key3 - 1] = arguments[_key3];
	  }

	  return function (binding) {
	    for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	      args[_key4 - 1] = arguments[_key4];
	    }

	    args = oargs.concat(args);
	    return Function.prototype.apply.call(func, binding, args);
	  };
	}

	function times(count, func) {
	  for (var _len5 = arguments.length, others = Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
	    others[_key5 - 2] = arguments[_key5];
	  }

	  var c = 0;
	  return function () {
	    for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
	      args[_key6] = arguments[_key6];
	    }

	    var ret = [];
	    if (c < count) {
	      ret.push(func.apply(null, args));
	      c++;
	      // call others at the last time
	      if (c === count) {
	        for (var i = 0, l = others.length; i < l; i++) {
	          others[i].call(null, ret);
	        }
	      }
	    }
	  };
	}

	function once() {
	  for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
	    args[_key7] = arguments[_key7];
	  }

	  return curry(times, null, 1).apply(null, args);
	}

	function addClass(origin) {
	  if (type(origin) === 'string') {
	    for (var _len8 = arguments.length, names = Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
	      names[_key8 - 1] = arguments[_key8];
	    }

	    if (origin === '') return names.join(' ');

	    var classes = origin.split(/\s+/);
	    for (var i = 0, l = names.length; i < l; i++) {
	      if (classes.indexOf(names[i]) < 0) classes.push(names[i]);
	    }

	    return classes.join(' ');
	  }

	  return '';
	}

	function removeClass(origin) {
	  if (type(origin) === 'string') {
	    var classes = origin.split(/\s+/);

	    for (var _len9 = arguments.length, names = Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
	      names[_key9 - 1] = arguments[_key9];
	    }

	    for (var i = 0, l = names.length; i < l; i++) {
	      var index = classes.indexOf(names[i]);
	      if (index > -1) classes.splice(index, 1);
	    }

	    return classes.join(' ');
	  }

	  return '';
	}

	function type(obj) {
	  if (obj == null) return '' + obj; // null and undefined

	  var t = typeof obj;
	  if (t === 'object' || t === 'function') {
	    var m = /^\[object (\w+)\]$/.exec(toString.call(obj));
	    if (m && m[1]) return m[1].toLowerCase();else return 'unknown';
	  } else return t;
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	exports['default'] = _react2['default'].createClass({
	  displayName: 'portal',

	  propTypes: {
	    show: _react2['default'].PropTypes.bool,
	    children: _react2['default'].PropTypes.node,
	    container: _react2['default'].PropTypes.object // dom element
	  },
	  getDefaultProps: function getDefaultProps() {
	    return {
	      show: false
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    // render overlay here
	    this.componentDidUpdate({});
	  },
	  componentDidUpdate: function componentDidUpdate() {
	    if (!!this.props.show) {
	      this._mountContainer();
	    } else {
	      this._unmountContainer();
	    }
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    if (this._instance) this._unmountContainer();
	  },
	  render: function render() {
	    return null // do not render here
	    ;
	  },
	  _getContainerDOMNode: function _getContainerDOMNode() {
	    return this.props.container ? _react2['default'].findDOMNode(this.props.container) : document.body;
	  },
	  _getOverlay: function _getOverlay() {
	    return _react2['default'].Children.only(this.props.children);
	  },
	  _getOverlayDOMNode: function _getOverlayDOMNode() {
	    if (this._instance) {
	      return _react2['default'].findDOMNode(this._instance);
	    }

	    return null;
	  },
	  _mountContainer: function _mountContainer() {
	    if (!this._target) {
	      this._target = document.createElement('div');
	      this._getContainerDOMNode().appendChild(this._target);
	    }

	    this._instance = _react2['default'].render(this._getOverlay(), this._target);
	  },
	  _unmountContainer: function _unmountContainer() {
	    if (this._target) {
	      _react2['default'].unmountComponentAtNode(this._target);
	      this._instance = null;

	      this._getContainerDOMNode().removeChild(this._target);
	      this._target = null;
	    }
	  }
	});
	module.exports = exports['default'];
	// mount container and overlay
	// unmount container and overlay

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _lgutilDomKeycode = __webpack_require__(7);

	var _lgutilDomKeycode2 = _interopRequireDefault(_lgutilDomKeycode);

	var _lgutilDomEventListener = __webpack_require__(8);

	var _lgutilDomEventListener2 = _interopRequireDefault(_lgutilDomEventListener);

	var _lgutilDomContains = __webpack_require__(9);

	var _lgutilDomContains2 = _interopRequireDefault(_lgutilDomContains);

	var _portalJsx = __webpack_require__(5);

	var _portalJsx2 = _interopRequireDefault(_portalJsx);

	var _mixinsEvent = __webpack_require__(10);

	var _mixinsEvent2 = _interopRequireDefault(_mixinsEvent);

	var _util = __webpack_require__(4);

	var Modal = _react2['default'].createClass({
	  displayName: 'Modal',

	  mixins: [_mixinsEvent2['default']],
	  propTypes: {
	    backdrop: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.bool]),
	    width: _react.PropTypes.number,
	    backdropClassName: _react.PropTypes.string,
	    modalClassName: _react.PropTypes.string,
	    closable: _react.PropTypes.bool,
	    children: _react.PropTypes.node,
	    show: _react.PropTypes.bool,
	    onBackdropClick: _react.PropTypes.func
	  },
	  getDefaultProps: function getDefaultProps() {
	    return {
	      backdrop: true, // or 'static'
	      backdropClassName: 'modal-backdrop',
	      modalClassName: 'modal',
	      width: 400,
	      closable: true, // ESC will close
	      show: false
	    };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      left: 0
	    };
	  },
	  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	    // need not update if not visible
	    if (!this.props.show && !nextProps.show) return false;else return true;
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    // hide
	    if (this.props.show && !nextProps.show) {
	      this.clearAllEventListener();
	    }

	    // show
	    if (!this.props.show && nextProps.show) {
	      this.setState({ left: this._getCurrentLeft() });
	      this.listenEvent(window, 'resize', this._adjustPosition);
	      this.listenEvent(document, 'focus', this._handleFocus);
	    }
	  },
	  componentDidMount: function componentDidMount() {
	    // adjust position in browser
	    this._adjustPosition();
	  },
	  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
	    if (this.props.show && !prevProps.show) this._handleFocus();
	  },
	  render: function render() {
	    return _react2['default'].createElement(
	      _portalJsx2['default'],
	      { show: this.props.show },
	      _react2['default'].createElement(
	        'div',
	        { onKeyDown: this._handleKeyDown },
	        this._getBackdropElement(),
	        this._getModalElement()
	      )
	    );
	  },
	  _getBackdropElement: function _getBackdropElement() {
	    if (this.props.backdrop) {
	      return _react2['default'].createElement('div', { className: this.props.backdropClassName, onClick: this.props.onBackdropClick });
	    } else return null;
	  },
	  _getModalElement: function _getModalElement() {
	    return _react2['default'].createElement(
	      'div',
	      { ref: 'dialog', className: this.props.modalClassName, tabIndex: '0', style: { left: this.state.left, width: this.props.width } },
	      this.props.children
	    );
	  },
	  _getCurrentLeft: function _getCurrentLeft() {
	    var vpWidth = document.documentElement.clientWidth || document.body.clientWidth;
	    var mdWidth = this.props.width;

	    return vpWidth / 2 - mdWidth / 2;
	  },
	  _adjustPosition: function _adjustPosition() {
	    this.setState({ left: this._getCurrentLeft() });
	  },
	  _handleFocus: function _handleFocus() {
	    if (!this.isMounted()) return;

	    var active = document.activeElement;
	    var modal = _react2['default'].findDOMNode(this.refs.dialog);

	    if (modal && modal !== active && !(0, _lgutilDomContains2['default'])(modal, active)) {
	      modal.focus();
	    }
	  }
	});

	exports['default'] = Modal;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	var KeyCode = {
	  /**
	   * MAC_ENTER
	   */
	  MAC_ENTER: 3,
	  /**
	   * BACKSPACE
	   */
	  BACKSPACE: 8,
	  /**
	   * TAB
	   */
	  TAB: 9,
	  /**
	   * NUMLOCK on FF/Safari Mac
	   */
	  NUM_CENTER: 12, // NUMLOCK on FF/Safari Mac
	  /**
	   * ENTER
	   */
	  ENTER: 13,
	  /**
	   * SHIFT
	   */
	  SHIFT: 16,
	  /**
	   * CTRL
	   */
	  CTRL: 17,
	  /**
	   * ALT
	   */
	  ALT: 18,
	  /**
	   * PAUSE
	   */
	  PAUSE: 19,
	  /**
	   * CAPS_LOCK
	   */
	  CAPS_LOCK: 20,
	  /**
	   * ESC
	   */
	  ESC: 27,
	  /**
	   * SPACE
	   */
	  SPACE: 32,
	  /**
	   * PAGE_UP
	   */
	  PAGE_UP: 33, // also NUM_NORTH_EAST
	  /**
	   * PAGE_DOWN
	   */
	  PAGE_DOWN: 34, // also NUM_SOUTH_EAST
	  /**
	   * END
	   */
	  END: 35, // also NUM_SOUTH_WEST
	  /**
	   * HOME
	   */
	  HOME: 36, // also NUM_NORTH_WEST
	  /**
	   * LEFT
	   */
	  LEFT: 37, // also NUM_WEST
	  /**
	   * UP
	   */
	  UP: 38, // also NUM_NORTH
	  /**
	   * RIGHT
	   */
	  RIGHT: 39, // also NUM_EAST
	  /**
	   * DOWN
	   */
	  DOWN: 40, // also NUM_SOUTH
	  /**
	   * PRINT_SCREEN
	   */
	  PRINT_SCREEN: 44,
	  /**
	   * INSERT
	   */
	  INSERT: 45, // also NUM_INSERT
	  /**
	   * DELETE
	   */
	  DELETE: 46, // also NUM_DELETE
	  /**
	   * ZERO
	   */
	  ZERO: 48,
	  /**
	   * ONE
	   */
	  ONE: 49,
	  /**
	   * TWO
	   */
	  TWO: 50,
	  /**
	   * THREE
	   */
	  THREE: 51,
	  /**
	   * FOUR
	   */
	  FOUR: 52,
	  /**
	   * FIVE
	   */
	  FIVE: 53,
	  /**
	   * SIX
	   */
	  SIX: 54,
	  /**
	   * SEVEN
	   */
	  SEVEN: 55,
	  /**
	   * EIGHT
	   */
	  EIGHT: 56,
	  /**
	   * NINE
	   */
	  NINE: 57,
	  /**
	   * QUESTION_MARK
	   */
	  QUESTION_MARK: 63, // needs localization
	  /**
	   * A
	   */
	  A: 65,
	  /**
	   * B
	   */
	  B: 66,
	  /**
	   * C
	   */
	  C: 67,
	  /**
	   * D
	   */
	  D: 68,
	  /**
	   * E
	   */
	  E: 69,
	  /**
	   * F
	   */
	  F: 70,
	  /**
	   * G
	   */
	  G: 71,
	  /**
	   * H
	   */
	  H: 72,
	  /**
	   * I
	   */
	  I: 73,
	  /**
	   * J
	   */
	  J: 74,
	  /**
	   * K
	   */
	  K: 75,
	  /**
	   * L
	   */
	  L: 76,
	  /**
	   * M
	   */
	  M: 77,
	  /**
	   * N
	   */
	  N: 78,
	  /**
	   * O
	   */
	  O: 79,
	  /**
	   * P
	   */
	  P: 80,
	  /**
	   * Q
	   */
	  Q: 81,
	  /**
	   * R
	   */
	  R: 82,
	  /**
	   * S
	   */
	  S: 83,
	  /**
	   * T
	   */
	  T: 84,
	  /**
	   * U
	   */
	  U: 85,
	  /**
	   * V
	   */
	  V: 86,
	  /**
	   * W
	   */
	  W: 87,
	  /**
	   * X
	   */
	  X: 88,
	  /**
	   * Y
	   */
	  Y: 89,
	  /**
	   * Z
	   */
	  Z: 90,
	  /**
	   * META
	   */
	  META: 91, // WIN_KEY_LEFT
	  /**
	   * WIN_KEY_RIGHT
	   */
	  WIN_KEY_RIGHT: 92,
	  /**
	   * CONTEXT_MENU
	   */
	  CONTEXT_MENU: 93,
	  /**
	   * NUM_ZERO
	   */
	  NUM_ZERO: 96,
	  /**
	   * NUM_ONE
	   */
	  NUM_ONE: 97,
	  /**
	   * NUM_TWO
	   */
	  NUM_TWO: 98,
	  /**
	   * NUM_THREE
	   */
	  NUM_THREE: 99,
	  /**
	   * NUM_FOUR
	   */
	  NUM_FOUR: 100,
	  /**
	   * NUM_FIVE
	   */
	  NUM_FIVE: 101,
	  /**
	   * NUM_SIX
	   */
	  NUM_SIX: 102,
	  /**
	   * NUM_SEVEN
	   */
	  NUM_SEVEN: 103,
	  /**
	   * NUM_EIGHT
	   */
	  NUM_EIGHT: 104,
	  /**
	   * NUM_NINE
	   */
	  NUM_NINE: 105,
	  /**
	   * NUM_MULTIPLY
	   */
	  NUM_MULTIPLY: 106,
	  /**
	   * NUM_PLUS
	   */
	  NUM_PLUS: 107,
	  /**
	   * NUM_MINUS
	   */
	  NUM_MINUS: 109,
	  /**
	   * NUM_PERIOD
	   */
	  NUM_PERIOD: 110,
	  /**
	   * NUM_DIVISION
	   */
	  NUM_DIVISION: 111,
	  /**
	   * F1
	   */
	  F1: 112,
	  /**
	   * F2
	   */
	  F2: 113,
	  /**
	   * F3
	   */
	  F3: 114,
	  /**
	   * F4
	   */
	  F4: 115,
	  /**
	   * F5
	   */
	  F5: 116,
	  /**
	   * F6
	   */
	  F6: 117,
	  /**
	   * F7
	   */
	  F7: 118,
	  /**
	   * F8
	   */
	  F8: 119,
	  /**
	   * F9
	   */
	  F9: 120,
	  /**
	   * F10
	   */
	  F10: 121,
	  /**
	   * F11
	   */
	  F11: 122,
	  /**
	   * F12
	   */
	  F12: 123,
	  /**
	   * NUMLOCK
	   */
	  NUMLOCK: 144,
	  /**
	   * SEMICOLON
	   */
	  SEMICOLON: 186, // needs localization
	  /**
	   * DASH
	   */
	  DASH: 189, // needs localization
	  /**
	   * EQUALS
	   */
	  EQUALS: 187, // needs localization
	  /**
	   * COMMA
	   */
	  COMMA: 188, // needs localization
	  /**
	   * PERIOD
	   */
	  PERIOD: 190, // needs localization
	  /**
	   * SLASH
	   */
	  SLASH: 191, // needs localization
	  /**
	   * APOSTROPHE
	   */
	  APOSTROPHE: 192, // needs localization
	  /**
	   * SINGLE_QUOTE
	   */
	  SINGLE_QUOTE: 222, // needs localization
	  /**
	   * OPEN_SQUARE_BRACKET
	   */
	  OPEN_SQUARE_BRACKET: 219, // needs localization
	  /**
	   * BACKSLASH
	   */
	  BACKSLASH: 220, // needs localization
	  /**
	   * CLOSE_SQUARE_BRACKET
	   */
	  CLOSE_SQUARE_BRACKET: 221, // needs localization
	  /**
	   * WIN_KEY
	   */
	  WIN_KEY: 224,
	  /**
	   * MAC_FF_META
	   */
	  MAC_FF_META: 224, // Firefox (Gecko) fires this for the meta key instead of 91
	  /**
	   * WIN_IME
	   */
	  WIN_IME: 229
	}

	/*
	 whether text and modified key is entered at the same time.
	 */
	KeyCode.isTextModifyingKeyEvent = function (e) {
	  var keyCode = e.keyCode
	  if (e.altKey && !e.ctrlKey || e.metaKey ||
	      // Function keys don't generate text
	    keyCode >= KeyCode.F1 && keyCode <= KeyCode.F12) {
	    return false
	  }

	  // The following keys are quite harmless, even in combination with
	  // CTRL, ALT or SHIFT.
	  switch (keyCode) {
	  case KeyCode.ALT:
	  case KeyCode.CAPS_LOCK:
	  case KeyCode.CONTEXT_MENU:
	  case KeyCode.CTRL:
	  case KeyCode.DOWN:
	  case KeyCode.END:
	  case KeyCode.ESC:
	  case KeyCode.HOME:
	  case KeyCode.INSERT:
	  case KeyCode.LEFT:
	  case KeyCode.MAC_FF_META:
	  case KeyCode.META:
	  case KeyCode.NUMLOCK:
	  case KeyCode.NUM_CENTER:
	  case KeyCode.PAGE_DOWN:
	  case KeyCode.PAGE_UP:
	  case KeyCode.PAUSE:
	  case KeyCode.PRINT_SCREEN:
	  case KeyCode.RIGHT:
	  case KeyCode.SHIFT:
	  case KeyCode.UP:
	  case KeyCode.WIN_KEY:
	  case KeyCode.WIN_KEY_RIGHT:
	    return false
	  default:
	    return true
	  }
	}

	/*
	 whether character is entered.
	 */
	KeyCode.isCharacterKey = function (keyCode) {
	  if (keyCode >= KeyCode.ZERO &&
	    keyCode <= KeyCode.NINE) {
	    return true
	  }

	  if (keyCode >= KeyCode.NUM_ZERO &&
	    keyCode <= KeyCode.NUM_MULTIPLY) {
	    return true
	  }

	  if (keyCode >= KeyCode.A &&
	    keyCode <= KeyCode.Z) {
	    return true
	  }

	  // Safari sends zero key code for non-latin characters.
	  if (window.navigator.userAgent.indexOf('WebKit') !== -1 && keyCode === 0) {
	    return true
	  }

	  switch (keyCode) {
	  case KeyCode.SPACE:
	  case KeyCode.QUESTION_MARK:
	  case KeyCode.NUM_PLUS:
	  case KeyCode.NUM_MINUS:
	  case KeyCode.NUM_PERIOD:
	  case KeyCode.NUM_DIVISION:
	  case KeyCode.SEMICOLON:
	  case KeyCode.DASH:
	  case KeyCode.EQUALS:
	  case KeyCode.COMMA:
	  case KeyCode.PERIOD:
	  case KeyCode.SLASH:
	  case KeyCode.APOSTROPHE:
	  case KeyCode.SINGLE_QUOTE:
	  case KeyCode.OPEN_SQUARE_BRACKET:
	  case KeyCode.BACKSLASH:
	  case KeyCode.CLOSE_SQUARE_BRACKET:
	    return true
	  default:
	    return false
	  }
	}

	module.exports = KeyCode


/***/ },
/* 8 */
/***/ function(module, exports) {

	if (typeof document === 'undefined') module.exports = {}
	else {
	  var ie = !document.addEventListener
	  var addEventMethod = ie ? 'attachEvent': 'addEventListener'
	  var removeEventMethod = ie ? 'detachEvent': 'removeEventListener'

	  var currentFocusListener

	  module.exports = {
	    listen: function (target, eventType, callback) {
	      /**
	       * Firefox doesn't have a focusin event so using capture is easiest way to get bubbling
	       * IE8 can't do addEventListener, but does have onfocusin, so we use that in ie8
	       *
	       * We only allow one Listener at a time to avoid stack overflows
	       */
	      if (eventType === 'focus') {
	        var remove
	        if (currentFocusListener) currentFocusListener.remove()

	        if (ie) {
	          document.attachEvent('onfocusin', callback)
	          remove = function () { document.detachEvent('onfocusin', callback) }
	        }
	        else { // chrome/ff, use event capture to simulate this event
	          document.addEventListener('focus', callback, true)
	          remove = function () { document.removeEventListener('focus', callback, true) }
	        }

	        currentFocusListener = { remove: remove }

	        return currentFocusListener
	      }

	      // common way
	      eventType = ie ? 'on' + eventType : eventType
	      target[addEventMethod](eventType, callback, false)

	      return {
	        remove: function () {
	          target[removeEventMethod](eventType, callback, false)
	        }
	      }
	    }
	  }
	}


/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * Cross browser .contains() polyfill
	 * @param  {HTMLElement} elem
	 * @param  {HTMLElement} inner
	 * @return {bool}
	 */

	module.exports = function contains (elem, inner) {
	  function ie8Contains (root, node) {
	    while (node) {
	      if (node === root) {
	        return true
	      }
	      node = node.parentNode
	    }
	    return false
	  }

	  return (elem && elem.contains)
	      ? elem.contains(inner)
	      : (elem && elem.compareDocumentPosition)
	          ? elem === inner || !!(elem.compareDocumentPosition(inner) & 16)
	          : ie8Contains(elem, inner)
	}


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _lgutilDomEventListener = __webpack_require__(8);

	var _lgutilDomEventListener2 = _interopRequireDefault(_lgutilDomEventListener);

	exports['default'] = {
	  listenEvent: function listenEvent(target, eventType, callback) {
	    this._events ? this._events.push(_lgutilDomEventListener2['default'].listen(target, eventType, callback)) : this._events = [_lgutilDomEventListener2['default'].listen(target, eventType, callback)];

	    return this._events[this._events.length - 1];
	  },
	  clearAllEventListener: function clearAllEventListener() {
	    this._events && (this._events.forEach(function (e) {
	      return e.remove();
	    }), this._events = []);
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    this.clearAllEventListener();
	  }
	};
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;