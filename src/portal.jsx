import React from 'react';

export default React.createClass({
  propTypes: {
    show: React.PropTypes.bool,
    container: React.PropTypes.object // dom element
  },
  getDefaultProps: function() {
    return {
      show: false
    };
  },
  componentDidMount: function() {
    // render overlay here
    this._triggerByProps(this.props);
  },
  componentWillReceiveProps: function(nextProps) {
    this._triggerByProps(nextProps);
  },
  render () {
    return null; // do not render here
  },
  _getContainerDOMNode () {
    if(!this._container) {
      if(this.props.container) this._container = React.findDOMNode(this.props.container);
      else {
        this._container = document.createElement('div');

        let dom = React.findDOMNode(this), docElem = dom ? dom.ownerDocument : document;
        docElem.body.appendChild(this._container);
      }
    }

    return this._container;
  },
  _getOverlay () {
    return React.Children.only(this.props.children);
  },
  _getOverlayDOMNode () {
    if(this._instance) {
      return React.findDOMNode(this._instance);
    }

    return null;
  },
  _triggerByProps (props) {
    if(props.show) {
      this._mountContainer(); // mount container and overlay
    }
    else {
      this._unmountContainer(); // unmount container and overlay
    }
  },
  _mountContainer () {
    this._instance = React.render(this._getOverlay(), this._getContainerDOMNode());
  },
  _unmountContainer () {
    if(this._container) {
      React.unmountComponentAtNode(this._getContainerDOMNode());
      this._instance = null;
    }
  }
});
