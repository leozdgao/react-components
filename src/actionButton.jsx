import React from 'react';
import cNames from 'classnames/dedupe';
import {once, type, noop, predicate, curry} from './util';

export default React.createClass({
  // define property types here
  propTypes: {
    action: React.PropTypes.oneOfType([
      React.PropTypes.func,
      React.PropTypes.object
    ]),
    onResolving: React.PropTypes.func,
    onResolved: React.PropTypes.func,
    onError: React.PropTypes.func,
    only: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      action: noop,
      onResolving: predicate,
      onResolved: noop,
      onError: noop,
      only: true // disabled button when action is executing, if false, it will handled by property
    };
  },
  // handle disable property
  componentWillReceiveProps: function(nextProps) {
    if(nextProps.disabled != this.state.disabled) {
      this.setState({disabled: nextProps.disabled});
    }
  },
  getInitialState: function() {
    return {
      className: this.props.className || '',
      disabled: this.props.disabled || false
    };
  },
  render () {
    return (
      <button className={this.state.className} onClick={this._handleClick}
        disabled={this.state.disabled ? 'disabled': null}>
        {this.props.children}
      </button>
    );
  },
  // handle click event here
  _handleClick (e) {
    // invoke onResolving before action, the action can be canceled if onResolving return false
    if(!this.state.disabled && this.props.onResolving() !== false) {
      // set disable if set only to true
      this._setDisableWhenOnly(true);
      // add class
      this.setState({className: cNames(this.state.className, 'loading')});

      // declare
      let action = this.props.action,
        rmLoadingClass = () => {
          this.setState({className: cNames(this.state.className, {'loading': false})});
        },
        setDisable = curry(this._setDisableWhenOnly, this, false);
        onResolved = once(this.props.onResolved, rmLoadingClass, setDisable),
        onError = once(this.props.onError, rmLoadingClass, setDisable),
        callback = (err, ...args) => {
          if(err) onError.call(null, err);
          else {
            onResolved.apply(null, args);
          }
        };

      if(action.length > 1) { // callback as second parameter
        action.call(null, e, callback);
      }
      else {
        if(type(action.then) == 'function') { // action is promise
          action.then.call(action, onResolved, onError);
        }
        else { // it is a sync action
          let ret = action.call(null, e);
          if(type(ret.then) == 'function')
            ret.then.call(ret, onResolved, onError);
          else {
            onResolved.call(null, ret);
          }
        }
      }
    }
  },
  _setDisableWhenOnly (val) {
    if(this.props.only) {
      this.setState({disabled: val, className: cNames(this.state.className, {'disabled': val})});
    }
  }
});
