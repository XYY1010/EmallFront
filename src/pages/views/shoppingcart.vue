<template>
  <div class="shopping-cart-div">
    <HeaderNav/>
    <ShoppingCartSearch/>
    <Alert show-icon class="tips-box" type="warning">
        小提示
        <Icon type="md-bulb" slot="icon"></Icon>
        <template slot="desc">请点击商品前的选择框，选择购物车中的商品，点击结算即可。</template>
    </Alert>
    <Modal
        v-model="modelStatus"
        title="提示"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>确定将该商品从购物车中移除吗？</p>
    </Modal>
    <Table height="500" border ref="selection" :columns="columns" :data="shoppingCart" :loading="loading" size="large" @on-selection-change="select" no-data-text="您的购物车空空如也~ 请先添加商品到购物车再点击购买"></Table>
    <div class="pay-container">
      <div class="pay-box">
        <p> <span>应付总金额</span> <span class="money"></span> <Icon type="logo-yen"></Icon> {{totalPrice.toFixed(2)}}</p>
        <div class="clear-btn">
          <Button type="error" long size="large" @click="clear()">结算</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderNav from '../components/HeaderNav.vue'
import ShoppingCartSearch from '../components/ShoppingCartSearch.vue'
export default {
  name: 'shoppingcart',
  data() {
    return {
      loading: false,
      modelStatus: false,
      rmIndex: -1,
      goodsSelectList: [],
      columns: [
        {
          type: 'selection',
          title: '全选',
          width: 58,
          align: 'center'
        },
        {
          title: '图片',
          key: 'img',
          width: 86,
          render: (h, params) => {
            return h('div', [
              h('img', {
                attrs: {
                  src: params.row.imgUrl,
                  style: "width:50px; height:40px;"
                }
              })
            ]);
          },
          align: 'center'
        },
        {
          title: '商品信息',
          width: 350,
          key: 'title',
          align: 'center'
        },
        {
          title: '规格',
          width: 300,
          key: 'requirement',
          align: 'center'
        },
        {
          title: '单价',
          key: 'price',
          width: 120,
          align: 'center'
        },
        {
          title: '数量',
          key: 'amount',
          width: 120,
          render: (h, params) => {
            return h('div', [
              h('InputNumber', {
                attrs: {
                  value: params.row.amount,
                  style: "text-align:center;",
                  min: 1
                },
                on: {
                  input: (event) => {
                    params.row.amount = event;
                    this.shoppingCart[params.index].amount = event;
                    // 后台数据更新
                  }
                }
              })
            ]);
          },
          align: 'center'
        },
        {
          title: '金额',
          key: 'totalPrice',
          width: 120,
          render: (h, params) => {
            return h('div', [
              h('font', {
                attrs: {
                  style: "text-align:center;"
                }
              }, (params.row.amount * params.row.price).toFixed(2))
            ]);
          },
          align: 'center',
        },
        {
          title: '操作',
          key: 'operation',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('a', {
                on: {
                  click: () => {
                    this.rmIndex = params.index;
                    this.modelStatus = true;
                  }
                }
              }, '移除')
            ])
          }
        }
      ],
      shoppingCart: [
        {
          goods_id: '13212313213',
          amount: 1,
          imgUrl: 'http://139.199.125.60/bxjg.jpg',
          requirement: '白色 威震天',
          price: (2800).toFixed(2),
          title: '变形金刚领袖战争钢锁淤泥嚎叫飞镖铁渣组合机器恐龙男孩玩具'
        },
        {
          goods_id: '13212123211',
          amount: 10,
          imgUrl: 'http://139.199.125.60/bijiben13.3.jpg',
          requirement: '银色 13.3寸 i5',
          price: (5500.00).toFixed(2),
          title: '小米笔记本'
        },
        {
          goods_id: '13211223658',
          amount: 1,
          imgUrl: 'http://139.199.125.60/xmds4a_43.png',
          requirement: '黑色 43寸 xmtv4a',
          price: (2200).toFixed(2),
          title: 'Xiaomi/小米 小米电视4A 43英寸4S PRO智能网络4K超清液晶电视机'
        },
        {
          goods_id: '13211223658',
          amount: 1,
          imgUrl: 'http://139.199.125.60/xmds4a_43.png',
          requirement: '黑色 43寸 xmtv4a',
          price: (2200).toFixed(2),
          title: 'Xiaomi/小米 小米电视4A 43英寸4S PRO智能网络4K超清液晶电视机'
        },
        {
          goods_id: '13211223658',
          amount: 1,
          imgUrl: 'http://139.199.125.60/xmds4a_43.png',
          requirement: '黑色 43寸 xmtv4a',
          price: (2200).toFixed(2),
          title: 'Xiaomi/小米 小米电视4A 43英寸4S PRO智能网络4K超清液晶电视机'
        },
        {
          goods_id: '13211223658',
          amount: 1,
          imgUrl: 'http://139.199.125.60/xmds4a_43.png',
          requirement: '黑色 43寸 xmtv4a',
          price: (2200).toFixed(2),
          title: 'Xiaomi/小米 小米电视4A 43英寸4S PRO智能网络4K超清液晶电视机'
        },
        {
          goods_id: '13211223658',
          amount: 1,
          imgUrl: 'http://139.199.125.60/xmds4a_43.png',
          requirement: '黑色 43寸 xmtv4a',
          price: (2200).toFixed(2),
          title: 'Xiaomi/小米 小米电视4A 43英寸4S PRO智能网络4K超清液晶电视机'
        },
        {
          goods_id: '13211223658',
          amount: 1,
          imgUrl: 'http://139.199.125.60/xmds4a_43.png',
          requirement: '黑色 43寸 xmtv4a',
          price: (2200).toFixed(2),
          title: 'Xiaomi/小米 小米电视4A 43英寸4S PRO智能网络4K超清液晶电视机'
        },
        {
          goods_id: '13211223658',
          amount: 1,
          imgUrl: 'http://139.199.125.60/xmds4a_43.png',
          requirement: '黑色 43寸 xmtv4a',
          price: (2200).toFixed(2),
          title: 'Xiaomi/小米 小米电视4A 43英寸4S PRO智能网络4K超清液晶电视机'
        },
        {
          goods_id: '13211223658',
          amount: 1,
          imgUrl: 'http://139.199.125.60/xmds4a_43.png',
          requirement: '黑色 43寸 xmtv4a',
          price: (2200).toFixed(2),
          title: 'Xiaomi/小米 小米电视4A 43英寸4S PRO智能网络4K超清液晶电视机'
        },
        {
          goods_id: '13211223658',
          amount: 1,
          imgUrl: 'http://139.199.125.60/xmds4a_43.png',
          requirement: '黑色 43寸 xmtv4a',
          price: (2200).toFixed(2),
          title: 'Xiaomi/小米 小米电视4A 43英寸4S PRO智能网络4K超清液晶电视机'
        }
      ]
    }
  },
  components: {
    HeaderNav,
    ShoppingCartSearch
  },
  computed: {
    totalPrice() {
      let price = 0;
      this.goodsSelectList.forEach(item => {
        price += item.price * item.amount;
      })
      return price;
    }
  },
  methods: {
    remove(index) {
      this.shoppingCart.splice(index, 1);
      // 后端数据库删除请求
    },
    select(selection) {
      this.goodsSelectList = selection;
    },
    clear() {
      if (this.goodsSelectList.length == 0) {
         this.$Message.error('未选中结算商品！');
      } else {
        this.$router.push("/");
        // 带参数请求
      }
    },
    ok() {
      if(this.rmIndex != -1) {
        this.remove(this.rmIndex);
        this.$Message.success('移除成功！');
        this.rmIndex = -1;
        // 后台数据更新
      }
    },
    cancel() {
      this.$Message.success('取消移除！');
      this.rmIndex = -1;
    }
  },
  mounted() {
    setTimeout(() => {
      this.$refs.selection.selectAll(true)
    }, 500);
  }
}
</script>

<style scoped>
.shopping-cart-div {
  position: relative;
  width: 1226px;
  height: auto;
  margin: 0 auto;
}
.tips-box {
  margin-top: 100px;
  margin-bottom: 10px;
}

.pay-container {
  margin: 15px;
  display: flex;
  justify-content: flex-end;
}

.pay-box {
  font-size: 24px;
  font-weight: bolder;
  color: #495060;
}

.money {
  font-size: 26px;
  color: #f90013;
}

.clear-btn {
  margin: 15px 0px;
  display: flex;
  justify-content: flex-end;
}
</style>
