<template>
    <div>
        <h1 class="margin">全部订单</h1>
        <OrderItem class="margin"
                   v-if="info&&info.length!==0"
                   v-for="(data,key,index) in info"
                   :key="index"
                   :status="data.status"
                   :payTime="data.payTime"
                   :payee="data.payee"
                   :orderID="data.orderID"
                   :paymentMethod="data.paymentMethod"
                   :orderAmount="data.orderSumPrice"
                   :orderItems="data.orderItems">
        </OrderItem>
    </div>
</template>

<script>
    import OrderItem from "../../orders/orderItem.vue";


    export default {
        name: 'allorders',
        components: {OrderItem},
        data: function () {
            return {
                info: [{
                    status: '已付款',
                    payTime: '',
                    payee: '',
                    orderID: '123',
                    paymentMethod: "微信支付",
                    orderSumPrice: 100,
                    orderItems: []
                }]
            }
        },
       /* computed:{
            info:this.$store.getters.allOrders
        },*/
        mounted:function() {
            this.getAllOrders();
        },
        methods: {
            /*getAllOrders:function () {
                if (this.$store.getters.getStatus === 0 || this.$store.getters.getStatus === 2){
                    let userId = this.$store.getters.user.userName;
                    console.log(userId);
                    this.$store.dispatch('getAllOrders',userId);
                }else {
                    this.info=this.$store.getters.getAllOrders;
                }

            }*/
            getAllOrders: function () {

             /*   this.$axios.get(url)
                    .then(response=>{response.data})//成功处理的函数*/
                //http://api.douban.com/v2/movie/top250?start=25&count=25
                //http://127.0.0.1:8090/allOrders/user1
                if (this.$store.getters.getStatus === 0 || this.$store.getters.getStatus === 2) {
                    let userId = this.$store.getters.user.userId;
                    this.$axios.get("/allOrders/" + userId)
                        .then(response => {
                            const data = response.data.data;
                            // this.info = data;
                            let ans = [];
                            for (let i = 0; i < data.length; ++i) {
                                ans[i] = {};
                                if (data[i].orderDO.orderStatus === 0)
                                    ans[i].status = '已收货';
                                else if (data[i].orderDO.orderStatus === 1)
                                    ans[i].status = '待付款';
                                else if (data[i].orderDO.orderStatus === 2)
                                    ans[i].status = '待发货';
                                else if (data[i].orderDO.orderStatus === 3)
                                    ans[i].status = '待收货';
                                else ans[i].status = '待评价';
                                ans[i].payTime = data[i].orderDO.createTime;
                                ans[i].payee = userId;
                                ans[i].orderID = data[i].orderDO.orderId;
                                if (data[i].orderDO.paymentType === 1)
                                    ans[i].paymentMethod = '支付宝支付';
                                else if (data[i].orderDO.paymentType === 2)
                                    ans[i].paymentMethod = '微信支付';
                                else ans[i].paymentMethod = '其他支付方式';
                                ans[i].orderSumPrice = data[i].orderDO.totalPrice;
                               // ans[i].payTime = data[i].orderDO.paymentTime;
                                let items = data[i].orderItemDOs;
                                //console.log(items.length);
                                ans[i].orderItems = [];
                                for (let j = 0; j < items.length; j++) {
                                    ans[i].orderItems.push({
                                        imgUrl: items[j].itemMainImage,
                                        name: items[j].itemTitle,
                                        price: items[j].currentUnitPrice,
                                        amount: items[j].amount
                                    });
                                }
                            }
                            this.info = ans;
                            this.$store.commit('setAllOrders', ans);
                            this.$store.commit('setStatus', 1);
                        })
                        .catch(error => {
                            console.log(error);
                        })
                } else {
                    this.info = this.$store.getters.allOrders;

                }

            }
        }
    }
</script>

<style scoped>
    .margin {
        margin: 20px;
    }
</style>
