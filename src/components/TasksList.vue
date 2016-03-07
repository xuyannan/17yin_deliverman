<template>
<p style="margin: 0;padding: 8px; color: #337ab7"><i class="glyphicon glyphicon-globe"></i> <a v-link="{name: 'tasksMap'}">在地图上显示</a></p>
<div>
  <ul class="yin-list">
    <li v-for="task in tasks" @click='openMap(task.merchant)'>
      <h4>{{task.merchant.name}} <span class="pull-right">{{task.orders.length}}单/{{task.payment}}元</span></h4>
      <p><a href="tel:{{task.merchant.mobile}}"><i class="glyphicon glyphicon-phone"></i>{{task.merchant.mobile}}</a></p>
      <p>{{task.merchant.address}}</p>
    </li>
  </ul>
</div>
</template>
<script>
import Vue from 'vue'
import store from '../store'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export default {
  data: function () {
    return {
      type: 'list',
      bdmap: null
    }
  },
  ready () {
  },
  computed: {
    tasks () {
      return store.state.tasks
    }
  },
  methods: {
    openMap: function (merchant) {
      store.dispatch('SET_CURRENT_MERCHANT', merchant)
      this.$route.router.go({
        name: 'map',
        params: { merchant: merchant.id }
      })
    },
    switchType: function (type) {
      this.$route.router.go({
        name: 'tasks',
        params: {type: type}
      })
    }
  }
}
</script>

<style>
.yin-list, .yin-list li {list-style: none; margin: 0; padding: 0}
.yin-list li {padding: 4px; border-top: 1px solid #ccc;}
</style>
