<template>
<modal :show.sync="showModal">
<div slot="body">
  <order-process-form :order="order" :opt-type="optType"></order-process-form>
</div>
</modal>
<div class="yin-order" v-bind:class="{'yin-order-finished': order.workflow_state == 'finished', 'yin-order-normal': order.workflow_state != 'finished'}">
  <p class="yin-order-title">{{order.id}} <span class="yin-order-product-name">{{order.product_name}}</span> <span class="yin-order-price pull-right">{{order.price}}</span></p>
  <div class="row nomargin">
    <div class="col-md-8 col-xs-8 nopadding">
      <p v-for="desc in order.description_list">
        {{$key}} : {{desc}}
      </p>
    </div>
    <div class="col-md-4 col-xs-4 nopadding">
      <span class="yin-order-state yin-order-state-finished" v-if="order.workflow_state == 'finished'"><i class="glyphicon glyphicon-ok-circle"></i> 已完成</span>
      <span class="yin-order-state yin-order-state-ship" v-if="order.workflow_state == 'ready_to_ship' || order.workflow_state == 'delay_to_ship'"><i class="glyphicon glyphicon-export"></i> 出库中</span>
      <span class="yin-order-state yin-order-state-ship" v-if="order.workflow_state == 'shipping'"><i class="glyphicon glyphicon-send"></i> 配送中</span>
    </div>
  </div>
  <div class="row nomargin">
    <div class="col-md-12 col-xs-12 nopadding" style="text-align: right">
      <button v-if="order.workflow_state =='ready_to_ship' || order.workflow_state =='delay_to_ship'" class="btn btn-primary" type="button" @click="processOrder(order.id, 'ship')"><i class="glyphicon glyphicon-send"></i> 配送中</button>
      <button v-if="order.workflow_state =='ready_to_ship' || order.workflow_state =='delay_to_ship'" class="btn btn-danger" type="button" @click="processOrder(order.id, 'not_arrived')"><i class="glyphicon glyphicon-alert"></i> 未能接货</button>
      <button v-if="order.workflow_state =='shipping'" class="btn btn-success" type="button" @click="processOrder(order.id, 'finish')"><i class="glyphicon glyphicon-ok"></i> 配送完成</button>
      <button v-if="order.workflow_state =='shipping'" class="btn btn-warning" type="button" @click="openModal('not-reciv')"><i class="glyphicon glyphicon-exclamation-sign"></i> 配送异常</button>
    </div>
  </div>
  <p v-if="order.memo" class="yin-order-memo">
    {{order.memo}}
  </p>
</div>
</template>
<script>
var Config = require('./config')
var YinApi = require('17yin')
var api = new YinApi(Config.API_ROOT)
var cookie = require('./cookie')
var swal = require('sweetalert')
var Modal = require('./Modal')
var OrderProcessForm = require('./orderProcessForm')
export default {
  components: {
    OrderProcessForm: OrderProcessForm,
    Modal: Modal
  },
  // data: function () {
  //   return {
  //     showModal: false,
  //     currentOrder: undefined,
  //     optType: undefined
  //   }
  // },
  created: function () {
    this.showModal = false
  },
  props: ['order', 'showModal', 'currentOrder', 'optType'],
  methods: {
    processOrder: function (id, action) {
      let _this = this
      swal({
        title: '操作提醒',
        text: '是否确认进行此操作？',
        type: 'warning',
        confirmButtonText: '确认',
        showCancelButton: true,
        cancelButtonText: '取消'
      }, function () {
        api.processOrder(id, action, cookie.readCookie('token')).then(function (res) {
          _this.order.workflow_state = res.workflow_state
        }, function (res) {
          console.log(res)
        })
      })
    },
    openModal: function (optType) {
      this.optType = optType
      this.showModal = true
    }
  }
}
</script>
<style>
  .yin-order {
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #eee;
    border-top-width: 2px;
  }
  .yin-order-finished {
    border-top-color: #eee;
    color: #ccc;
  }

  .yin-order-normal {
    border-top-color: #1b809e;
  }

  .yin-order-normal .yin-order-title {color: #1b809e;}
  .yin-order-normal .yin-order-product-name: {font-weight: bold; font-size: 1.2em;}
  .yin-order-memo {color: red;}

  .yin-order-state.yin-order-state-finished {color: green;}
  .yin-order-state.yin-order-state-ship {color: green;}
</style>
