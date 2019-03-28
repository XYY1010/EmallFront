<template>
  <div>
    <HeaderNav/>
    <ShoppingCartSearch/>
  <div class="shopping-cart-div">
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
    <Table border ref="selection" :columns="columns" :data="shoppingCart" :loading="loading" size="large" @on-selection-change="select" no-data-text="您的购物车空空如也~ 请先添加商品到购物车再点击购买"></Table>

    <div class="pay-container">
      <div class="pay-box">
        <p> <span>应付总金额</span> <span class="money"></span> <Icon type="logo-yen"></Icon> {{totalPrice.toFixed(2)}}</p>
        <div class="clear-btn">
          <Button type="error" long size="large" @click="clear()">结算</Button>
        </div>
      </div>
    </div>
  </div>
  <SimpleCopyright/>
  </div>
</template>

<script>
import HeaderNav from '../components/HeaderNav.vue'
import ShoppingCartSearch from '../components/ShoppingCartSearch.vue'
import SimpleCopyright from '../components/SimpleCopyright.vue'
export default {
  name: 'shoppingcart',
  data() {
    return {
      loading: false,
      modelStatus: false,
      rmIndex: -1,
      goodsSelectList: [],
      userInfo: {},
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
                  src: params.row.attrImg,
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
          key: 'itemTitle',
          align: 'center'
        },
        {
          title: '规格',
          width: 300,
          key: 'attrVals',
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
                    this.updateAmount(this.shoppingCart[params.index].cartId, event);
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
      shoppingCart: []
    }
  },
  components: {
    HeaderNav,
    ShoppingCartSearch,
    SimpleCopyright
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
        //我修改，在计算的时候先把购物车里面的东西sellItems里面
        this.$store.commit("setSellItemsByShoppingCart", this.$store.getters.shoppingcart);
        this.$router.push("/confirmOrders");
        console.log(this.$refs.selection.getSelection());
        // 带参数请求
      }
    },
    ok() {
      if(this.rmIndex != -1) {
        // 后台数据更新
        this.$axios({
          method: 'post',
          url: '/shoppingcart/delete',
          params: {
            id: this.shoppingCart[this.rmIndex].cartId
          }
        }).then(res => {
          let result = res.data;
          if (result.status == 'success') {
            this.remove(this.rmIndex);
            this.$Message.success('移除成功！');
            this.rmIndex = -1;
          } else {
            this.$Notice.open({
              title: "错误" + this.result.data.errCode,
              desc: this.result.data.errMsg
            });
          }
        }).catch(err => {
          this.$Notice.open({
            title: "错误",
            desc: "服务器开小差了,请稍后再试"
          });
        });
      }
    },
    cancel() {
      this.$Message.success('取消移除！');
      this.rmIndex = -1;
    },
    updateAmount(cartId, amount) {
      this.$axios({
        method: 'post',
        url: '/shoppingcart/modifyamount',
        params: {
          id: cartId,
          amount: amount
        }
      }).then(res => {
        let result = res.data;
        if (result.status == 'success') {
          this.$Message.success('数量修改成功！');
        } else {
          this.$Notice.open({
            title: "错误" + this.result.data.errCode,
            desc: this.result.data.errMsg
          });
        }
      }).catch(err => {
        this.$Notice.open({
          title: "错误",
          desc: "服务器开小差了,请稍后再试"
        });
      });
    }
  },
  mounted() {
    this.userInfo = this.$store.getters.user;
    this.shoppingCart = this.$store.getters.shoppingcart;
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
