import React from 'react'

export default React.createClass({
  propTypes: {
    show: React.PropTypes.bool,
    children: React.PropTypes.node,
    container: React.PropTypes.object // dom element
  },
  getDefaultProps () {
    return {
      show: false
    }
  },
  componentDidMount () {
    // render overlay here
    this.componentDidUpdate({})
  },
  componentDidUpdate () {
    if (!!this.props.show) {
      this._mountContainer() // mount container and overlay
    }
    else {
      this._unmountContainer() // unmount container and overlay
    }
  },
  componentWillUnmount () {
    if (this._instance) this._unmountContainer()
  },
  render () {
    return null // do not render here
  },
  _getContainerDOMNode () {
    return this.props.container ? React.findDOMNode(this.props.container): document.body
  },
  _getOverlay () {
    return React.Children.only(this.props.children)
  },
  _getOverlayDOMNode () {
    if (this._instance) {
      return React.findDOMNode(this._instance)
    }

    return null
  },
  _mountContainer () {
    if (!this._target) {
      this._target = document.createElement('div')
      this._getContainerDOMNode().appendChild(this._target)
    }

    this._instance = React.render(this._getOverlay(), this._target)
  },
  _unmountContainer () {
    if (this._target) {
      React.unmountComponentAtNode(this._target)
      this._instance = null

      this._getContainerDOMNode().removeChild(this._target)
      this._target = null
    }
  }
})
