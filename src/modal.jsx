import React from 'react';
import Portal from './portal.jsx';
import {noop, curry} from './util';

var Modal = React.createClass({
  getDefaultProps: function() {
    return {
      backdrop: true,
      backdropClassName: 'modal-backdrop',
      modalClassName: 'modal',
      width: 400,
      closable: true
    };
  },
  getInitialState: function() {
    return {
      show: false
    };
  },
  componentDidMount: function() {
    this._adjustPosition();
    this.close = this.props.onClose;

    window.addEventListener('resize', this._adjustPosition);
  },
  componentWillUnmount: function() {
    window.removeEventListener('resize', this._adjustPosition);
  },
  render () {
    let modal = (
      <div className={this.props.modalClassName} style={{left: this.state.left}}>
        {this.props.children}
      </div>
    );

    return (
      <Portal show={this.state.show}>
        {this.props.backdrop ? (
          <div>
            <div className={this.props.backdropClassName} onClick={this._handleBackdropClick}></div>
            {modal}
          </div>
        ): modal}
      </Portal>
    );
  },
  show () {
    this.setState({show: true});
  },
  hide () {
    this.setState({show: false});
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
  }
});

export default Modal;
