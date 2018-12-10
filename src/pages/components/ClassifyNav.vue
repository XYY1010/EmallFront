<template>
  <div class="top-banner clearfix">
    <div class="site-category" @mouseleave="evtSlideLeave">
      <div class="top-side-left">
        <ul class="side-left">
          <li class="side-item" v-for="item in sideItems" @mouseenter="evtSlideEnter(item.type)">
            {{item.content}}
          </li>
        </ul>
      </div>
      <div class="site-category-detail" v-show="goodsStatus">
        <ul class="category-items" v-for="goods in filterCurGoods">
          <li class="category-goods" v-for="item in goods">
            <a :href="item.sourceUrl" class="goodslink">
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
    <Slide :banners="banners"/>
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
      sideItems: [
        {type: 'phones', content: '手机  电话卡'},
        {type: 'tvbox', content: '电视  盒子'},
        {type: 'computer', content: '笔记本  平板'},
        {type: 'appliances', content: '家电  插线板'},
        {type: 'outdoor', content: '出行  穿戴'},
        {type: 'router', content: '智能  路由器'},
        {type: 'accessories', content: '电源  配件'},
        {type: 'health', content: '健康  儿童'},
        {type: 'earphone', content: '耳机  音响'},
        {type: 'bag', content: '生活  箱包'},
      ],
      banners: [
        {sourceUrl: '/goodsdetail', imgUrl: 'http://139.199.125.60/xmad1.jpg'},
        {sourceUrl: '/goodsdetail', imgUrl: 'http://139.199.125.60/xmad2.jpg'},
        {sourceUrl: '/goodsdetail', imgUrl: 'http://139.199.125.60/xmad3.jpg'},
        {sourceUrl: '/goodsdetail', imgUrl: 'http://139.199.125.60/xmad4.jpg'},
        {sourceUrl: '/goodsdetail', imgUrl: 'http://139.199.125.60/xmad5.jpg'},
        {sourceUrl: '/goodsdetail', imgUrl: 'http://139.199.125.60/xmad6.jpg'},
      ],
      categoryDetail: {
        phones: [
				  {sourceUrl: '/goodslist', buyUrl: '/', imgUrl: 'http://139.199.125.60/xm5sp.png', name: '小米5s plus', buyStatus: true},
          {sourceUrl: '/goodslist', buyUrl: '/', imgUrl: 'http://139.199.125.60/xm5s.jpg', name: '小米5s', buyStatus: true},
          {sourceUrl: '/goodslist', buyUrl: '/', imgUrl: 'http://139.199.125.60/MIX.jpg', name: '小米mix', buyStatus: true},
          {sourceUrl: '/goodslist', buyUrl: '/', imgUrl: 'http://139.199.125.60/xm6.png', name: '小米6', buyStatus: true},
          {sourceUrl: '/goodslist', buyUrl: '/', imgUrl: 'http://139.199.125.60/xiaomiNOTE2.jpg', name: '小米Note2', buyStatus: true},
          {sourceUrl: '/goodslist', buyUrl: '/', imgUrl: 'http://139.199.125.60/max2.png', name: '小米Max2', buyStatus: true},
          {sourceUrl: '/goodslist', buyUrl: '/', imgUrl: 'http://139.199.125.60/mi5c.png', name: '小米5c', buyStatus: true},
          {sourceUrl: '/goodslist', buyUrl: '/', imgUrl: 'http://139.199.125.60/hm4.jpg', name: '红米4', buyStatus: true},
          {sourceUrl: '/goodslist', buyUrl: '/', imgUrl: 'http://139.199.125.60/hm4x.jpg', name: '红米4x', buyStatus: true},
          {sourceUrl: '/goodslist', buyUrl: '/', imgUrl: 'http://139.199.125.60/4g+.jpg', name: '移动4G+专区', buyStatus: true},
          {sourceUrl: '/goodslist', buyUrl: '/', imgUrl: 'http://139.199.125.60/compare.jpg', name: '手机对比服务', buyStatus: true},
          {sourceUrl: '/goodslist', buyUrl: '/', imgUrl: 'http://139.199.125.60/mimobile.jpg', name: '小米电话卡', buyStatus: true},
    			{sourceUrl: '/goodslist', imgUrl: 'http://139.199.125.60/baohutao.jpg', name: '手机保护套', buyStatus: false},
          {sourceUrl: '/goodslist', buyUrl: '/', imgUrl: 'http://139.199.125.60/xmyyong.png', name: '小米应用', buyStatus: true},
  			],
  			tvbox: [
          {sourceUrl: '/goodslist', imgUrl: 'http://139.199.125.60/xmds4a_43.png', name: '小米电视 43英寸', buyStatus: false},
  				{sourceUrl: '/goodslist', imgUrl: 'http://139.199.125.60/mitv3s48.jpg', name: '小米电视 48英寸', buyStatus: false},
          {sourceUrl: '/goodslist', imgUrl: 'http://139.199.125.60/xmds4a_49.png', name: '小米电视 49英寸', buyStatus: false},
          {sourceUrl: '/goodslist', imgUrl: 'http://139.199.125.60/mitv3s55.png', name: '小米电视 55英寸', buyStatus: false},
          {sourceUrl: '/goodslist', imgUrl: 'http://139.199.125.60/mitv3s60.png', name: '小米电视 60英寸', buyStatus: false},
          {sourceUrl: '/goodslist', imgUrl: 'http://139.199.125.60/xmds4a_65.jpg', name: '小米电视 65英寸', buyStatus: false},
          {sourceUrl: '/goodslist', imgUrl: 'http://139.199.125.60/mitv3s70.png', name: '小米电视 70英寸', buyStatus: false},
          {sourceUrl: '/goodslist', imgUrl: 'http://139.199.125.60/xm4a.png', name: '小米电视 80英寸', buyStatus: false},
          {sourceUrl: '/goodslist', imgUrl: 'http://139.199.125.60/mitv3sqm65.jpg', name: '小米电视 65英寸超清', buyStatus: false},
          {sourceUrl: '/goodslist', imgUrl: 'http://139.199.125.60/70dianshi.png', name: '小米电视 100英寸超清', buyStatus: false},
          {sourceUrl: '/goodslist', imgUrl: 'http://139.199.125.60/hz3.jpg', name: '小米盒子3', buyStatus: false},
          {sourceUrl: '/goodslist', imgUrl: 'http://139.199.125.60/hezi3s.jpg', name: '小米盒子3s', buyStatus: false},
          {sourceUrl: '/goodslist', imgUrl: 'http://139.199.125.60/mihezi3c.png', name: '小米盒子3c', buyStatus: false},
  			],
  			computer: [
  				{sourceUrl: '/goodslist', buyUrl: '/', imgUrl: 'http://139.199.125.60/bijiben12.5.jpg', name: '小米笔记本12.5寸', buyStatus: true},
    			{sourceUrl: '/goodslist', buyUrl: '/', imgUrl: 'http://139.199.125.60/bijiben13.3.jpg', name: '小米笔记本13.3寸', buyStatus: true},
          {sourceUrl: '/goodslist', buyUrl: '/', imgUrl: 'http://139.199.125.60/mipad3.png', name: '小米pad3', buyStatus: false},
          {sourceUrl: '/goodslist', buyUrl: '/', imgUrl: 'http://139.199.125.60/xmymjp.png', name: '小米键盘', buyStatus: true},
          {sourceUrl: '/goodslist', buyUrl: '/', imgUrl: 'http://139.199.125.60/shubiao.jpg', name: '小米鼠标', buyStatus: true},
          {sourceUrl: '/goodslist', buyUrl: '/', imgUrl: 'http://139.199.125.60/usbc-zjq.jpg', name: '转接器', buyStatus: true},
          {sourceUrl: '/goodslist', buyUrl: '/', imgUrl: 'http://139.199.125.60/xmjjsjb.jpg', name: '笔记本电脑双肩包', buyStatus: true},
          {sourceUrl: '/goodslist', buyUrl: '/', imgUrl: 'http://139.199.125.60/neidanbao.jpg', name: '内胆包', buyStatus: true},
  			],
  			appliances: [
          {sourceUrl: '/goodslist', buyUrl: '/', imgUrl: 'http://139.199.125.60/dfb.jpg', name: '电饭煲', buyStatus: false},
          {sourceUrl: '/goodslist', buyUrl: '/', imgUrl: 'http://139.199.125.60/mjdsh.jpg', name: '电水壶', buyStatus: false},
          {sourceUrl: '/goodslist', buyUrl: '/', imgUrl: 'http://139.199.125.60/mjsd.jpg', name: '扫地机器人', buyStatus: false},
          {sourceUrl: '/goodslist', buyUrl: '/', imgUrl: 'http://139.199.125.60/mjjhq.png', name: '净化器', buyStatus: false},
          {sourceUrl: '/goodslist', buyUrl: '/', imgUrl: 'http://139.199.125.60/jinghuaqilvxin.jpg', name: '净化器滤芯', buyStatus: false},
          {sourceUrl: '/goodslist', buyUrl: '/', imgUrl: 'http://139.199.125.60/mjled.png', name: '灯具', buyStatus: false},
  				{sourceUrl: '/goodslist', buyUrl: '/', imgUrl: 'http://139.199.125.60/cxb.jpg', name: '插线板', buyStatus: false},
  			],
  			outdoor: [
          {sourceUrl: '/goodslist', buyUrl: '/', imgUrl: 'http://139.199.125.60/mjczkqjhq.jpg', name: '车载空气净化器', buyStatus: false},
    		  {sourceUrl: '/goodslist', buyUrl: '/', imgUrl: 'http://139.199.125.60/jly.jpg', name: '记录仪', buyStatus: false},
        	{sourceUrl: '/goodslist', buyUrl: '/', imgUrl: 'http://139.199.125.60/VRPLAY3.png', name: 'VR', buyStatus: false},
      		{sourceUrl: '/goodslist', buyUrl: '/', imgUrl: 'http://139.199.125.60/phcplus.jpg', name: '平衡车', buyStatus: false},
      		{sourceUrl: '/goodslist', buyUrl: '/', imgUrl: 'http://139.199.125.60/wurenji.jpg', name: '无人机', buyStatus: false},
        	{sourceUrl: '/goodslist', buyUrl: '/', imgUrl: 'http://139.199.125.60/sh2.png', name: '手环', buyStatus: false},
  			],
  			router: [
  				{sourceUrl: '/goodslist', imgUrl: 'http://139.199.125.60/3C.png', name: '小米3C', buyStatus: false},
    			{sourceUrl: '/goodslist', imgUrl: 'http://139.199.125.60/3G.png', name: '小米3G', buyStatus: false},
  			],
  			accessories: [
  				{sourceUrl: '/goodslist', imgUrl: 'http://139.199.125.60/pinpaidianyuan.jpg', name: '品牌电源', buyStatus: false},
    			{sourceUrl: '/goodslist', imgUrl: 'http://139.199.125.60/5Battery2.jpg', name: '5号电池', buyStatus: false},
    			{sourceUrl: '/goodslist', imgUrl: 'http://139.199.125.60/7Battery2.jpg', name: '7号电池', buyStatus: false},
    			{sourceUrl: '/goodslist', imgUrl: 'http://139.199.125.60/16gcck.png', name: '16g存储卡', buyStatus: false},
    			{sourceUrl: '/goodslist', imgUrl: 'http://139.199.125.60/32gcck.png', name: '32g存储卡', buyStatus: false},
    			{sourceUrl: '/goodslist', imgUrl: 'http://139.199.125.60/usbc-dyspq.jpg', name: '线头', buyStatus: false},
    			{sourceUrl: '/goodslist', imgUrl: 'http://139.199.125.60/xfznsxj.jpg', name: '摄像头', buyStatus: false},
    			{sourceUrl: '/goodslist', imgUrl: 'http://139.199.125.60/xm2h1.jpg', name: 'USB线', buyStatus: false},
  			],
  			health: [
          {sourceUrl: '/goodslist', buyUrl: '/', imgUrl: 'http://139.199.125.60/ddys.jpg', name: '电动牙刷', buyStatus: false},
          {sourceUrl: '/goodslist', buyUrl: '/', imgUrl: 'http://139.199.125.60/mjpmjcy.jpg', name: '空气质量检测仪', buyStatus: false},
          {sourceUrl: '/goodslist', buyUrl: '/', imgUrl: 'http://139.199.125.60/mjxyj.jpg', name: '血压计', buyStatus: false},
  			],
  			earphone: [
  				{sourceUrl: '/goodslist', imgUrl: 'http://139.199.125.60/pinpai.jpg', name: '品牌耳机', buyStatus: false},
          {sourceUrl: '/goodslist', imgUrl: 'http://139.199.125.60/pocketaudio.png', name: '口袋音箱', buyStatus: false},
          {sourceUrl: '/goodslist', imgUrl: 'http://139.199.125.60/xiaogangpao2-hei.jpg', name: '小钢炮', buyStatus: false},
          {sourceUrl: '/goodslist', imgUrl: 'http://139.199.125.60/qtpro.jpg', name: '入耳式耳机', buyStatus: false},
          {sourceUrl: '/goodslist', imgUrl: 'http://139.199.125.60/tdsqs.jpg', name: '头戴式耳机', buyStatus: false},
          {sourceUrl: '/goodslist', imgUrl: 'http://139.199.125.60/bluetoothheadset.jpg', name: '蓝牙耳机', buyStatus: false},
  			],
  			bag: [
  				{sourceUrl: '/goodslist', imgUrl: 'http://139.199.125.60/mjtd.jpg', name: '台灯', buyStatus: false},
    			{sourceUrl: '/goodslist', imgUrl: 'http://139.199.125.60/mthjz.jpg', name: '脖枕', buyStatus: false},
      		{sourceUrl: '/goodslist', imgUrl: 'http://139.199.125.60/naozhong.jpg', name: '闹钟', buyStatus: false},
        	{sourceUrl: '/goodslist', imgUrl: 'http://139.199.125.60/tyj.jpg', name: '太阳镜', buyStatus: false},
          {sourceUrl: '/goodslist', imgUrl: 'http://139.199.125.60/tzc.jpg', name: '体重秤', buyStatus: false},
          {sourceUrl: '/goodslist', imgUrl: 'http://139.199.125.60/90flxx.jpg', name: '旅行箱', buyStatus: false},
          {sourceUrl: '/goodslist', imgUrl: 'http://139.199.125.60/bxjg.jpg', name: '变形杠精', buyStatus: false},
  			]
      }
    }
  },
  components: {
    Slide
  },
  methods: {
    evtSlideEnter(curType) {
      this.curGoods = this.categoryDetail[curType];
      this.goodsStatus = true;
    },
    evtSlideLeave() {
      this.goodsStatus = false;
    }
  },
  mounted() {
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
