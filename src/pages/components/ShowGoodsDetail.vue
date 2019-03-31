<template>
  <div class="show-goods-detail-div">
    <div class="item-intro-show">
      <div class="item-intro-recommend">
        <div class="item-recommend-title">
          <p>店铺热销</p>
        </div>
        <div class="item-intro-recommend-column">
          <div class="item-recommend-column" v-for="(item, index) in data.hot" :key="index">
            <div class="item-recommend-img">
              <img :src="item.img" alt="">
            </div>
            <div class="item-recommend-intro">
              <span>
                <span class="item-recommend-top-num">{{index + 1}}</span> 热销{{item.sale}}件</span>
              <span class="item-recommend-price">￥{{item.prize.toFixed(2)}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="item-intro-detail" ref="itemIntroDetail">
        <div class="item-intro-nav item-tabs">
          <Tabs>
            <TabPane label="商品介绍">
              <div class="remarks-title">
                <span>商品介绍</span>
              </div>
              <div class="item-intro-img" ref="itemIntroGoods">
                <img v-lazy="item" alt="" v-for="(item,index) in data.goodsDetail" :key="index">
              </div>
            </TabPane>
            <TabPane label="商品评价">
              <div class="remarks-container">
                <div class="remarks-title">
                  <span>商品评价</span>
                </div>
                <div class="remarks-analyse-box">
                  <div class="remarks-analyse-goods">
                    <i-circle :percent="data.remarks.goodAnalyse" stroke-color="#e4393c">
                      <span class="remarks-analyse-num">{{data.remarks.goodAnalyse.toFixed(1)}}%</span>
                      <p class="remarks-analyse-title">好评率</p>
                    </i-circle>
                  </div>
                  <div class="remarks-analyse-tags">
                    <Tag checkable :color="tagsColor[index % 4]" v-for="(item,index) in data.remarks.remarksTags" :key="index">{{item}}</Tag>
                  </div>
                </div>
                <div class="remarks-bar">
                  <span>好评({{data.remarks.remarksNumDetail[0]}})</span>
                  <span>中评({{data.remarks.remarksNumDetail[1]}})</span>
                  <span>差评({{data.remarks.remarksNumDetail[2]}})</span>
                </div>
                <div class="remarks-box" v-for="(item,index) in historyData" :key="index">
                  <div class="remarks-user">
                    <Avatar icon="person" />
                    <span class="remarks-user-name">{{item.username}}</span>
                  </div>
                  <div class="remarks-content-box">
                    <p>
                      <Rate disabled :value="item.values" allow-half class="remarks-star"></Rate>
                    </p>
                    <p class="remarks-content">{{item.content}}</p>
                    <p class="remarks-sub">
                      <span class="remarks-item">{{item.goodsMeal}}</span>
                      <span class="remarks-time">{{item.createTime.substring(0,10)}}</span>
                    </p>
                  </div>
                </div>
                <div class="remarks-page">
                  <Page :total="totalComment" :current="pageNum" :page-size="pageSize"
												@on-change="handlePage"
												@on-page-size-change="handlePageSize" show-sizer>
									</Page>
                </div>
              </div>
            </TabPane>
						<TabPane label="售后保障">
						  <ShowProductWarranty></ShowProductWarranty>
						</TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShowProductWarranty from './ShowProductWarranty.vue';
export default {
  name: 'ShowGoodsDetail',
  data () {
    return {
			totalComment:100,
			pageNum:1,
			pageSize:10,
      HotItemNumber:4,
      tagsColor: [ 'blue', 'green', 'red', 'yellow' ],
			itemInfo:{},
			dataTable:[],
			ajaxHistoryData:[],
			historyData:[],
      data:{
        hot: [],
        goodsDetail: [],
        remarks: {
          goodAnalyse: 90,
          remarksTags: [ '颜色可人', '实惠优选', '严丝合缝', '极致轻薄', '质量没话说', '比定做还合适', '完美品质', '正品行货', '包装有档次', '不容易发热', '已经买第二个', '是全覆盖' ],
          remarksNumDetail: [ 0, 0, 0 ],
        }
      }
    };
  },
  mounted(){
		this.itemInfo = this.$store.getters.item;
    this.getHotItems(this.HotItemNumber);
    this.getIntroImg(this.itemInfo.itemId);
		this.getComments(this.itemInfo.itemId);
  },
  methods: {
		// 获取历史记录信息
    handleListApproveHistory(){
      // 保存取到的所有数据
      this.ajaxHistoryData = this.dataTable;
      this.totalComment = this.dataTable.length;
      // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
      if(this.dataTable.length < this.pageSize){
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
		handlePage(value){
      this.pageNum = value;
      this.changepage();
    },
    handlePageSize(value){
      this.pageSize = value;
			this.pageNum = 1;
			this.historyData = this.ajaxHistoryData.slice(0,this.pageSize);
    },
    stringHandler(str){
      str = str.replace(/[\'\"\\\b\f\n\r\t]/g, '');
      return str.split(",");
    },
    getHotItems(number){
      this.$axios({
        method:'get',
        url:'/item/getHotItems',
        params:{
          number:number
        }
      }).then(res=>{
        this.data.hot = res.data.data;
      }).catch(error=>{
        this.$Notice.open({
          title:"错误",
          desc:"服务器开小差了，请待会儿再试"
        });
      });
    },
		getDifferentCommentTypeNumber(){
			for(var i = 0; i < this.dataTable.length; i++){
				if(this.dataTable[i].values==5){
					this.data.remarks.remarksNumDetail[0] += 1;
				}else if(this.dataTable[i].values==3){
					this.data.remarks.remarksNumDetail[1] += 1;
				}else{
					this.data.remarks.remarksNumDetail[2] += 1;
				}
			}
			var temp = this.data.remarks.remarksNumDetail[0]+this.data.remarks.remarksNumDetail[1]+this.data.remarks.remarksNumDetail[2];
			if(temp==0){
				this.data.remarks.goodAnalyse = 100;
			}else{
				this.data.remarks.goodAnalyse = this.data.remarks.remarksNumDetail[0] * 100.0/ temp;
			}
		},
		getComments(itemId){
			this.$axios({
				method:'get',
				url:'/item/getComments',
				params:{
					itemId:itemId
				}
			}).then(res=>{
				this.dataTable = res.data.data;
        if (this.dataTable.length == 1 && this.dataTable[0].createTime == null) {
          this.dataTable.splice(0, 1);
        }
				this.handleListApproveHistory();
				this.getDifferentCommentTypeNumber();
			}).catch(error=>{
        this.$Notice.open({
          title:"错误",
          desc:"获得评论失败"
        });
			});
		},
    getIntroImg(itemId){
      this.$axios({
        method:'get',
        url:'/item/getIntroImg',
        params:{
          itemId:itemId
        }
      }).then(res=>{
        this.data.goodsDetail = this.stringHandler(res.data.data);
      }).catch(error=>{
        this.$Notice.open({
          title:"错误",
          desc:"服务器开小差了，请待会儿再试"
        });
      });
    }
  },
  components: {
    ShowProductWarranty
  }
};
</script>

<style scoped>
.show-goods-detail-div {
  position: relative;
  width: 1226px;
  height: auto;
  margin: 0 auto;
}
/***************商品详情介绍和推荐侧边栏开始***************/
.item-intro-show{
  width: 90%;
  margin: 15px auto;
  display: flex;
  flex-direction: row;
  background-color: #fff;
}
.item-intro-recommend{
  width: 200px;
  display: flex;
  flex-direction: column;
}
.item-intro-recommend-column{
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 5px #999;
}
.item-recommend-title{
  width: 100%;
  height: 38px;
  font-size: 16px;
  line-height: 38px;
  color: #fff;
  background-color: #E4393C;
  box-shadow: 0px 0px 5px #E4393C;
  text-align: center;
}
.item-recommend-column{
  margin-top: 15px;
}
.item-recommend-intro{
  padding: 5px 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
  cursor: pointer;
}
.item-recommend-img{
  width: 80%;
  margin: 0px auto;
  cursor: pointer;
}
.item-recommend-img img{
  width: 100%;
}
.item-recommend-top-num{
  color: #fff;
  margin: 0px 2px;
  padding: 1px 5px;
  border-radius: 12px;
  background-color: #E4393C;
}
.item-recommend-price{
  color: #E4393C;
  font-weight: bolder;
}
.item-intro-detail{
  margin-left: 30px;
  width: calc(80vw - 300px);
}
.item-intro-nav{
  width: 100%;
  height: 38px;
  background-color: #F7F7F7;
  border-bottom: 1px solid #E4393C;
}
.item-intro-nav ul{
  margin: 0px;
  padding: 0px;
  list-style: none;
}
.item-intro-nav li{
  float: left;
  height: 100%;
  width: 120px;
  line-height: 38px;
  text-align: center;
  color: #E4393C;
}
.item-intro-nav li:first-child{
  background-color: #E4393C;
  color: #fff;
}
.item-intro-img{
  width: 100%;
}
.item-intro-img img{
  width: 100%;
}
/************* 商品参数 *************/
.item-param-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
}
.item-param-box {
  padding: 5px;
  padding-left: 30px;
  width: 240px;
  height: 36px;
  font-size: 14px;
  /* text-align: center; */
  /* background-color: #ccc; */
}
.item-param-title {
  color: #232323;
}
.item-param-content {
  color: #999;
}
.remarks-title {
  padding-left: 15px;
  height: 36px;
  font-size: 16px;
  font-weight: bolder;
  line-height: 36px;
  color: #666666;
  background-color: #F7F7F7;
}
.remarks-analyse-box {
  padding: 15px;
  display: flex;
  align-items: center;
}
.remarks-analyse-goods {
  margin-left: 15px;
  margin-right: 15px;
}
.remarks-analyse-num {
  font-size: 26px;
}
.remarks-analyse-title {
  font-size: 12px;
  line-height: 20px;
}
.remarks-bar {
  padding-left: 15px;
  height: 36px;
  line-height: 36px;
  color: #666666;
  background-color: #F7F7F7;
}
.remarks-bar span {
  margin-right: 15px;
}
.remarks-box {
  padding: 15px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px #ccc dotted;
}
.remarks-user {
  width: 180px;
}
.remarks-user-name {
  padding-left: 15px;
}
.remarks-content-box {
  width: calc(100% - 180px);
}
.remarks-star {
  background-color: #fff;
}
.remarks-content {
  font-size: 14px;
  color: #232323;
  line-height: 28px;
}
.remarks-sub {
  margin-top: 15px;
  color: #ccc;
}
.remarks-time {
  margin-left: 15px;
}
.remarks-page {
  margin: 15px;
  display: flex;
  justify-content:flex-end;
}
/***************商品详情介绍和推荐侧边栏结束***************/
</style>

<style>
/* 改变便签页样式 */
.ivu-tabs-ink-bar {
  background-color: #E4393C !important;
}
.item-tabs > .ivu-tabs > .ivu-tabs-bar .ivu-tabs-tab{
  border-radius: 0px;
  color: #999;
  height: 38px;
  background: #F7F7F7;
}
.item-tabs > .ivu-tabs > .ivu-tabs-bar .ivu-tabs-tab-active{
  color: #fff;
  background-color: #E4393C;
}
.item-tabs > .ivu-tabs > .ivu-tabs-bar .ivu-tabs-tab-active:before{
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  color: #fff;
  background: #F7F7F7;
  position: absolute;
  top: 0;
  left: 0;
}
.ivu-rate-star-full:before, .ivu-rate-star-half .ivu-rate-star-content:before {
  color: #E4393C;
}
</style>
