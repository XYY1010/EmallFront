<template>
  <div>
  <a href="#">
    <img src="../../assets/logo.gif" class="logo" id="logo">
  </a>
  <div class="searchDiv">
    <input type="text" placeholder="搜索 天猫 商店/品牌/店铺" name="keyword">
    <button class="searchButton" type="submit" @click='search'>搜索</button>
    <div class="searchBelow">
      <span><a href="#">针织衫</a><span>|</span></span>
      <span><a href="#">连衣裙</a><span>|</span></span>
      <span><a href="#">四件套</a><span>|</span></span>
      <span><a href="#">摄像头</a><span>|</span></span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'SearchBar',
  methods: {
    search: function() {
      this.$router.push('/goodsList')
    }
  }
}
</script>

<style scoped>
  .searchDiv {
    background: #A013EB;
    width: 400px;
    margin: 50px auto;
    padding: 1px;
    height: 40px;
    display: block;
  }
  .searchDiv input {
    width: 270px;
    border: 1px solid transparent;
    height: 36px;
    margin: 1px;
    outline: none;
  }
  .searchDiv button {
    width: 110px;
    border: 1px solid transparent;
    background: #A013EB;
    color: #FFFFFF;
    font-size: 20px;
    font-weight: bold;
  }
  .searchBelow {
    margin-top: 3px;
    margin-left: -20px;
  }
  .searchBelow span {
    color: #999;
  }
  .searchBelow a {
    padding: 0px 20px 0px 20px;
    font-size: 14px;
  }
  .logo {
    position: absolute;
    left: 20px;
    top: 30px;
    z-index: -1;
  }
  body {
    font-size: 12px;
    font-family: Arial;
  }
  a {
    color: #999;
  }
  a:hover {
    color: #A013EB;
    text-decoration: none;
  }
</style>
