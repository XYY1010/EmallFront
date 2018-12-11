export default {
  menu: [
    {
      id: 1,
      icon: 'ios-people',
      name: '我的信息',
      menuItems: [
        {
          id: 11,
          name: '个人资料',
          link: '/usercenter/usercontrol/info'
        },
        {
          id: 12,
          name: '安全设置',
          link: '/usercenter/usercontrol/security'
        },
        {
          id: 13,
          name: '收货地址',
          link: '/usercenter/usercontrol/address'
        }
      ]
    },
    {
      id: 2,
      icon: 'ios-paper',
      name: '我的订单',
      menuItems: [
        {
          id: 21,
          name: '所有订单',
          link: '/usercenter/myorder/allorders'
        },
        {
          id: 22,
          name: '待付款',
          link: '/usercenter/myorder/obligation'
        },
        {
          id: 23,
          name: '待发货',
          link: '/usercenter/myorder/deliverywaiting'
        },
        {
          id: 24,
          name: '待收货',
          link: '/usercenter/myorder/receiverwaiting'
        },
        {
          id: 25,
          name: '待评价',
          link: '/usercenter/myorder/commentwaiting'
        }
      ]
    },
    {
      id: 3,
      icon: 'ios-medal',
      name: '我的评价',
      menuItems: [
        {
          id: 31,
          name: '来自商家的评价',
          link: '/usercenter/comment/fromcomments'
        },
        {
          id: 32,
          name: '给他人的评价',
          link: '/usercenter/comment/tocomments'
        }
      ]
    }
  ]
}
