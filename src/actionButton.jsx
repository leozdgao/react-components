import React from 'react'
import cNames from 'classnames/dedupe'
import { once, type, noop, predicate, curry } from './util'

const T = React.PropTypes

export default React.createClass({
  // define property types here
  propTypes: {
    className: T.string,
    action: T.oneOfType([
      T.func, T.object
    ]),
    disabled: T.bool,
    onResolving: T.func,
    onResolved: T.func,
    onError: T.func,
    onFinish: T.func,
    only: T.bool,
    children: T.node
  },
  getDefaultProps () {
    return {
      action: noop,
      onResolving: predicate,
      onResolved: noop,
      onError: noop,
      only: true // disabled button when action is executing, if false, it will handled by property
    }
  },
  // handle disable property
  componentWillReceiveProps (nextProps) {
    if (nextProps.disabled !== this.state.disabled) {
      this.setState({ disabled: nextProps.disabled })
    }
  },
  getInitialState () {
    return {
      className: this.props.className || '',
      disabled: this.props.disabled || false
    }
  },
  render () {
    return (
      <button className={this.state.className} onClick={this._handleClick}
        disabled={this.state.disabled ? 'disabled': null}>
        {this.props.children}
      </button>
    )
  },
  // handle click event here
  _handleClick (e) {
    // invoke onResolving before action, the action can be canceled if onResolving return false
    if (!this.state.disabled && this.props.onResolving() !== false) {
      // set disable if set only to true
      this._setDisableWhenOnly(true)
      // add class
      this.setState({ className: cNames(this.state.className, 'loading') })

      // declare
      const action = this.props.action,
        rmLoadingClass = () => {
          this.setState({ className: cNames(this.state.className, { 'loading': false }) })
        },
        setDisable = curry(this._setDisableWhenOnly, this, false),
        onFinish = () => { setTimeout(() => { const func = this.props.onFinish || noop; func() }, 0) },
        onResolved = once(this.props.onResolved, rmLoadingClass, setDisable, onFinish),
        onError = once(this.props.onError, rmLoadingClass, setDisable, onFinish),
        callback = (err, ...args) => {
          if (err) onError.call(null, err)
          else {
            onResolved.apply(null, args)
          }
        }

      if (action.length > 1) { // callback as second parameter
        action.call(null, e, callback)
      }
      else {
        if (type(action.then) === 'function') { // action is promise
          action.then.call(action, onResolved, onError)
        }
        else { // it is a sync action
          const ret = action.call(null, e)
          if (ret && type(ret.then) === 'function') ret.then.call(ret, onResolved, onError)
          else onResolved.call(null, ret)
        }
      }
    }
  },
  _setDisableWhenOnly (val) {
    if (this.props.only) {
      this.setState({ disabled: val, className: cNames(this.state.className, { 'disabled': val }) })
    }
  }
})
