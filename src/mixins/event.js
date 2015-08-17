import eventListener from 'lgutil/dom/eventListener'

export default {
  listenEvent (target, eventType, callback) {
    this._events ? this._events.push(eventListener.listen(target, eventType, callback))
      : this._events = [ eventListener.listen(target, eventType, callback) ]

    return this._events[this._events.length - 1]
  },
  clearAllEventListener () {
    this._events && (this._events.forEach((e) => e.remove()), this._events = [])
  },
  componentWillUnmount () {
    this.clearAllEventListener()
  }
}
