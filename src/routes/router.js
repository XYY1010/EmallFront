import Vue from 'vue';
import Router from 'vue-router';

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
      component: resolve => require(['../pages/login.vue'], resolve)
    }, {
      path: '/register',
      name: 'register',
      component: resolve => require(['../pages/register.vue'], resolve)
    }, {
      path: '/index',
      name:'index',
      component: resolve => require(['../pages/views/index.vue'], resolve)
    }, {
      path: '/pay',
      name: 'pay',
      component: resolve => require(['../pages/views/pay/pay.vue'], resolve)
    },{
      path: '/aliPay',
      name: 'aliPay',
      component: resolve => require(['../pages/views/pay/aliPay.vue'], resolve)
    }, {
      path: '/shoppingcart',
      name: 'shoppingcart',
      component: resolve => require(['../pages/views/shoppingcart.vue'], resolve)
    }, {
      path: '/goodsdetail',
      name: 'goodsdetail',
      component: resolve => require(['../pages/views/goodsdetail.vue'], resolve)
    }, {
      path: '/goodslist',
      name: 'goodslist',
      component: resolve => require(['../pages/views/goodslist.vue'], resolve)
    }, {
      path: '/myOrders',
      name: 'myOrders',
      component: resolve => require(['../pages/views/usercenter.vue'], resolve),
      children: [
        {
          path: '',
          name: 'default-order1',
          component: resolve => require(['../pages/views/user/order/allorders.vue'], resolve),
        }
      ]
    }, {
      path: '/confirmOrders',
      name: 'confirmOrders',
      component: resolve => require(['../pages/views/confirmOrders/ConfirmOrders.vue'], resolve),
    },{
      path: '/usercenter/usercontrol',
      component: resolve => require(['../pages/views/usercenter.vue'], resolve),
      children: [
        {
          path: '',
          name: 'default-user-info',
          component: resolve => require(['../pages/views/user/info/userinfo.vue'], resolve)
        },
        {
          path: 'info',
          name: 'user-info',
          component: resolve => require(['../pages/views/user/info/userinfo.vue'], resolve)
        },
        {
          path: 'security',
          name: 'security-setting',
          component: resolve => require(['../pages/views/user/info/securitysetting.vue'], resolve)
        },
        {
          path: 'address',
          name: 'delivery-address',
          component: resolve => require(['../pages/views/user/info/deliveryaddress.vue'], resolve)
        }
      ]
    }, {
      path: '/usercenter/myorder',
      component: resolve => require(['../pages/views/usercenter.vue'], resolve),
      children: [
        {
          path: '',
          name: 'default-order',
          component: resolve => require(['../pages/views/user/order/allorders.vue'], resolve)
        },
        {
          path: 'allorders',
          name: 'all-orders',
          component: resolve => require(['../pages/views/user/order/allorders.vue'], resolve)
        },
        {
          path: 'obligation',
          name: 'obligation',
          component: resolve => require(['../pages/views/user/order/obligation.vue'], resolve)
        },
        {
          path: 'deliverywaiting',
          name: 'delivery-waiting',
          component: resolve => require(['../pages/views/user/order/deliverywaiting.vue'], resolve)
        },
        {
          path: 'receiverwaiting',
          name: 'receiver-waiting',
          component: resolve => require(['../pages/views/user/order/receiverwaiting.vue'], resolve)
        },
        {
          path: 'commentwaiting',
          name: 'comment-waiting',
          component: resolve => require(['../pages/views/user/order/commentwaiting.vue'], resolve)
        }
      ]
    }, {
      path: '/usercenter/comment',
      component: resolve => require(['../pages/views/usercenter.vue'], resolve),
      children: [
        {
          path: '',
          name: 'default-comment',
          component: resolve => require(['../pages/views/user/comment/fromcomments.vue'], resolve)
        },
        {
          path: 'fromcomments',
          name: 'from-comment',
          component: resolve => require(['../pages/views/user/comment/fromcomments.vue'], resolve)
        },
        {
          path: 'tocomments',
          name: 'to-comments',
          component: resolve => require(['../pages/views/user/comment/tocomments.vue'], resolve)
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
