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
                <span class="item-price-title">B I T 价</span>
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
            </div>
          </div>
        </div>
        <!-- 选择颜色 -->
        <div class="item-select">
          <div class="item-select-title">
            <p>选择颜色</p>
          </div>
          <div class="item-select-column">
            <div class="item-select-row" v-for="(items, index) in data.setMeal" :key="index">
              <div class="item-select-box" v-for="(item, index1) in items" :key="index1" @click="select(index, index1)" :class="{'item-select-box-active': ((index * 3) + index1) === selectBoxIndex}">
                <div class="item-select-img">
                  <img :src="item.img" alt="">
                </div>
                <div class="item-select-intro">
                  <p>{{item.intro}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br>
        <div class="add-buy-car-box">
          <div class="add-buy-car">
            <InputNumber :min="1" v-model="count" size="large"></InputNumber>
            <Button type="error" size="large" @click="addShoppingCartBtn()">加入购物车</Button>
            <Button type="error" size="large" @click="addShoppingCartBtn()">立即购买</Button>
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
export default {
  name: 'ShowGoods',
  components: {
    MyMagnify
  },
  data () {
    return {
      itemId:'',
      price: 0,
      count: 1,
      selectBoxIndex: 0,
      imgIndex: 0,
      data:{
        goodsImg: [
        ],
        itemTitle: '1234',
        tags: ['满69-20元', '关注产品★送钢化膜', 'BIT配次日达'],
        discount: ['满148减10', '满218减20', '满288减30'],
        promotion: ['跨店满减', '多买优惠'],
        itemSales:'',
        setMeal: []
      }
    }
  },
  computed: {
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
    select (index1, index2) {
      this.selectBoxIndex = index1 * 3 + index2;
      this.price = this.data.setMeal[index1][index2].price;
    },
    showBigImg (index) {
      this.imgIndex = index;
    },
    addShoppingCartBtn () {
      const index1 = parseInt(this.selectBoxIndex / 3);
      const index2 = this.selectBoxIndex % 3;
      const date = new Date();
      const goodsId = date.getTime();
      const data = {
        goods_id: goodsId,
        itemTitle: this.data.itemTitle,
        count: this.count,
        package: this.data.setMeal[index1][index2]
      };
      this.addShoppingCart(data);
      this.$router.push('/shoppingCart');
    },
    getItemDetail(itemId){
      this.$axios({
        method:'get',
        url:'/item/getItemDetail',
        params:{
          itemId:itemId
        }
      }).then(res=>{
        const data = res.data.data;
        this.data.itemTitle = data.itemTitle;  
        this.data.itemSales = data.itemSales;
        var str = data.itemDetailImage;
        str = str.replace(/[\'\"\\\b\f\n\r\t]/g, '');
        this.data.goodsImg = str.split(",");
      }).catch(error=>{
        this.$Notice.open({
          title:"错误",
          desc:"服务器开小差了，请待会儿再试"
        });
      });
    }
  },
  mounted () {
    console.log(itemMessage.state);
    this.itemId = itemMessage.state.itemId;
    this.getItemDetail(this.itemId);
  }
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
/******************商品图片及购买详情结束******************/
</style>
