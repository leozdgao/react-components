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
    return (
      <Portal>
        <div>
          {this.props.backdrop ? <div className={this.props.backdropClassName}></div> : null}
          <div className={this.props.modalClassName}>
            {this.props.children}
          </div>
        </div>
      </Portal>
    );
  }
});

export default Modal;
