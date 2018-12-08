import Vue from 'vue';
import Router from 'vue-router';
import Login from '../pages/login.vue';
import Register from '../pages/register.vue';
import Index from '../pages/views/index.vue'
import GoodsList from '../pages/views/GoodsList.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/login'
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/register',
      name: 'register',
      component: Register
    }, {
      path: '/index',
      name:'index',
      component: Index
    }, {
      path: '/goodsList', // 商品列表
      name: 'GoodsList',
      component: GoodsList
    }
  ]
})

const auth = {
  loggedIn() {
    return true
  }
}

router.beforeEach((to, from, next) => {

    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!auth.loggedIn()) {
            next({
                path: '/',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next() // 确保一定要调用 next()
    }
})

export default router
