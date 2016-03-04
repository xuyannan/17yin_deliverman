import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  currentMerchant: {}
}

const actions = {
  setCurrentMerchant: 'SET_CURRENT_MERCHANT'
}

const mutations = {
  'SET_CURRENT_MERCHANT' (state, merchant) {
    state.currentMerchant = merchant
  }
}

module.exports = new Vuex.Store({
  state,
  mutations,
  actions
})
