<template>
  <div>
    <Header/>
    <SearchBar/>
    <!-- <Sreach></Sreach> -->
    <!-- <GoodsListNav></GoodsListNav> -->
    <div class="container">
      <!-- 商品标签导航 -->
      <GoodsClassNav></GoodsClassNav>
      <!-- 商品展示容器 -->
      <div class="goods-box">
        <div class="goods-list-box">
          <div class="goods-list-tool">
            <ul>
              <li v-for="(item,index) in goodsTool" :key="index" @click="orderBy(item.en, index)"><span :class="{ 'goods-list-tool-active': isAction[index]}">{{item.title}} <Icon :type="icon[index]"></Icon></span></li>
            </ul>
          </div>
          <div class="goods-list">
            <div class="goods-show-info" v-for="(item, index) in goodsList" :key="index">
              <div class="">
                <router-link to="/goodsDetail"><img :src="item.img" @click="handlerClickImg(index)" class="goods-show-img" /></router-link>
              </div>
              <div class="goods-show-price">
                <span>
                  <Icon type="social-yen text-danger"></Icon>
                  <span class="seckill-price text-danger">{{item.price}}</span>
                </span>
              </div>
              <div class="goods-show-detail">
                <span>{{item.intro}}</span>
              </div>
              <div class="goods-show-num">
                已有<span>{{item.remarks}}</span>人评价
              </div>
              <!-- <div class="goods-show-seller">
                <span>{{item.shopName}}</span>
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <div class="goods-page">
        <Page :total="totalItem" :current="pageNum" :page-size="pageSize"
        @on-change="handlePage" 
        @on-page-size-change="handlePageSize" show-sizer></Page>
      </div>
    </div>
    <!-- <Footer></Footer> -->
    <SimpleCopyright/>
  </div>
</template>

<script>
import Header from '../components/HeaderNav.vue';
import SearchBar from "../components/SearchBar.vue"
import GoodsClassNav from '../components/GoodsClassNav.vue';
import SimpleCopyright from '../components/SimpleCopyright.vue'
export default {
  name: 'goodslist',
  beforeRouteEnter (to, from, next) {
    window.scrollTo(0, 0);
    next();
  },
  data () {
    return {
      totalItem:150,
      pageNum:1,
      pageSize:10,//默认每页显示个数是10个
      sreachItem: '',
      isAction: [ true, false, false ],
      icon: [ 'arrow-up-a', 'arrow-down-a', 'arrow-down-a' ],
      goodsTool: [
        {title: '综合', en: 'sale'},
        {title: '评论数', en: 'remarks'},
        {title: '价格', en: 'price'}
      ],
        goodsList: []
    };
  },
  computed: {
  },
  methods: {
    orderBy (data, index) {
      this.icon = [ 'arrow-down-a', 'arrow-down-a', 'arrow-down-a' ];
      this.isAction = [ false, false, false ];
      this.isAction[index] = true;
      this.icon[index] = 'arrow-up-a';
      if(index==0){
        alert(1);
        this.getItems(pageNum,pageSize);
      }else if(index==1){
        this.sortByKey(this.goodsList,'remarks');
         alert(2);
      }else{
        this.sortByKey(this.goodsList,'price');
         alert(3);
      }
    },
    getItems(currPage,pageSize){
      this.$axios({
        method:'get',
        url:'/item/getItems',
        params:{
          currPage:currPage,
          pageSize:pageSize
        }
      }).then(res=>{
        this.goodsList = res.data.data;
      }).catch(error=>{
        this.$Notice.open({
        title: "错误",
        desc: "服务器开小差了,请稍后再试"
      });
      });
    },
    getItemCount(){
      this.$axios({
        method:'get',
        url:'/item/getItemCount'
      }).then(res=>{
        this.totalItem = res.data.data;
      }).catch(error=>{
        this.$Notice.open({
        title: "错误",
        desc: "服务器开小差了,请稍后再试"
      });
      });
    },
    handlePage(value){
      this.pageNum = value;
      this.getItems(this.pageNum,this.pageSize);
    },
    handlePageSize(value){
      this.pageSize = value;
    },
    sortByKey(array,key){
      return array.sort(function(a,b){
        var x = a[key];
        var y = b[key];
        return((x<y)?-1:((x>y)?1:0));
      })
    },
    handlerClickImg(index){
      alert(index);
      alert(this.goodsList[0][index]);
    }
  },
  mounted () {
    this.sreachItem = this.$route.query.sreachData;
    this.getItems(this.pageNum,this.pageSize);
    this.getItemCount();
  },
  components: {
    Header,
    SearchBar,
    GoodsClassNav,
    SimpleCopyright
  }
};
</script>

<style scoped>
.container {
  margin: 15px auto;
  width: 93%;
  min-width: 1226px;
}
.text-danger {
  color: #A94442;
}
.seckill-price{
  margin-right: 5px;
  font-size: 25px;
  font-weight: bold;
}
.goods-box {
  display: flex;
}
/* ---------------侧边广告栏开始------------------- */
.as-box {
  width: 200px;
  border: 1px solid #ccc;
}
.item-as-title{
  width: 100%;
  height: 36px;
  color: #B1191A;
  line-height: 36px;
  font-size: 18px;
}
.item-as-title span:first-child{
  margin-left: 20px;
}
.item-as-title span:last-child{
  float: right;
  margin-right: 15px;
  font-size: 10px;
  color: #ccc;
}
.item-as{
  width: 160px;
  margin: 18px auto;
}
.item-as-img{
  width: 160px;
  height: 160px;
  margin: 0px auto;
}
.item-as-price span{
  font-size: 18px;
}
.item-as-intro{
  margin-top: 5px;
  font-size: 12px;
}
.item-as-selled{
  margin-top: 5px;
  font-size: 12px;
}
.item-as-selled span{
  color: #005AA0;
}
/* ---------------侧边广告栏结束------------------- */

/* ---------------商品栏开始------------------- */
.goods-list-box {
  margin-left: 15px;
  width: calc(100%);
}
.goods-list-tool{
  width: 100%;
  height: 38px;
  border: 1px solid #ccc;
  background-color: #F1F1F1;
}
.goods-list-tool ul{
  padding-left: 15px;
  list-style: none;
}
.goods-list-tool li{
  cursor: pointer;
  float: left;
}
.goods-list-tool span{
  padding: 5px 8px;
  border: 1px solid #ccc;
  border-left: none;
  line-height: 36px;
  background-color: #fff;
}
.goods-list-tool span:hover{
  border: 1px solid #E4393C;
}
.goods-list-tool i:hover{
  color: #E4393C;
}
.goods-list-tool-active {
  color: #fff;
  border-left: 1px solid #ccc;
  background-color: #E4393C !important;
}

.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.goods-show-info{
  width: 240px;
  padding: 10px;
  margin: 15px 0px;
  border: 1px solid #fff;
  cursor: pointer;
}
.goods-show-info:hover{
  border: 1px solid #ccc;
  box-shadow: 0px 0px 15px #ccc;
}
.goods-show-price{
  margin-top: 6px;
}
.goods-show-detail{
  font-size: 12px;
  margin: 6px 0px;
}
.goods-show-num{
  font-size: 12px;
  margin-bottom: 6px;
  color: #009688;
}
.goods-show-num span{
  color: #005AA0;
  font-weight: bold;
}
.goods-show-seller{
  font-size: 12px;
  color:#E4393C;
}
.goods-show-img{
  width: 100%;
  height: 100%;
}
.goods-page {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
/* ---------------商品栏结束------------------- */
</style>
