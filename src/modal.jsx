import React from 'react';
import keyCode from 'lgutil/dom/keycode';
import eventListener from 'lgutil/dom/eventListener';
import contains from 'lgutil/dom/contains';
import Portal from './portal.jsx';
import EventListener from './mixins/event';
import {noop, curry} from './util';

var Modal = React.createClass({
  mixins: [EventListener],
  getDefaultProps () {
    return {
      backdrop: true, // or 'static'
      backdropClassName: 'modal-backdrop',
      modalClassName: 'modal',
      width: 400,
      closable: true
    };
  },
  getInitialState () {
    return {
      show: false
    };
  },
  shouldComponentUpdate (nextProps, nextState) { // need not update if not visible
    if(!this.state.show && !nextState.show) return false;
    else return true;
  },
  componentDidMount () {
    this._adjustPosition();
  },
  componentDidUpdate: function(prevProps, prevState) {
    if(this.state.show && !prevState.show) React.findDOMNode(this.refs.dialog).focus();
  },
  render () {
    return (
      <Portal show={this.state.show}>
        <div onKeyDown={this._handleKeyDown}>
          {this._getBackdropElement()}
          {this._getModalElement()}
        </div>
      </Portal>
    );
  },
  show () {
    if(this.isMounted()) this.setState({show: true});

    this.listenEvent(window, 'resize', this._adjustPosition);
    this.listenEvent(document, 'focus', this._handleFocus);
  },
  hide () {
    if(this.isMounted()) this.setState({show: false});
    this.clearAllEventListener();
  },
  _getBackdropElement () {
    if(this.props.backdrop) {
      return (
        <div className={this.props.backdropClassName} onClick={this._handleBackdropClick}></div>
      );
    }
    else return null;
  },
  _getModalElement () {
    return (
      <div ref="dialog" className={this.props.modalClassName} tabIndex="0" style={{left: this.state.left, width: this.props.width}}>
        {this.props.children}
      </div>
    );
  },
  _handleBackdropClick () {
    if(this.props.backdrop && this.props.backdrop != 'static') {
      this.hide();
    }
  },
  _adjustPosition () {
    let vpWidth = document.documentElement.clientWidth || document.body.clientWidth;
    let mdWidth = this.props.width;
    this.setState({left: vpWidth / 2 - mdWidth / 2});
  },
  _handleKeyDown (e) {
    if(this.props.closable && e.keyCode == keyCode.ESC) {
      this.hide();
    }
  },
  _handleFocus (e) {
    if (!this.isMounted()) {
      return;
    }

    let active = document.activeElement;
    let modal = React.findDOMNode(this.refs.dialog);

    if (modal && modal !== active && !contains(modal, active)){ console.log('focus');
      modal.focus();
    }
  }
});

export default Modal;
