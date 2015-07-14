import React from 'react/addons';
import Portal from '../src/portal.jsx';
let TestUtils = React.addons.TestUtils;

describe('Test portal component', () => {
  let TestPortal = React.createClass({
    render () {
      return (
        <div>
          <Portal ref="p">
            {this.props.overlay}
          </Portal>
        </div>
      );
    },
    getPortalDOMNode () {
      return React.findDOMNode(this.refs.p);
    }
  });
  it('only take first children as overlay', () => {
    let com = TestUtils.renderIntoDocument((
      <TestPortal overlay={<div>Test</div>}></TestPortal>
    ));
    let dom = com.getPortalDOMNode().querySelector('div');
    expect(dom.textContent).toEqual('Test');
  });
});
