import React from 'react/addons';
import Portal from '../src/portal.jsx';
let TestUtils = React.addons.TestUtils;

describe('Test portal component', () => {
  let TestPortal = React.createClass({
    render () {
      return (
        <div>
          <Portal {...this.props} ref="p">
            {this.props.overlay}
          </Portal>
        </div>
      );
    },
    getPortalDOMNode () {
      return this.refs.p._getOverlayDOMNode();
    }
  }), instance;
  afterEach(() => {
    // unmount test component
    if(instance && TestUtils.isCompositeComponent(instance) && instance.isMounted()) {
      React.unmountComponentAtNode(React.findDOMNode(instance));
    }
  });
  it('only take first children as overlay', () => {
    instance = TestUtils.renderIntoDocument(
      <TestPortal show={true} overlay={<h2>Test</h2>}></TestPortal>
    );
    let dom = instance.getPortalDOMNode();
    expect(dom.tagName).toEqual('H2');
    expect(dom.textContent).toEqual('Test');
  });
  it('will unmount if property show is false', () => {
    instance = TestUtils.renderIntoDocument(
      <TestPortal show={false} overlay={<h2>Test</h2>}></TestPortal>
    );
    let dom = instance.getPortalDOMNode();
    expect(dom).toEqual(null);
  });
});
