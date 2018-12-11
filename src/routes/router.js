import Vue from 'vue';
import Router from 'vue-router';
import Login from '../pages/login.vue';
import Register from '../pages/register.vue';
import Index from '../pages/views/index.vue';
import ShoppingCart from '../pages/views/shoppingcart.vue';
import GoodsDetail from '../pages/views/goodsdetail.vue';
import GoodsList from '../pages/views/goodslist.vue'
import UserCenter from '../pages/views/usercenter.vue';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/index'
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
      path: '/shoppingcart',
      name: 'shoppingcart',
      component: ShoppingCart
    }, {
      path: '/goodsdetail',
      name: 'goodsdetail',
      component: GoodsDetail
    }, {
      path: '/goodslist',
      name: 'goodslist',
      component: GoodsList
    }, {
      path: '/usercenter/usercontrol',
      component: UserCenter,
      children: [
        {
          path: '',
          name: 'default-user-info',
          component: () => import('../pages/views/user/info/userinfo.vue')
        },
        {
          path: 'info',
          name: 'user-info',
          component: () => import('../pages/views/user/info/userinfo.vue')
        },
        {
          path: 'security',
          name: 'security-setting',
          component: () => import('../pages/views/user/info/securitysetting.vue')
        },
        {
          path: 'address',
          name: 'delivery-address',
          component: () => import('../pages/views/user/info/deliveryaddress.vue')
        }
      ]
    }, {
      path: '/usercenter/myorder',
      component: UserCenter,
      children: [
        {
          path: '',
          name: 'default-order',
          component: () => import('../pages/views/user/order/allorders.vue')
        },
        {
          path: 'allorders',
          name: 'all-orders',
          component: () => import('../pages/views/user/order/allorders.vue')
        },
        {
          path: 'obligation',
          name: 'obligation',
          component: () => import('../pages/views/user/order/obligation.vue')
        },
        {
          path: 'deliverywaiting',
          name: 'delivery-waiting',
          component: () => import('../pages/views/user/order/deliverywaiting.vue')
        },
        {
          path: 'receiverwaiting',
          name: 'receiver-waiting',
          component: () => import('../pages/views/user/order/receiverwaiting.vue')
        },
        {
          path: 'commentwaiting',
          name: 'comment-waiting',
          component: () => import('../pages/views/user/order/commentwaiting.vue')
        }
      ]
    }, {
      path: '/usercenter/comment',
      component: UserCenter,
      children: [
        {
          path: '',
          name: 'default-comment',
          component: () => import('../pages/views/user/comment/fromcomments.vue')
        },
        {
          path: 'fromcomments',
          name: 'from-comment',
          component: () => import('../pages/views/user/comment/fromcomments.vue')
        },
        {
          path: 'tocomments',
          name: 'to-comments',
          component: () => import('../pages/views/user/comment/tocomments.vue')
        }
      ]
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
