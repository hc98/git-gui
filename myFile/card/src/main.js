// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.prototype.$axios = axios
Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    detailsId: '',
    count: 99
  },
  mutations: {
    counts (state, n) {
      state.count = n
    },
    getDetailsId (state, id) {
      state.detailsId = id
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
