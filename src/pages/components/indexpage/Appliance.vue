<template>
  <div class="boxes-container">
  <div class="around-container">
      <div class="goods-top clearfix">
        <h3 class="top-title">家电</h3>
        <ul class="top-sub">
          <li v-for="sub in subs" :class="{'active' : topSubStatus === sub.key}" @mouseenter="topSubEnter(sub.key)" style="list-style: none;">{{sub.name}}</li>
        </ul>
      </div>
      <div class="goods-content clearfix">
        <goods-left :left-goods="leftGoods"></goods-left>
        <goods-right :curr-goods="currGoods"></goods-right>
      </div>
     </div>
     </div>
</template>

<script>
import GoodsTop from './GoodsTop.vue';
import GoodsRight from './GoodsRight.vue';
import GoodsLeft from './GoodsLeft.vue';
export default {
  name: "appliance",
  data() {
    return {
      topTitle: '家电',
			subs: [
				{name: '热门', key: 'hot'},
				{name: '电视影音', key: 'tv'},
				{name: '电脑', key: 'laptop'},
				{name: '家居', key: 'home'}
			],
			currGoods: [],
			topSubStatus: 'hot',
			leftGoods: [
				{sourceUrl: '', imgUrl: 'https://i1.mifile.cn/a4/xmad_15232433421155_vCzhJ.jpg'},
				{sourceUrl: '', imgUrl: 'https://i1.mifile.cn/a4/xmad_15123939053142_dFlAw.jpg'}
			],
			hot: [
				{sourceUrl: '', imgUrl: 'https://i1.mifile.cn/a1/pms_1532079051.54116111!220x220.jpg', title: '米家互联网空调', price: '2199', desc: '1.5匹变频 / 高效制冷热 / AI远程控制',
				reviewDesc: '已安装好了，是不是很气派', reviewAuthor: '孙李', reviewStatus: true},
				{sourceUrl: '', imgUrl: 'https://i1.mifile.cn/a1/pms_1547450131.90883073!220x220.jpg', title: '米家激光投影电视4K', price: '14999', desc: '',
				reviewDesc: '外观很好，手感不错，质感不错，稳重大气！投影效果杠杠的', reviewAuthor: 'ideal', reviewStatus: true, discountType: 'new', discount: '新品'},
				{sourceUrl: '', imgUrl: 'https://i1.mifile.cn/a4/xmad_15350951136177_QUuVm.png', title: '15.6"笔记本 i5 4G MX110', price: '4199',
				reviewDesc: '办公用很合适，物美价廉，小米的忠实粉丝', reviewAuthor: '漂泊', reviewStatus: true,discountType: 'new', discount: '新品'},
				{sourceUrl: '', imgUrl: 'https://i1.mifile.cn/a1/pms_1524636075.71677607!220x220.jpg', title: '13.3"小米笔记本Air 四核i7 8G 256G MX150 银色', price: '5999',
				reviewDesc: '轻薄完美，深空灰超帅！', reviewAuthor: '1*215219', reviewStatus: true},
				{sourceUrl: '', imgUrl: 'https://i1.mifile.cn/a4/xmad_14972549116226_tZpod.png', title: '米家空气净化器Pro', price: '1499', desc: 'OLED 显示屏幕 / 激光颗粒物传感器',
				reviewDesc: '小小的 喜欢 希望可以用久一点 还是不错的', reviewAuthor: '云_(:зゝ∠)_', reviewStatus: true},
				{sourceUrl: '', imgUrl: 'https://i1.mifile.cn/a1/pms_1504498936.11861982!220x220.jpg', title: '米家电水壶', price: '99', desc: '一杯水，是一家人的安心',
				reviewDesc: '变成忠实的米粉了，烧水很快声音也小，顺便晒几张小米8...', reviewAuthor: '针掉在路上', reviewStatus: true},
				{sourceUrl: '', imgUrl: 'https://i1.mifile.cn/a4/xmad_15281923207128_rOfDp.png', title: '米家LED吸顶灯', price: '399', desc: '用光线，还原理想生活',
				reviewDesc: '个头有点大哦，计划客餐厅各装一个。', reviewAuthor: '七月是季末', reviewStatus: true},
				{moreUrl: '', sourceUrl: '', imgUrl: 'https://i1.mifile.cn/a1/pms_1521634907.16181074!220x220.jpg', title: '小米净水器（厨下式）', price: '1999', moreItem: '热门'}
			],
			tv: [
				{sourceUrl: '', imgUrl: 'https://i1.mifile.cn/a1/pms_1539315570.63599432!220x220.jpg', title: '小米电视4X 43英寸', price: '1399',
				reviewDesc: '电视很好，够清晰，这个价格打特价很划算.', reviewAuthor: '1432693760', reviewStatus: true, discountType: 'new', discount: '新品'},
				{sourceUrl: '', imgUrl: 'https://i1.mifile.cn/a1/pms_1510111588.69169839!220x220.jpg', title: '小米电视4 55英寸', price: '3699', oldPrice: '3999', discountType: 'discount', discount: '减300元', desc: '4.9mm 极超薄机身 / 2GB+8GB 大内存空间',
				reviewDesc: '很惊艳，全家人都很喜欢，感觉有点买小了！效果也不错', reviewAuthor: '妳狠重要', reviewStatus: true},
				{sourceUrl: '', imgUrl: 'https://i1.mifile.cn/a1/pms_1500287084.72131750!220x220.jpg', title: '小米电视4A 32英寸', price: '899', desc: '64位四核处理器 / 1GB+4GB大内存',
				reviewDesc: '放在次卧，看着刚好，清晰度能接受，一台红米的这个价格...', reviewAuthor: '▓▓▓▓', reviewStatus: true, discountType: 'discount', discount: '减100元', oldPrice: '999'},
				{sourceUrl: '', imgUrl: 'https://i1.mifile.cn/a1/pms_1522318330.86967810!220x220.jpg', title: '小米电视4C 50英寸', price: '1899', desc: '4K HDR / 人工智能语音',
				reviewDesc: '朋友同事来家都说电视超值，非常棒，花最少的钱，享最好...', reviewAuthor: '煎饼', reviewStatus: true, oldPrice: '39', discountType: 'discount', discount: '减300', oldPrice: '2199'},
				{sourceUrl: '', imgUrl: 'https://i1.mifile.cn/a1/pms_1539855763.04646220!220x220.jpg', title: '小米电视4A 58英寸', price: '2499',
				reviewDesc: '电视非常大，智能语言遥控，画面清析，效果好，这是第二...', reviewAuthor: '大民', reviewStatus: true, discountType: 'new', discount:'新品'},
				{sourceUrl: '', imgUrl: 'https://i1.mifile.cn/a1/pms_1540366231.87578189!220x220.jpg', title: '小米电视4 65英寸全面屏旗舰版', price: '5999',
				reviewDesc: '电视非常好，大气，非常清楚。我是相信小米，希望小米的...', reviewAuthor: '2171033765', reviewStatus: true, discountType: 'new', discount: '新品'},
				{sourceUrl: '', imgUrl: 'https://i1.mifile.cn/a1/pms_1499072633.96298268!220x220.jpg', title: '小米盒子3 增强版', price: '399', desc: '高端 4K 网络机顶盒',
				reviewDesc: '小米盒子3增强版外观精致，设计精巧，运行速度很快，操...', reviewAuthor: 'jin', reviewStatus: true, oldPrice: '449', discountType: 'discount', discount: '减50元'},
				{moreUrl: '', sourceUrl: '', imgUrl: 'https://i1.mifile.cn/a1/pms_1479190789.95594557!220x220.jpg', title: '小米盒子3s', price: '299', moreItem: '电视影音'}
			],
			laptop: [
				{sourceUrl: '', imgUrl: 'https://i1.mifile.cn/a1/pms_1533266333.04566853!220x220.jpg', title: '15.6 Pro i5 8G 1050MAX-Q 256G', price: '6299',
				reviewDesc: '很不错，这个价位没有比小米更好的了，用了几天 散热很...', reviewAuthor: '行走的tiger', reviewStatus: true},
				{sourceUrl: '', imgUrl: 'https://i1.mifile.cn/a1/pms_1525231579.56571137!220x220.jpg', title: '13.3"小米笔记本Air 四核i7 8G 256G MX150 深空灰', price: '5999',
				reviewDesc: '轻薄完美，深空灰超帅！', reviewAuthor: '1*215219', reviewStatus: true},
				{sourceUrl: '', imgUrl: 'https://i1.mifile.cn/a1/pms_1533196142.85059414!220x220.png', title: '小米游戏本15.6”8代i7 16G 1T+256G 1060 6G', price: '8999',
				reviewDesc: '16日10点下单，今天15点收到，请允许我用后再复评...', reviewAuthor: '楼春雨', reviewStatus: true, discountType: 'new', discount: '新品'},
				{sourceUrl: '', imgUrl: 'https://i1.mifile.cn/a1/pms_1524636075.71677607!220x220.jpg', title: '13.3"小米笔记本Air 四核i7 8G 256G MX150 银色', price: '5999',
				reviewDesc: '轻薄完美，深空灰超帅！', reviewAuthor: '1*215219', reviewStatus: true},
				{sourceUrl: '', imgUrl: 'https://i1.mifile.cn/a1/pms_1490595812.95661863!220x220.png', title: '小米无线鼠标', price: '69', desc: '耐脏亲肤涂层，人体工学设计',
				reviewDesc: '送给高中好兄弟，我觉得不错的，可是他也没说过，我能怎...', reviewAuthor: '胡伟强', reviewStatus: true},
				{sourceUrl: '', imgUrl: 'https://i1.mifile.cn/a1/pms_1478248566.62624407!220x220.jpg', title: '小米便携鼠标', price: '99', desc: '轻薄便携，铝合金外壳 +ABS 材质',
				reviewDesc: '鼠标质感很棒，性价比超高，好评好评。', reviewAuthor: 'Amian', reviewStatus: true},
				{sourceUrl: '', imgUrl: 'https://i1.mifile.cn/a1/pms_1490702347.3628109!220x220.png', title: '悦米机械键盘', price: '289', desc: '铝合金机身，TTC红轴，87 键',
				reviewDesc: '很喜欢很给力！希望大家支持', reviewAuthor: '画笔', reviewStatus: true},
				{moreUrl: '', sourceUrl: '', imgUrl: 'https://i1.mifile.cn/a1/pms_1469523170.25518983!220x220.jpg', title: '多功能转接器', price: '149', moreItem: '电脑'}
			],
			home: [
				{sourceUrl: '', imgUrl: 'https://i1.mifile.cn/a1/pms_1465366178.11466342!220x220.jpg', title: '米家恒温电水壶', price: '199', desc: '水温智能控制，304 不锈钢内胆',
				reviewDesc: '做工还有待改进，下面不是很整齐，有一些缝子，希望能改...', reviewAuthor: '799587060', reviewStatus: true},
				{sourceUrl: '', imgUrl: 'https://i1.mifile.cn/a1/pms_1506417289.23728408!220x220.jpg', title: '小米随身手电筒', price: '79', desc: '11 挡调光，随心而亮',
				reviewDesc: '小米手电好 我的家乡更美', reviewAuthor: '期待中的鱼', reviewStatus: true, discountType: 'new', discount: '新品'},
				{sourceUrl: '', imgUrl: 'https://i1.mifile.cn/a1/pms_1472609961.95298675!220x220.jpg', title: '米家扫地机器人', price: '1699', desc: '智能路径规划，扫得干净扫得快',
				reviewDesc: '外形可爱，但不超脱，中上水平。清扫能力确实厉害，但是...', reviewAuthor: '陈少游', reviewStatus: true},
				{sourceUrl: '', imgUrl: 'https://i1.mifile.cn/a1/pms_1510020567.64467830!220x220.jpg', title: '小米米家空气净化器 2S', price: '899', desc: 'OLED显示屏 / 激光颗粒物传感器',
				reviewDesc: '价格实惠，颜值高，哈哈。太棒了。。', reviewAuthor: 'Lo排Me骨ve', reviewStatus: true},
				{sourceUrl: '', imgUrl: 'https://i1.mifile.cn/a1/T1OVC_ByY_1RXrhCrK!220x220.jpg', title: '米家压力IH电饭煲', price: '999', desc: '智能烹饪，灰铸铁粉体涂层内胆',
				reviewDesc: '煮饭香喷喷，米妹子快来开饭了！', reviewAuthor: '朒朒鳥飝', reviewStatus: true},
				{sourceUrl: '', imgUrl: 'https://i1.mifile.cn/a1/pms_1496647119.81414190!220x220.jpg', title: '飞利浦智睿球泡灯', price: '49', desc: '自由调节亮度，Wi-Fi随时操控',
				reviewDesc: '很好，连接过程顺畅，远程操控灵敏', reviewAuthor: '潘咘咘', reviewStatus: true},
				{sourceUrl: '', imgUrl: 'https://i1.mifile.cn/a1/pms_1495520422.36514041!220x220.jpg', title: '米家 LED 智能台灯', price: '169', desc: '无可视频闪，四种场景优化调光',
				reviewDesc: '台灯挺漂亮，比想象的大，而且光源不错', reviewAuthor: '侯克魁', reviewStatus: true},
				{moreUrl: '', sourceUrl: '', imgUrl: 'https://i1.mifile.cn/a1/pms_1490756071.3088664!220x220.png', title: 'Yeelight LED 吸顶灯', price: '379', moreItem: '家居'}
			]
    }
  },
  mounted() {
    this.currGoods = this.hot;
  },
  methods: {
    topSubEnter(key) {
      this.topSubStatus = key;
      this.currGoods = this[key];
    }
  },
  components: {
    'goods-top': GoodsTop,
		'goods-left': GoodsLeft,
		'goods-right': GoodsRight
  }
}
</script>

<style scoped>
.boxes-container {
  width: 100%;
  height: auto;
  background: #f5f5f5;
}
.around-container {
	width: 1226px;
	height: auto;
	margin: 0 auto;
}
.goods-content {
	width: 1226px;
	height: auto;
	margin: 0 auto;
}
.goods-top {
	width: 100%;
	height: 58px;
}
.goods-top .top-title {
  float: left;
  margin: 0;
  font-size: 22px;
  font-weight: 200px;
  line-height: 58px;
  color: #333;
}
.goods-top .top-sub {
  float: right;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  font-size: 16px;
  margin-top: 16px;
  color: #424242;
}
.goods-top .top-sub li {
  width: auto;
  height: 24px;
  line-height: 24px;
  margin-left: 30px;
  cursor: pointer;
  border-bottom: 2px solid #f5f5f5;
}
.goods-top .top-sub li.active {
  color: #A013EB;
  border-bottom: 2px solid #A013EB;
}
</style>
