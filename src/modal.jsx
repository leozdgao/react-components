import React from 'react';
import ActionButton from './actionButton.jsx';
import {noop, curry} from './util';

let container;

export function showModal(content, props, container) {
  if(!container) container = getDefaultContainer();
  let closing = props.onClose;
  props.onClose = (...args) => {
    if(closing) closing(...args);
    // unmount
    React.unmountComponentAtNode(container);
  };

  return React.render(<Modal {...props}>{content}</Modal>, container);
}

export function getDefaultContainer() {
  if(!container) {
    container = document.createElement('div');
    document.body.appendChild(container);
  }

  return container;
}

var Modal = React.createClass({
  getDefaultProps: function() {
    return {
      backdrop: true,
      title: 'Prompt',
      type: 'alert', // alert, confirm (decide btn group)
      width: 400,
      onClose: noop, // callback when action on button is resolved
      confirmAction: noop, // action on confirm button
      cancelAction: noop, // action on cancel button
      closable: true
    };
  },
  getInitialState: function() {
    return {
      visible: false,
      message: ''
      // left, set when component did mount
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
      <div className="modal">
        {this.props.backdrop ? <div className="backdrop" onClick={this.props.closable ? this._onCancel: null}></div>: null}
        <div className="modal-container" style={{width: this.props.width, left: this.state.left}}>
          <div className="modal-title">{this.props.title}</div>
          <div className="modal-content">{this.props.children}</div>
          {this._getFooter()}
        </div>
      </div>
    );
  },
  setMessage (msg) {
    this.setState({message: msg});
  },
  _adjustPosition () {
    let vpWidth = document.documentElement.clientWidth || document.body.clientWidth;
    let mdWidth = this.props.width;
    this.setState({left: vpWidth / 2 - mdWidth / 2});
  },
  _onConfirm () {
    this.setState({message: ''});
    let confirm = this.props.onConfirm();
    if(confirm && confirm.then) { // promise
      confirm.then(() => {
        this.props.onClose(true);
      })
      .catch((e)=> {
        this.setState({message: 'Request failed.'});
      });
    }
    else {
      this.props.onClose(true);
    }
  },
  _onCancel() {
    this.props.onCancel();
    this.props.onClose(false);
  },
  _getFooter () {
    switch (this.props.type) {
      case 'alert':
        return (
          <div className="modal-footer">
            <span className="help-text err">{this.state.message}</span>
            <ActionButton className="btn primary" action={this.props.confirmAction} onResolving={curry(this.setMessage, this, '')} onResolved={this.props.onClose}>Confirm</ActionButton>
          </div>
        );
      case 'confirm':
        return (
          <div className="modal-footer">
            <span className="help-text err">{this.state.message}</span>
            <ActionButton className="btn sm primary" action={this.props.confirmAction} onResolving={curry(this.setMessage, this, '')} onResolved={this.props.onClose}>Confirm</ActionButton>
            <ActionButton className="btn sm default" action={this.props.cancelAction} onResolved={this.props.onClose}>Cancel</ActionButton>
          </div>
        );
      default: return null;
    }
  }
});

export default Modal;
