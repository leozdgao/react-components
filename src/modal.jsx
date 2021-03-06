import React, { PropTypes } from 'react'
import keyCode from 'lgutil/dom/keycode'
import eventListener from 'lgutil/dom/eventListener'
import contains from 'lgutil/dom/contains'
import Portal from './portal.jsx'
import EventListener from './mixins/event'
import { noop, curry } from './util'

const Modal = React.createClass({
  mixins: [ EventListener ],
  propTypes: {
    backdrop: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    width: PropTypes.number,
    backdropClassName: PropTypes.string,
    modalClassName: PropTypes.string,
    closable: PropTypes.bool,
    children: PropTypes.node,
    show: PropTypes.bool,
    onBackdropClick: PropTypes.func
  },
  getDefaultProps () {
    return {
      backdrop: true, // or 'static'
      backdropClassName: 'modal-backdrop',
      modalClassName: 'modal',
      width: 400,
      closable: true, // ESC will close
      show: false
    }
  },
  getInitialState () {
    return {
      left: 0
    }
  },
  shouldComponentUpdate (nextProps, nextState) { // need not update if not visible
    if (!this.props.show && !nextProps.show) return false
    else return true
  },
  componentWillReceiveProps (nextProps) {
    // hide
    if (this.props.show && !nextProps.show) {
      this.clearAllEventListener()
    }

    // show
    if (!this.props.show && nextProps.show) {
      this.setState({ left: this._getCurrentLeft() })
      this.listenEvent(window, 'resize', this._adjustPosition)
      this.listenEvent(document, 'focus', this._handleFocus)
    }
  },
  componentDidMount () {
    // adjust position in browser
    this._adjustPosition()
  },
  componentDidUpdate (prevProps, prevState) {
    if (this.props.show && !prevProps.show) this._handleFocus()
  },
  render () {
    return (
      <Portal show={this.props.show}>
        <div onKeyDown={this._handleKeyDown}>
          {this._getBackdropElement()}
          {this._getModalElement()}
        </div>
      </Portal>
    )
  },
  _getBackdropElement () {
    if (this.props.backdrop) {
      return (
        <div className={this.props.backdropClassName} onClick={this.props.onBackdropClick}></div>
      )
    }
    else return null
  },
  _getModalElement () {
    return (
      <div ref="dialog" className={this.props.modalClassName} tabIndex="0" style={{ left: this.state.left, width: this.props.width }}>
        {this.props.children}
      </div>
    )
  },
  _getCurrentLeft () {
    const vpWidth = document.documentElement.clientWidth || document.body.clientWidth
    const mdWidth = this.props.width

    return vpWidth / 2 - mdWidth / 2
  },
  _adjustPosition () {
    this.setState({ left: this._getCurrentLeft() })
  },
  _handleFocus () {
    if (!this.isMounted()) return

    const active = document.activeElement
    const modal = React.findDOMNode(this.refs.dialog)

    if (modal && modal !== active && !contains(modal, active)) {
      modal.focus()
    }
  }
})

export default Modal
