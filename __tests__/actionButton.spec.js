import React from 'react/addons';
import Promise from 'promise';
import ActionButton from '../src/actionButton.jsx';
let TestUtils = React.addons.TestUtils;

jest.dontMock('../src/actionButton.jsx');

let text = 'Submit', com, button;
describe('Test component: ActionButton', () => {
  it('take children as text', () => {
    com = TestUtils.renderIntoDocument(
      <ActionButton>{text}</ActionButton>
    );
    button = TestUtils.findRenderedDOMComponentWithTag(com, 'button');
    expect(button.getDOMNode().textContent).toEqual(text); // assert here
  });
  it('execute a sync action', () => {
    let action = (e) => {
      temp = e.value;
    }, temp;
    com = TestUtils.renderIntoDocument(
      <ActionButton action={action}>{text}</ActionButton>
    );
    button = TestUtils.findRenderedDOMComponentWithTag(com, 'button');
    TestUtils.Simulate.click(button, {value: text});
    expect(temp).toEqual(text); // assert here
  });
  it('execute an async action with callback', () => {
    let action = (e, callback) => {
      setTimeout(() => {
        callback(null, text, 1);
      }, 200);
    };
    assertAsyncAction(action, text, 1);
  });
  it('accept an action as a promise', () => {
    let action = new Promise((resolve, reject) => {
      setTimeout(() => {
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
