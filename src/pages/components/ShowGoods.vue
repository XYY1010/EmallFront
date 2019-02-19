<template>
  <div class="show-goods-div">
    <div class="item-detail-show">
      <div class="item-detail-left">
        <div class="item-detail-big-img">
          <my-magnify :url="data.goodsImg[imgIndex]" id="magnify_img" :scale="2"></my-magnify>
        </div>
        <div class="item-detail-img-row">
          <div class="item-detail-img-small" v-for="(item, index) in data.goodsImg" :key="index" @mouseover="showBigImg(index)">
            <img :src="item" alt="">
          </div>
        </div>
      </div>
      <div class="item-detail-right">
        <div class="item-detail-title">
          <p>
            <span class="item-detail-express">校园配送</span> {{data.itemTitle}}</p>
        </div>
        <div class="item-detail-tag">
          <p>
            <span v-for="(item,index) in data.tags" :key="index">【{{item}}】</span>
          </p>
        </div>
        <div class="item-detail-price-row">
          <div class="item-price-left">
            <div class="item-price-row">
              <p>
                <span class="item-price-title">价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</span>
                <span class="item-price">￥{{price.toFixed(2)}}</span>
              </p>
            </div>
            <div class="item-price-row">
              <p>
                <span class="item-price-title">优 惠 价</span>
                <span class="item-price-full-cut" v-for="(item,index) in data.discount" :key="index">{{item}}</span>
              </p>
            </div>
            <div class="item-price-row">
              <p>
                <span class="item-price-title">促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</span>
                <span class="item-price-full-cut" v-for="(item,index) in data.promotion" :key="index">{{item}}</span>
              </p>
            </div>
          </div>
          <div class="item-price-right">
            <div class="item-remarks-sum">
              <p>累计销量</p>
              <p>
                <span class="item-remarks-num">{{data.itemSales}} 件</span>
              </p>
							<p>库存</p>
							<p>
							  <span class="item-remarks-num">{{stock}} 件</span>
							</p>
            </div>
          </div>
        </div>
				<!-- 显示商品属性选择标签 -->
          <div class="item-select" v-for="(meal,index) in data.setMeal" :key="index">
              <div class="item-select-title">
                <p>{{meal.attrName}}</p>
              </div>
              <div class="item-select-column">
                <div class="item-select-row">
                    <div class="item-select-box" v-for="(item,index1) in meal.value"
										:key="index1" @click="handlerClick(index,index1)"
										v-bind:class="{'mealselect':data.setMeal[index].value[index1].select}">
                        <div class="item-select-img" v-show="item.attrImg">
                          <img :src="item.attrImg" atr="">
                        </div>
                        <div class="item-select-intro">
                          <p>{{item.attrValue}}</p>
                        </div>
                    </div>
                </div>
              </div>
          </div>
        <br>
        <div class="add-buy-car-box">
          <div class="add-buy-car">
            <InputNumber :min="1" v-model="count" size="large"></InputNumber>
            <Button type="error" size="large" :disabled="btnUnClickAble" @click="addShoppingCartBtn()">加入购物车</Button>
            <Button type="error" size="large" :disabled="btnUnClickAble" @click="buyNowBtn()">立即购买</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import store from '@/vuex/store';
// import { mapState, mapActions } from 'vuex';
import MyMagnify from "./MyMagnify.vue";
import itemMessage from '../../vuex/item.js';
import userMessage from '../../vuex/user.js';
export default {
  name: 'ShowGoods',
  components: {
    MyMagnify
  },
  data () {
    return {
      itemId:'',
	  stockId:'',
	  mealId:[],
	  itemInfo:{},
	  userInfo:{},
	  stock:'',
      price: 0,
      count: 1,
      selectBoxIndex: 0,
      imgIndex: 0,
	  btnUnClickAble:false,
      data:{
        goodsImg: [
        ],
        itemTitle: '',
        tags: ['送钢化膜', '次日到达'],
        discount: ['满148减10', '满218减20', '满288减30'],
        promotion: ['跨店满减', '多买优惠'],
        itemSales:'',
        setMeal: []
      }
    }
  },
  methods: {
    fun:function(){
      var o = document.getElementById("magnify_img");
      var oLeft =o.offsetLeft ;
      var oParent;
      while(o.offsetParent!=null) {
        oParent = o.offsetParent
        oLeft += oParent.offsetLeft
        o = oParent
      }
      return oLeft
    },
    showBigImg (index) {
      this.imgIndex = index;
    },
		//获得属性标签集
		getAttrVals(){
			var i = 0;
			var j = 0;
			var attrVals = '';
			for(i = 0; i < this.data.setMeal.length; i++){
				for(j = 0; j < this.data.setMeal[i].value.length; j++){
					if(this.data.setMeal[i].value[j].select == true){
						attrVals += this.data.setMeal[i].value[j].attrValue + ' ';
					}
				}
			}
			return attrVals;
		},
		//获得属性图片
		getAttrImg(){
			var i = 0;
			var j = 0;
			for(i = 0; i < this.data.setMeal.length; i++){
				for(j = 0; j < this.data.setMeal[i].value.length; j++){
					if(this.data.setMeal[i].value[j].select == true&&this.data.setMeal[i].value[j].attrImg!=""){
						return this.data.setMeal[i].value[j].attrImg;
					}
				}
			}
		},
		//添加购物车
    addShoppingCartBtn () {
			this.$axios({
				method:'post',
				url:'/shoppingcart/addnew',
				params:{
					itemId:this.itemInfo.itemId,
					itemTitle:this.data.itemTitle,
					userId:this.userInfo.userId,
					stockId:this.stockId,
					attrVals:this.getAttrVals(),
					attrImg:this.getAttrImg(),
					price:this.price,
					amount:this.count
				}
			}).then(res=>{
        let result = res.data;
        console.log(result);
        if (result.status == 'success') {
          this.$Message.success('添加成功！');
          this.$router.push("/shoppingcart");
        } else {
          this.$Notice.open({
            title: "错误" + this.result.data.errCode,
            desc: this.result.data.errMsg
          });
        }
			}).catch(error=>{
				this.$Notice.open({
					title:"错误",
					desc:"加入购物车失败"
				});
			});
    },
		//立即购买
		buyNowBtn(){

		},
		//处理商品图片字符串
    stringHandler(str){
      str = str.replace(/[\'\"\\\b\f\n\r\t]/g, '');
      return str.split(",");
    },
		//获得商品的详情
    getItemDetail(itemId){
      this.$axios({
        method:'get',
        url:'/item/getItemDetail',
        params:{
          itemId:itemId
        }
      }).then(res=>{
        const data = res.data.data;
				this.data.setMeal = data.meal;
        this.data.itemTitle = data.itemTitle;
        this.data.itemSales = data.itemSales;
        this.data.goodsImg = this.stringHandler(data.itemDetailImage);
      }).catch(error=>{
        this.$Notice.open({
          title:"错误",
          desc:"获得商品详情失败"
        });
      });
    },
		//获得商品的价格
		getItemPrizeAndStock(itemId,symbol){
			this.$axios({
			  method:'get',
			  url:'/item/getItemPrizeAndStock',
			  params:{
			    itemId:itemId,
					symbol:symbol
			  }
			}).then(res=>{
				if(res.data.status == 'false'){
					this.stock = 0;
					this.price = 0;
					this.btnUnClickAble = true;
				}else {
					this.price = res.data.data.price;
					this.stock = res.data.data.stock;
					this.stockId = res.data.data.stockId;
					this.btnUnClickAble = false;
				}
			}).catch(error=>{
			  this.$Notice.open({
			    title:"错误",
			    desc:"获得商品价格失败"
			  });
			});
		},
		//点击商品属性处理事件
		handlerClick(index,index1){
			//alert(index + " " + index1);
			var flag = true;
			var symbol = '';
			var i = 0;
			var j = 0;
			for(j = 0; j < this.data.setMeal[index].value.length; j++){
				this.data.setMeal[index].value[j].select = false;
			}
			this.data.setMeal[index].value[index1].select = true;
			this.mealId[index] = this.data.setMeal[index].value[index1].symbol;
			for(i = 0; i < this.data.setMeal.length; i++){
				if(this.mealId[i]==null) flag = false;
			}
			if(flag == true){
				symbol = this.mealId[0];
				for(i = 1; i < this.data.setMeal.length; i++){
					symbol += "," + this.mealId[i];
				}
				this.getItemPrizeAndStock(this.itemId,symbol);
			}
		}
  },
  mounted () {
		this.itemInfo = this.$store.getters.item;
		this.userInfo = this.$store.getters.user;
		this.itemId = this.itemInfo.itemId;
		this.price = this.itemInfo.price;
		this.stock = this.itemInfo.stock;
    this.getItemDetail(this.itemId);
  },

};
</script>

<style scoped>
.show-goods-div {
  position: relative;
  width: 1226px;
  height: auto;
  margin: 0 auto;
}
/******************商品图片及购买详情开始******************/
.item-detail-show {
  width: 90%;
  margin: 15px auto;
  display: flex;
  flex-direction: row;
  background-color: #fff;
}
.item-detail-left {
  width: 350px;
  margin-right: 30px;
}
.item-detail-big-img {
  width: 350px;
  height: 350px;
  box-shadow: 0px 0px 8px #ccc;
  cursor: pointer;
}
.item-detail-big-img my-magnify {
  width: 100%;
}
.item-detail-img-row {
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.item-detail-img-small {
  width: 68px;
  height: 68px;
  box-shadow: 0px 0px 8px #ccc;
  cursor: pointer;
}
.item-detail-img-small img {
  width: 100%;
}
/*商品选购详情*/
.item-detail-right {
  display: flex;
  flex-direction: column;
}
.item-detail-title p {
  color: #666;
  font-size: 20px;
}
.item-detail-express {
  font-size: 14px;
  padding: 2px 3px;
  border-radius: 3px;
  background-color: #e4393c;
  color: #fff;
}
/*商品标签*/
.item-detail-tag {
  font-size: 12px;
  color: #e4393c;
}
/*价格详情等*/
.item-detail-price-row {
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #f3f3f3;
}
.item-price-left {
  display: flex;
  flex-direction: column;
}
.item-price-title {
  color: #999999;
  font-size: 14px;
  margin-right: 15px;
}
.item-price-row {
  margin: 5px 0px;
}
.item-price {
  color: #e4393c;
  font-size: 23px;
  cursor: pointer;
}
.item-price-full-cut {
  margin-right: 5px;
  padding: 3px;
  color: #e4393c;
  font-size: 12px;
  background-color: #ffdedf;
  border: 1px dotted #e4393c;
  cursor: pointer;
}
.item-remarks-sum {
  padding-left: 8px;
  border-left: 1px solid #ccc;
}
.item-remarks-sum p {
  color: #999999;
  font-size: 12px;
  line-height: 10px;
  text-align: center;
}
.item-remarks-num {
  line-height: 18px;
  color: #005eb7;
}
.item-select {
  display: flex;
  flex-direction: row;
  margin-top: 15px;
}
.item-select-title {
  color: #999999;
  font-size: 14px;
  margin-right: 15px;
}
.item-select-column {
  display: flex;
  flex-direction: column;
}
.item-select-row {
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
}
.item-select-box {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.item-select-img {
  width: 36px;
}
.item-select-box {
  padding: 5px;
  margin-right: 8px;
  background-color: #f7f7f7;
  border: 0.5px solid #ccc;
  cursor: pointer;
}
.item-select-box:hover {
  border: 0.5px solid #e3393c;
}
.item-select-box-active {
  border: 0.5px solid #e3393c;
}
.item-select-img img {
  width: 100%;
}
.item-select-intro p {
  margin: 0px;
  padding: 5px;
}
.item-select-class {
  padding: 5px;
  margin-right: 8px;
  background-color: #f7f7f7;
  border: 0.5px solid #ccc;
  cursor: pointer;
}
.item-select-class:hover {
  border: 0.5px solid #e3393c;
}
.add-buy-car-box {
  width: 100%;
  margin-top: 15px;
  border-top: 1px dotted #ccc;
}
.add-buy-car {
  margin-top: 15px;
}
.mealselect
{
background-color:#FF0000;
}
/******************商品图片及购买详情结束******************/
</style>
