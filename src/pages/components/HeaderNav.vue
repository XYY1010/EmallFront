<template>
  <Affix :offset-top="0">
  <div class="head">
    <div class="headerNav">
      <nav class="top">
        <a href="javascript:void(0);" @click="toIndex()">
          <Icon type="ios-home" style="margin-top: -1px;"/>EMALL首页
        </a>
        <template v-if="userInfo === null">
          <span>Hi, 欢迎来到EMALL</span>
          <a href="javascript:void(0);" @click="toLogin()">
            请登录
          </a>
          <a href="javascript:void(0);" @click="toRegister()">
            免费注册
          </a>
        </template>
        <template v-if="userInfo !== null">
          <span>Hi, {{userInfo.userName}}</span>
          <Dropdown placement="bottom-start">
            <a href="javascript:void(0);" @click="toUserCenter()">会员中心</a>
            <DropdownMenu slot="list">
              <div class="user-info-box">
                <Avatar v-if="userInfo.avatarSrc !== ''" :src="userInfo.avatarSrc" size="large"></Avatar>
                <Avatar v-if="userInfo.avatarSrc === ''" style="background-color: #87d068; color: #FFFFFF" icon="ios-person" size="large"/>
                <a href="javascript:void(0);" @click="toLogin()">退出登录</a>
              </div>
            </DropdownMenu>
          </Dropdown>
        </template>

        <span class="float-right">
          <a href="#">
            我的订单
          </a>
          <Dropdown placement="bottom-end">
            <a href="javascript:void(0);" @click="toShoppingcart()">
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
                    <img :src="item.attrImg">
                  </div>
                  <div class="shopping-cart-info">
                    <div class="shopping-cart-title">
                      <p v-if="item.itemTitle.length>15"><font style="color:black; weight:bolder;"size="2">{{item.itemTitle.substring(0, 14)}}...</font></p>
                      <p v-if="item.itemTitle.length<=15"><font style="color:black; weight:bolder;"size="2">{{item.itemTitle}}</font></p>
                    </div>
                    <div class="shopping-cart-detail">
                      <p>
                        规格：
                        <span class="shopping-cart-text">
                          <font v-if="item.attrVals.length<=15" style="color:blue;">{{item.attrVals}}</font>
                          <font v-if="item.attrVals.length>15" style="color:blue;">{{item.attrVals.substring(0, 14)}}...</font>
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
        </span>
      </nav>
    </div>
  </div>
</Affix>
</template>

<script>
export default {
  name: 'HeaderNav',
  data() {
    return {
      shoppingCart: [
      ],
      userInfo: {}
    }
  },
  methods: {
    toLogin() {
      this.$router.push('/login');
    },
    toRegister() {
      this.$router.push('/register');
    },
    toUserCenter() {
      this.$router.push('/usercenter/usercontrol');
    },
    checkCart() {
      this.$router.push('/shoppingcart');
    },
    toIndex() {
      this.$router.push('/');
    },
    toShoppingcart() {
      if (this.userInfo == null) {
        this.$router.push('/login');
      } else {
        this.$router.push('/shoppingcart');
      }
    }
  },
  mounted() {
    this.userInfo = this.$store.getters.user;
    this.$axios({
      method: 'post',
      url: '/shoppingcart/getall',
      params: {
        id: this.userInfo.userId
      }
    }).then(res => {
      let result = res.data;
      if (result.status == 'success') {
        this.shoppingCart = result.data;
        for (var i = 0; i < this.shoppingCart.length; i++) {
          this.shoppingCart[i].price = this.shoppingCart[i].price.toFixed(2);
        }
        this.$store.commit('initShoppingcart', this.shoppingCart);
      } else {
        this.$Notice.open({
          title: "错误" + this.result.data.errCode,
          desc: this.result.data.errMsg
        });
      }
    }).catch(err => {
      this.$Notice.open({
        title: "错误",
        desc: "服务器开小差了,请稍后再试"
      });
    });
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

    .user-info-box {
      padding: 5px;
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
      padding: 0px 15px;
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
