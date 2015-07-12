import React from 'react';
import {addClass, removeClass, once, type} from './util';

let noop = () => {};
let predicate = () => { return true; };

export default React.createClass({
  propTypes: {
    action: React.PropTypes.oneOfType([
      React.PropTypes.func,
      React.PropTypes.object
    ]),
    onResolving: React.PropTypes.func,
    onResolved: React.PropTypes.func,
    onError: React.PropTypes.func
  },
  getDefaultProps: function() {
    return {
      action: noop,
      onResolving: predicate,
      onResolved: noop,
      onError: noop
    };
  },
  getInitialState: function() {
    return {
      className: this.props.className || '',
      disabled: false
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
  _handleClick (e) {
    // invoke onResolving before action, the action can be canceled if onResolving return false
    if(!this.state.disabled && this.props.onResolving()) {
      // add class
      this.setState({className: addClass(this.state.className, 'loading')});

      // declare
      let action = this.props.action,
        rmLoadingClass = () => {
          this.setState({className: removeClass(this.state.className, 'loading')});
        },
        onResolved = once(this.props.onResolved, rmLoadingClass),
        onError = once(this.props.onError, rmLoadingClass),
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
        if(type(action) == 'object' && type(action.then) == 'function') { // action is promise
          action.then.call(action, onResolved, onError);
        }
        else { // it is a sync action
          let ret = action.call(null, e);
          onResolved.call(null, ret);
        }
      }
    }
  }
});
