<template>
  <div class="container">
    <div v-for="task in tasks">
      <p class="yin-merchant-title">
        <span class="yin-merchant-name">{{task.merchant.name}}</span>
        <a href="tel:{{task.merchant.mobile}}"><i class="glyphicon glyphicon-phone"></i>{{task.merchant.mobile}}</a>
        <span class="yin-merchant-payment pull-right">{{task.payment}}</span>
      </p>
      <p>
        <a v-link="{name: 'map', params: { query: task.merchant.address }}"><i class="glyphicon glyphicon-map-marker"></i> {{task.merchant.address}}</a>
      </p>
      <order v-for="order in task.orders" :order.sync="order"></order>
    </div>

  </div>
</template>

<script>
import Order from './Order'
var YinApi = require('../lib/17yinApi')
var Config = require('../config.js')
var api = new YinApi(Config.API_ROOT)
import cookie from '../lib/cookie'
import Vue from 'vue'
import resource from 'vue-resource'
Vue.use(resource)
export default {
  components: {
    order: Order
  },
  data () {
    return {
      summary: {},
      tasks: []
    }
  },
  ready () {
    let token = cookie.readCookie('token')
    let _this = this
    api.getTasks(token).then(
      function (res) {
        _this.summary = res.data.data.summary
        _this.tasks = res.data.data.tasks
      },
      function (res) {
        console.log('error')
      }
    )
  }
}
</script>

<style>
.yin-merchant-title {height: 40px; line-height: 40px;}
.yin-merchant-title .yin-merchant-name {font-weight: bold; font-size: 1.4em;}
.yin-merchant-payment {font-size: 1.4em; color: #1b809e;}
</style>
