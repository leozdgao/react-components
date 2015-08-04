require('babel/register')

;(function (context) {
  context.ReactCom = {
    ActionButton: require('./actionButton'),
    Portal: require('./portal'),
    Modal: require('./modal')
  }
})(this)
