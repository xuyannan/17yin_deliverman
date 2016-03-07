import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  currentMerchant: {},
  tasks: {}
}

const actions = {
  setCurrentMerchant: 'SET_CURRENT_MERCHANT',
  setTasks: 'SET_TASKS'
}

const mutations = {
  'SET_CURRENT_MERCHANT' (state, merchant) {
    state.currentMerchant = merchant
  },
  'SET_TASKS' (state, tasks) {
    state.tasks = tasks
  }
}

module.exports = new Vuex.Store({
  state,
  mutations,
  actions
})
