import eventListener from 'lgutil/dom/eventListener';

export default {
  listenEvent (target, eventType, callback) {
    this._events ? this._events.push(eventListener(target, eventType, callback))
      : this._events = [eventListener(target, eventType, callback)];
  },
  clearAllEventListener () {
    this._events && (this._events.forEach((e) => e.remove()), this._events = []);
  },
  componentWillUnmount () {
    this.clearAllEventListener();
  }
}
