<template>
  <div class="headerNav">
    <nav class="top">
      <a href="#">
        <i class="el-icon-goods"></i>
        EMALL首页
      </a>
      <span>Hi, 欢迎来到EMALL</span>
      <a href="javascript:void(0);" @click="toLogin()">
        请登录
      </a>
      <a href="javascript:void(0);" @click="toRegister()">
        免费注册
      </a>

      <span class="float-right">
        <a href="#">
          我的订单
        </a>
        <i class="el-icon-sold-out"></i>
        购物车<strong>0</strong>件
      </span>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'HeaderNav',
  data() {
    return {

    }
  },
  methods: {
    toLogin() {
      this.$router.push('/login');
    },
    toRegister() {
      this.$router.push('/register');
    }
  }
}
</script>

<style scoped>
.headerNav {
      font-size: 12px;
      font-family: Arial;
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
</style>
