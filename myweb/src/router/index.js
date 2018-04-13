import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/home/login'
import Index from '@/components/Index'
import Person from '@/components/person'
import Win from '@/components/win'
import Shuffle from '@/components/shuffle';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/person',
      name: 'Person',
      component: Person,
      meta: {
        flag: true
      }
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      meta: {
        flag: true
      }
    },
    {
      path: '/win',
      name: 'Win',
      component: Win
    },
    {
      path: '/shuffle',
      name: 'Shuffle',
      component: Shuffle
    },
  ]
})

// 路由验证，判断是否需要验证以及验证是否成功
// router.beforeEach((to, from, next) => {
//     // 判断是否需要验证
//   if (to.meta.flag) {
//
//   }
//   next();
// })

export default router
