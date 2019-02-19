<template>
  <div class="boxes-container">
    <div class="boxes">
      <div class="boxes-top clearfix">
        <h3 class="top-title">手机</h3>
        <a href="#" target="_blank">
          <span class="top-sub">
            查看全部
            <Icon type="ios-arrow-forward" size="29" />
          </span>
        </a>
      </div>
      <div class="boxes-content clearfix">
        <div class="box-left">
          <a href="#">
            <img src="https://i1.mifile.cn/a4/xmad_1544580545953_UvEXK.jpg" alt=""/>
          </a>
        </div>
        <div class="box-right">
          <ul class="box-list">
            <li class="box-item" v-for="good in goods">
              <span class="discount-label" :class="good.discountType">
                {{good.discount}}
              </span>
              <a :href="good.sourceUrl" target="_blank">
                <img :src="good.imgUrl" alt=""/>
                <h3 class="box-title">{{good.title}}</h3>
              </a>
              <p class="box-desc">
                {{good.desc}}
              </p>
              <p class="box-price">
                {{good.price}}元
                <template v-if="good.discountType === 'discount'">
                  <span class="old-price">
                    {{good.oldPrice}}元
                  </span>
                </template>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "phone",
  data() {
    return {
      goods: [
        {sourceUrl: '//item.mi.com/1161200059.html', imgUrl: 'https://i1.mifile.cn/a1/pms_1537323963.1278763!220x220.jpg', title: '小米8 青春版 4GB+64GB', desc: '潮流镜面渐变色，2400万自拍旗舰', price: '1299', discountType: 'new', discount: '新品'},
        {sourceUrl: '//www.mi.com/mibicycle/', imgUrl: 'https://i1.mifile.cn/a1/pms_1545457703.71734471!220x220.png', title: '小米Play', desc: '内置每月10GB高速流量，高颜值流光渐变色', price: '1099', discountType: 'new', discount: '新品'},
        {sourceUrl: '//www.mi.com/mitu/', imgUrl: 'https://i1.mifile.cn/a1/pms_1527685277.65255600!220x220.jpg', title: '小米8 SE 6GB+64GB', desc: 'AI 超感光双摄，三星 AMOLED 屏幕', price: '1699', oldPrice: '1999', discountType: 'discount', discount: '减300元'},
        {sourceUrl: '//www.mi.com/water2/', imgUrl: 'https://i1.mifile.cn/a1/pms_1522034061.12391230!220x220.jpg', title: '小米MIX 2S 8GB+256GB', desc: '骁龙845 年度旗舰处理器，艺术品般陶瓷机身', price: '3399', oldPrice: '3999', discountType: 'discount', discount: '减600元'},
        {sourceUrl: '//www.mi.com/ihealth/ ', imgUrl: 'https://i1.mifile.cn/a1/pms_1524621350.77238418!220x220.jpg', title: '小米6X 6GB+128GB', desc: '轻薄美观的拍照手机', price: '1499', oldPrice: '1999', discountType: 'discount', discount: '享八折'},
        {sourceUrl: '//www.mi.com/dianfanbao/', imgUrl: 'https://i1.mifile.cn/a1/pms_1531878001.22998509!220x220.jpg', title: '小米Max 3 4GB+64GB', desc: '', price: '1599', oldPrice: '1699', discountType: 'discount', discount: '减100元'},
        {sourceUrl: '//item.mi.com/1163200015.html', imgUrl: 'https://i1.mifile.cn/a1/pms_1529635747.42979757!220x220.jpg', title: '红米6 Pro', desc: '高颜值大电量 红米旗舰', price: '1029', oldPrice: '1299', discountType: 'discount', discount: '享八折'},
        {sourceUrl: '//list.mi.com/accessories/tag?id=guangganban', imgUrl: 'https://i1.mifile.cn/a1/pms_1528719461.20891365!220x220.jpg', title: '红米6A 2GB+16GB', desc: '', price: '549', oldPrice: '599', discountType: 'discount', discount: '减50元'}
      ]
    }
  }
}
</script>

<style scoped>
.boxes-container {
  width: 100%;
  height: auto;
  padding-top: 60px;
  margin-top: 15px;
  background: #f5f5f5;
}
.boxes {
  position: relative;
  width: 1226px;
  height: auto;
  margin: 0 auto;
}
.boxes-top {
  width: 100%;
  height: 58px;
}
.top-title {
  float: left;
  margin: 0;
  font-size: 22px;
  font-weight: 200px;
  line-height: 58px;
  color: #333;
}
.top-sub {
  float: right;
  display: block;
  font-size: 16px;
  line-height: 58px;
  color: #424242;
  cursor: pointer;
}
.top-sub:hover {
  color: #A013EB;
}
.box-left {
  float: left;
  width: 234px;
  height: 614px;
  cursor: pointer;
  transition: all 0.3s;
}
.box-left img {
  width: 234px;
  height: 614px;
}
.box-left:hover {
  transform: translateY(-1px);
  box-shadow: 5px 5px 20px #ccc;
}
.box-right {
  float: left;
  width: 992px;
  height: 628px;
}
.box-right .box-list {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}
.box-right .box-item {
  position: relative;
  margin: 0 0 14px 14px;
  padding: 20px 0;
  width: 234px;
  height: 300px;
  background: #fff;
  list-style: none;
  transition: all 0.3s;
}
.box-right .box-item:hover {
  transform: translateY(-1px);
  box-shadow: 5px 5px 20px #ccc;
}
.box-right .box-item .discount-label {
  position: absolute;
  top: 0;
  left: 50%;
  width: 64px;
  height: 20px;
  line-height: 20px;
  margin-left: -32px;
  font-size: 12px;
  text-align: center;
  color: #fff;
  z-index: 4;
}
.box-right .box-item .discount-label.free {
  background-color: #ffac13;
}
.box-right .box-item .discount-label.new {
  background-color: #83c44e;
}
.box-right .box-item .discount-label.discount {
  background-color: #e53935;
}
.box-right .box-item img {
  display: block;
  width: 160px;
  height: 160px;
  margin: 0 auto;
}
.box-right .box-item .old-price {
  color: #b0b0b0;
  text-decoration: line-through;
}
.box-right .box-item .box-title {
  font-size: 14px;
  text-align: center;
  color: #333;
  font-weight: normal;
}
.box-right .box-item .box-desc {
  margin: 0 10px 10px;
  height: 18px;
  font-size: 12px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: #b0b0b0;
}
.box-right .box-item a {
  text-decoration: none;
}
.box-right .box-item .box-price {
  color: #A013EB;
  font-size: 14px;
  text-align: center;
}
</style>
