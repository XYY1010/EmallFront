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
              <li v-for="(item,index) in goodsTool" :key="index" @click="orderBy(item.en, index)"><span :class="{ 'goods-list-tool-active': isAction[index]}">{{item.title}} <i :class="icon[index]"></i></span></li>
            </ul>
          </div>
          <div class="goods-list">
            <div class="goods-show-info" v-for="(item, index) in historyData" :key="index">
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
         库存<span>{{item.stock}}</span>件
       </div>
              <div class="goods-show-num">
                已售出<span>{{item.itemSales}}</span>件
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
import SimpleCopyright from '../components/SimpleCopyright.vue';
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
      icon: [ 'el-icon-caret-top', 'el-icon-caret-down', 'el-icon-caret-down' ],
      goodsTool: [
    {title: '综合', en: 'all'},
        {title: '销量', en: 'sale'},
        {title: '价格', en: 'price'}
      ],
        goodsList: [],
				ajaxHistoryData:[],
				historyData:[]
    };
  },
  computed: {
  },
  methods: {
		// 获取历史记录信息
    handleListApproveHistory(){
      // 保存取到的所有数据
      this.ajaxHistoryData = this.goodsList;
      this.totalItem = this.goodsList.length;
      // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
      if(this.goodsList.length < this.pageSize){
        this.historyData = this.ajaxHistoryData;
      }else{
        this.historyData = this.ajaxHistoryData.slice(0,this.pageSize);
      }
    },
		changepage(){
      var _start = ( this.pageNum - 1 ) * this.pageSize;
      var _end = this.pageNum * this.pageSize;
      this.historyData = this.ajaxHistoryData.slice(_start,_end);
    },
    orderBy (data, index) {
      this.icon = [ 'el-icon-caret-down', 'el-icon-caret-down', 'el-icon-caret-down' ];
      this.isAction = [ false, false, false ];
      this.isAction[index] = true;
      this.icon[index] = 'el-icon-caret-top';
      if(index==0){
        this.ajaxHistoryData = this.goodsList;
				this.pageNum = 1;
				this.changepage();
      }else if(index==1){
        this.sortByKey(this.ajaxHistoryData,'itemSales');
        this.pageNum = 1;
				this.changepage();
      }else{
        this.sortByKey(this.ajaxHistoryData,'price');
        this.pageNum = 1;
        this.changepage();
      }
    },
    getItems(){
      this.$axios({
        method:'get',
        url:'/item/getItems'
      }).then(res=>{
        this.goodsList = res.data.data;
				this.handleListApproveHistory();
      }).catch(error=>{
        this.$Notice.open({
        title: "错误",
        desc: "服务器开小差了,请稍后再试"
      });
      });
    },
    handlePage(value){
      this.pageNum = value;
      this.changepage();
    },
    handlePageSize(value){
      this.pageSize = value;
			this.pageNum = 1;
			this.historyData = this.ajaxHistoryData.slice(0,this.pageSize);
    },
    sortByKey(array,key){
      return array.sort(function(a,b){
        var x = a[key];
        var y = b[key];
        return((x<y)?-1:((x>y)?1:0));
      })
    },
    handlerClickImg(index){
      this.$store.commit('initItem', {item: {
        itemId: this.goodsList[index].itemId,
        price: this.goodsList[index].price,
        stock: this.goodsList[index].stock
      }});
    }
  },
  mounted () {
    this.sreachItem = this.$route.query.sreachData;
    this.getItems(this.pageNum,this.pageSize);
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
  display: flex;
  justify-content: flex-end;
}
/* ---------------商品栏结束------------------- */
</style>
