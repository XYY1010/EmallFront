<template>
  <div class="head">
    <div class="headerNav">
      <nav class="top">
        <a href="javascript:void(0);" @click="jumpToIndex()">
          <Icon type="ios-home" style="margin-top: -1px;"/>EMALL首页
        </a>
        <span>Hi, 欢迎来到EMALL</span>
        <a href="javascript:void(0);" @click="toLogin()">
          请登录
        </a>
        <a href="javascript:void(0);" @click="toRegister()">
          免费注册
        </a>

        <span class="float-right">
          <Dropdown placement="bottom-start">
            <a href="javascript:void(0);">
              <Icon type="md-cart" style="margin-top: -1px;"/>
              购物车<strong>{{shoppingCart.length}}</strong>件
            </a>
            <DropdownMenu slot="list">
              <div class="shopping-cart-null" v-show="shoppingCart.length <= 0">
                <Icon type="ios-cart-outline" class="cart-null-icon"></Icon>
                <span>你的购物车空空如也~</span>
                <span>赶快去添加商品吧~~~</span>
              </div>
              <div class="shopping-cart-list" v-show="shoppingCart.length > 0">
                <div v-for="(item, index) in shoppingCart" :key="index" class="shopping-cart-box" >
                  <div class="shopping-cart-img">
                    <img :src="item.imgUrl">
                  </div>
                  <div class="shopping-cart-info">
                    <div class="shopping-cart-title">
                      <p v-if="item.title.length>13"><font style="color:black; weight:bolder;"size="2">{{item.title.substring(0, 12)}}...</font></p>
                      <p v-if="item.title.length<=13"><font style="color:black; weight:bolder;"size="2">{{item.title}}</font></p>
                    </div>
                    <div class="shopping-cart-detail">
                      <p>
                        规格：
                        <span class="shopping-cart-text">
                          <font style="color:blue;">{{item.requirement}}</font>
                        </span>
                      </p>
                      <p>
                        数量：
                        <span class="shopping-cart-text">
                          <font style="color:orange;">{{item.amount}}件</font>
                        </span>
                      </p>
                      <p>
                        价钱：
                        <span class="shopping-cart-text">
                          <font style="color:red;">￥{{item.price}}元</font>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="check-cart">
                  <Button type="warning" size="small" @click="checkCart">
                    查看购物车
                  </Button>
                </div>
              </div>
            </DropdownMenu>
          </Dropdown>
          <a href="#">
            我的订单
          </a>
        </span>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderNav',
  data() {
    return {
      shoppingCart: [
        {
          goods_id: '13212313213',
          amount: 1,
          imgUrl: 'http://139.199.125.60/bxjg.jpg',
          requirement: '白色 威震天',
          price: 2800.00,
          title: '变形金刚领袖战争钢锁淤泥嚎叫飞镖铁渣组合机器恐龙男孩玩具'
        },
        {
          goods_id: '13212123211',
          amount: 10,
          imgUrl: 'http://139.199.125.60/bijiben13.3.jpg',
          requirement: '银色 13.3寸 i5',
          price: 5500.00,
          title: '小米笔记本'
        },
        {
          goods_id: '13211223658',
          amount: 1,
          imgUrl: 'http://139.199.125.60/xmds4a_43.png',
          requirement: '黑色 43寸 xmtv4a',
          price: 2200.00,
          title: 'Xiaomi/小米 小米电视4A 43英寸4S PRO智能网络4K超清液晶电视机'
        }
      ]
    }
  },
  methods: {
    toLogin() {
      this.$router.push('/login');
    },
    toRegister() {
      this.$router.push('/register');
    },
    checkCart() {
      this.$router.push('/shoppingcart');
    },
    jumpToIndex() {
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
    .head {
      width: 100%;
      height: auto;
      background-color: #f2f2f2;
    }
    .headerNav {
      font-size: 12px;
      font-family: Arial;
      position: relative;
      width: 1226px;
      height: auto;
      margin: 0 auto;
    }
    a {
      color:#999;
    }
    .redColor {
      color: #A013EB !important;
    }
    nav.top {
      background: #f2f2f2;
      padding-top: 5px;
      padding-bottom: 5px;
      border-bottom: 1px solid #e7e7e7;
    }
    nav.top span, nav.top a {
      color: #999;
      margin: 0px 10px 0px 10px;
    }
    nav.top a:hover {
      color: #A013EB;
      text-decoration: none;
    }
    .shopping-cart-null {
      padding: 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .cart-null-icon {
      font-size: 38px;
      margin-bottom: 15px;
    }
    .shopping-cart-null span {
      color: #999999;
      font-size: 12px;
      line-height: 16px;
      width: 120px;
    }
    .shopping-cart-list {
      padding: 3px 15px;
      height:150px;
      overflow: auto;
    }
    .shopping-cart-box {
      margin: 8px 0px;
      margin-top: 15px;
      padding-bottom: 10px;
      height: 100px;
      display: flex;
      align-items: center;
      border-bottom: 1px #ccc dotted;
    }
    .shopping-cart-box:first-child {
      margin-top: 8px;
    }
    .shopping-cart-img {
      margin-right: 5px;
      width: 40px;
      height: 40px;
    }
    .shopping-cart-img img {
      width: 100%;
    }
    .shopping-cart-info {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-content: space-between;
      width: 200px;
      overflow: hidden;
      font-size: 12px;
      line-height: 8px;
      color: #999999;
    }
    .shopping-cart-title {
      color: #000;
      line-height: 20px;
    }
    .shopping-cart-detail {
      color: #999999;
    }
    .shopping-cart-text {
      color: #ccc;
    }
    .check-cart {
      display: flex;
      justify-content: flex-end;
    }
</style>
