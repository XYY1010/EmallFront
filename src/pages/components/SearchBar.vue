<template>
  <div class="searchBar">
  <a href="#">
    <img src="../../assets/EmallIcon.png" class="logo" id="logo">
  </a>
  <div class="searchDiv">
    <input type="text" placeholder="搜索 EMALL 商店/品牌" name="keyword">
    <button class="searchButton" type="submit">搜索</button>
    <div class="searchBelow">
      <span><a href="#">手机</a><span>|</span></span>
      <span><a href="#">电脑</a><span>|</span></span>
      <span><a href="#">单反</a><span>|</span></span>
      <span><a href="#">xbox</a><span>|</span></span>
    </div>
  </div>
</div>
</template>

<script>
export default {
}
</script>

<style scoped>
  .searchBar {
    position: relative;
    width: 1226px;
    height: auto;
    margin: 0 auto;
  }
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
    left: 0px;
    top: 0px;
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
