<template>
  <div id="footer" class="footer" style="display: block;">
    <div id="footer-ensure" class="footer_ensure">
      <a href="#">
        <img src="../../assets/ensure.png">
      </a>
    </div>

    <div class="horizontal_line"></div>

    <div id="footer_desc" class="footer_desc">
      <div class="descColumn">
        <span class="descColumnTitle">购物指南</span>
        <a href="#">免费注册</a>
        <a href="#">开通支付宝</a>
        <a href="#">支付宝充值</a>
      </div>
      <div class="descColumn">
        <span class="descColumnTitle">天猫保障</span>
        <a href="#">发票保障</a>
        <a href="#">售后规则</a>
        <a href="#">缺货赔付</a>
      </div>
      <div class="descColumn">
        <span class="descColumnTitle">支付方式</span>
        <a href="#">快捷支付</a>
        <a href="#">信用卡</a>
        <a href="#">蚂蚁花呗</a>
        <a href="#">货到付款</a>
      </div>
      <div class="descColumn">
        <span class="descColumnTitle">商家服务</span>
        <a href="#">商家入驻</a>
        <a href="#">商家中心</a>
        <a href="#">天猫智库</a>
        <a href="#">天猫规则</a>
        <a href="#">物流服务</a>
        <a href="#">喵言喵语</a>
        <a href="#">运营服务</a>
      </div>
      <div class="descColumn">
        <span class="descColumnTitle">手机天猫</span>
        <a href="#"><img src="../../assets/ma.png"></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterColumn",
  data() {
    return {

    }
  }
}
</script>

<style scoped>
.footer {
    margin: 0px 0px;
    border-top-style: solid;
    border-top-width: 1px;
    border-top-color: #e7e7e7;
    height: 370px;
  }
  .footer_ensure {
    margin-top: 24px;
    margin-bottom: 24px;
    text-align: center;
  }
  .horizontal_line {
    border-top-style: solid;
    border-top-width: 1px;
    border-top-color: #e7e7e7;
  }
  .footer_desc {
    padding-top: 30px;
    margin: 20px auto;
    max-width: 1024px;
  }
  .footer_desc .descColumn {
    width: 20%;
    float: left;
    padding-left: 15px;
  }
  .footer_desc .descColumn .descColumnTitle {
    color: #646464;
    font-weight: bold;
    font-size: 16px;
  }
  .footer_desc a {
    display: block;
    padding-top: 3px;
  }
  a {
    color: #999;
  }
  a:hover {
    color: #A013EB;
    text-decoration: none;
  }
</style>
