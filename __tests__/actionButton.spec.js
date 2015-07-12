var React = require('react/addons');
var Promise = require('promise');
var ActionButton = require('../src/actionButton.jsx');
var TestUtils = React.addons.TestUtils;

jest.dontMock('../src/actionButton.jsx');

var text = 'Submit', com, button;
describe('Test component: ActionButton', function() {
  it('take children as text', function() {
    com = TestUtils.renderIntoDocument(
      <ActionButton>{text}</ActionButton>
    );
    button = TestUtils.findRenderedDOMComponentWithTag(com, 'button');
    expect(button.getDOMNode().textContent).toEqual(text); // assert here
  });
  it('execute a sync action', function() {
    var action = function(e) {
      temp = e.value;
    }, temp;
    com = TestUtils.renderIntoDocument(
      <ActionButton action={action}>{text}</ActionButton>
    );
    button = TestUtils.findRenderedDOMComponentWithTag(com, 'button');
    TestUtils.Simulate.click(button, {value: text});
    expect(temp).toEqual(text); // assert here
  });
  it('execute an async action with callback', function() {
    var action = function(e, callback) {
      setTimeout(function() {
        callback(null, text, 1);
      }, 200);
    };
    assertAsyncAction(action, text, 1);
  });
  it.only('accept an action as a promise', function() {
    var action = new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(text);
      }, 200);
    });
    assertAsyncAction(action, text);
  });
});

function assertAsyncAction(action, ...args) {
  var handleResolved = (...oargs) => {
    oargs.forEach((val, i) => {
      expect(val).toEqual(args[i]);
    });
  };
  com = TestUtils.renderIntoDocument(
    <ActionButton onResolved={handleResolved} action={action}>{text}</ActionButton>
  );
  button = TestUtils.findRenderedDOMComponentWithTag(com, 'button');

  TestUtils.Simulate.click(button, {value: text});

  jest.runAllTimers(); // let the timers work
}
