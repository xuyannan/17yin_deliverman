var Vue = require('vue')
Vue.use(require('vue-resource'))
var Yin17Api = function (url) {
  this.auth = {mobile: undefined, password: undefined}
  this.apiRootUrl = undefined
  this.apiRootUrl = url ? url : 'http://yin17.com/api/v1/'
}

Yin17Api.prototype.login = function (token) {
  Vue.http.headers.common.Authorization = 'Basic ' + token
  return Vue.http.get(this.apiRootUrl + 'login')
}

Yin17Api.prototype.getTasks = function (token) {
  Vue.http.headers.common.Authorization = 'Basic ' + token
  return Vue.http.get('deliveryman/orders')
}

Yin17Api.prototype.processOrder = function (orderid, action, token, memo) {
  var url = `deliveryman/orders/${orderid}/procedure/${action}`
  Vue.http.headers.common.Authorization = 'Basic ' + token
  return Vue.http.post(this.apiRootUrl + url, {
    extra: memo ? memo : ''
  })
}

module.exports = Yin17Api
