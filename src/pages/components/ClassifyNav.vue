<template>
  <div class="top-banner clearfix">
    <div class="site-category" @mouseleave="evtSlideLeave">
      <div class="top-side-left">
        <ul class="side-left">
          <li class="side-item" v-for="(item,index) in itemDetail" :key="index" @mouseenter="evtSlideEnter(index)">
            {{item.categoryName}}
          </li>
        </ul>
      </div>
      <div class="site-category-detail" v-show="goodsStatus">
        <ul class="category-items" v-for="goods in filterCurGoods">
          <li class="category-goods" v-for="item in goods">
            <a @click="clickHandler(item.itemId,item.sourceUrl)" class="goodslink">
              <img :src="item.imgUrl" alt="" style="width:50px; height:45px; float:left;"/>
              <div class="text-name">
                <font style="color: black;">{{item.name}}</font>
              </div>
            </a>
            <!-- <a class="goods-buy-link" v-show="item.buyStatus" :href="item.buyUrl">选购</a> -->
          </li>
        </ul>
      </div>
    </div>
    <Slide :banners="banners" ref="slide"/>
  </div>
</template>

<script>
import Slide from './Slide.vue';
export default {
  name: 'ClassifyNav',
  data() {
    return {
      curGoods: [],
      goodsStatus: false,
      banners: [
        
      ],
      itemDetail: [
      ]
    }
  },
  components: {
    Slide
  },
  methods: {
    evtSlideEnter(index) {
      this.curGoods = this.itemDetail[index].list;
      this.goodsStatus = true;
    },
    evtSlideLeave() {
      this.goodsStatus = false;
    },
    getShufflingFigure(){
      this.$axios({
        method:'get',
        url:'/shufflingFigureData/getAllShuffleFigure'        
      }).then(res=>{
        this.banners = res.data.data;
      }).catch(error=>{
        this.$Notice.open({
          title:"错误",
          desc:"显示轮播图失败"
        });
      });
    },
    getIndexCategory(){
      this.$axios({
        method:'get',
        url:'/category/getIndexCategory'
      }).then(res=>{
        this.itemDetail = res.data.data;
      }).catch(error=>{
        this.$Notice.open({
          title:"错误",
          desc:"显示分类列表失败"
        });
      });
    },
    clickHandler(itemId,url){
      this.$refs.slide.imgClicked(itemId,url);
    }
  },
  mounted() {
    this.getShufflingFigure();
    this.getIndexCategory();
  },
  computed: {
    filterCurGoods: function() {
      let filterGoods = [[], [], [], [], []];
      if (!this.curGoods) {
        return;
      }
      this.curGoods.forEach(function(item, index) {
        let goodsIndex = Math.floor(index / 6);
        filterGoods[goodsIndex].push(item);
      });
      return filterGoods;
    }
  }
}
</script>

<style scoped>
.top-banner {
  position: relative;
  width: 1226px;
  height: auto;
  margin: 0 auto;
}

.site-category {
  position: absolute;
  left: 0;
  top: 0;
  width: 235px;
  height: auto;
  padding: 20px 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.side-left {
  margin: 0;
  padding: 0;
  width: 235px;
  height: 420px;
  list-style: none;
}

.side-left .side-item {
  width: 100%;
  height: 42px;
  line-height: 42px;
  font-size: 14px;
  color: #fff;
  text-align: center;
  cursor: pointer;
}

.side-left .side-item:hover {
  background: #A013EB;
}

.site-category-detail {
  position: absolute;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  left: 235px;
  top: 0px;
  z-index: 10;
  border: 1px solid #e0e0e0;
  box-shadow: 3px 8px 16px rgba(0, 0, 0, 0.18);
}

.site-category-detail .category-items{
  width: auto;
  height: 460px;
  margin: 0;
  padding: 0;
  list-style: none;
  background: #fff;
}
.site-category-detail .category-goods {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 265px;
  height: 76.6px;
  padding: 0px 20px 0px 20px;
  box-sizing: border-box;
  background: #fff;
  cursor: pointer;
}

.site-category-detail .category-goods .goods-link {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 170px;
}

.site-category-detail .category-goods .text-name {
  float: left;
  padding-top: 15px;
  padding-left: 10px;
  font-size: 14px;
  text-decoration: none;
}

.site-category-detail .category-goods .goods-buy-link {
  display: block;
  width: 58px;
  height: 22px;
  line-height: 24px;
  font-size: 12px;
  text-align: center;
  color: #A013EB;
  border: 1px solid #A013EB;
  text-decoration: none;
}
.site-category-detail .category-goods .goods-buy-link:hover {
  color: #fff;
  background: #A013EB;
}
</style>
