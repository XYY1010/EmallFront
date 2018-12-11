<template>
  <div class="user-center-search-div">
    <a href="javascript:void(0);" @click="jumpToIndex()">
      <img src="../../assets/EmallIcon.png" class="logo" id="logo">
    </a>
    <span class="user-center-title"> <h1>我的 EMALL</h1> </span>
    <div class="searchDiv float-right">
      <input type="text" placeholder="搜索 EMALL 商品" name="keyword">
      <button class="searchButton" type="submit">搜索</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'usercentersearch',
  data() {
    return {

    }
  },
  methods: {
    jumpToIndex() {
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.user-center-search-div {
  position: relative;
  width: 1226px;
  height: auto;
  margin: 0 auto;
}

.user-center-title {
  margin: 20px 10px;
  float: left;
}

.logo {
  margin: 20px 10px;
  float: left;
}
.searchDiv {
  background: #A013EB;
  width: 400px;
  margin: 20px 10px;
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
</style>
