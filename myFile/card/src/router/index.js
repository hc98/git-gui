import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import home from '@/components/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/home',
      name: 'home',
      component: home
    }
  ]
})
