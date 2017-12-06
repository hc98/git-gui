import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/home/login'
import Index from '@/components/Index'

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
      path: '/index',
      name: 'Index',
      component: Index
    }
  ]
})
// router.beforeEach((to, from, next) => {
//   let isLogin = window.sessionStorage.getItem('isLogin');
//
//   isLogin = (isLogin==null)?false:isLogin;
//   console.log(isLogin);
//   // 未登录状态；跳转至login
//   if (!isLogin) {
//     router.push('/login');
//     return;
//   }
//   // 已登录状态；当路由到login时，跳转至home
//   if (to.name === 'Login') {
//     if (isLogin) {
//       router.push('/index');
//     }
//   }
//   next();
// })

export default router
