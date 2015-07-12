var React = require('react/addons');
var ActionButton = require('../src/actionButton.jsx');
var TestUtils = React.addons.TestUtils;

jest.dontMock('../src/actionButton.jsx');
describe('Test component: ActionButton', function() {
  it('take children as text', function() {
    var text = 'Submit', com = TestUtils.renderIntoDocument(
      <ActionButton>{text}</ActionButton>
    );
    var button = TestUtils.findRenderedDOMComponentWithTag(com, 'button');
    expect(button.getDOMNode().textContent).toEqual(text);
  });
});
