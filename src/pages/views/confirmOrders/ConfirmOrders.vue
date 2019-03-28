<template>
    <div>
        <!--头部-->
        <ConfirmOrdersHeader/>
        <!--具体内容-->
        <Card style="margin: 20px" dis-hover>
            <!--收货地址-->
            <h4>收货地址</h4>
            <!--  <DeliveryAddress/>-->
            <Row :gutter="16"
                 justify="center"
            >
                <Col span="6" v-for="(address,index) in addresses"
                     :key="index">
                    <DeliveryAddress :address="address" @change="changeBorder"/>
                </Col>

            </Row>
            <!-- <Row :gutter="16">
                 <Col span="6">
                     <DeliveryAddress @change="changeBorder"/>
                 </Col>
                 <Col span="6">
                     <DeliveryAddress/>
                 </Col>
                 <Col span="6">
                     <DeliveryAddress/>
                 </Col>
                 <Col span="6">
                     <DeliveryAddress/>
                 </Col>
             </Row>-->
            <Divider/>
            <!-- <div class="show-more-address" @click="changeShowMoreAddress">
                 <span v-if="showMoreAddress">显示更多收货地址<i>&#xe61b;</i></span>
                 <span v-else>收起更多收货地址<i>&#xe612;</i></span>
             </div>-->
            <!--商品-->
            <h4>商品</h4>
            <Divider/>
            <Row v-for="product in products">
                <Col span="2">
                    <img :src='product.attrImg' :alt='product.itemTitle' height="20" width="25">
                </Col>
                <Col span="10">
                    {{product.itemTitle}}
                </Col>
                <Col span="6">
                    {{product.price}}元*{{product.amount}}
                </Col>
                <Col span="6">
                    {{product.price*product.amount}}元
                </Col>
            </Row>
            <Divider/>
            <!--配送方式-->
            <h4>配送方式</h4>
            <p v-if="freightAmount!==0">邮费{{freightAmount}}元</p>
            <p v-else>包邮</p>
            <Divider/>
            <h4>发票</h4>
            <span>电子发票</span>
            <Divider/>
            <div class="product-clearing-pos">
                <p>商品总数：{{products.length}}件</p>
                <p>商品总价：{{productTotalPrice}}元</p>
                <!-- <p>活动优惠：-{{products.length}}元</p>-->
                <!-- <p>优惠券抵扣：-{{products.length}}元</p>-->
                <p>运费：{{freightAmount}}元</p>
                <p>应付总额：{{totalPrice}}元</p>
            </div>
            <Divider/>
            <!--底部的地址-->
            <Row>
                <Col span="12"><span>{{name}}&nbsp;{{phone}}</span>
                    <br/>
                    <span>{{showAddress}}</span>
                </Col>
                <Col span="6" offset="6">
                    <Button type="warning" class="product-clearing-pos" @click="toPay">立即下单</Button>
                </Col>
            </Row>


        </Card>
    </div>
</template>

<script>
    import ConfirmOrdersHeader from "./ConfirmOrdersHeader.vue";
    import DeliveryAddress from "./DeliveryAddress.vue";

    export default {
        name: "ConfirmOrders",
        components: {DeliveryAddress, ConfirmOrdersHeader},
        data() {
            return {

                //运费
                freightAmount: 8,

                addressId: '',
                name: '',
                phone: '',
                address: '',
                addressDetail: '',


            };
        },
        computed: {
            productTotalPrice: function () {
                let sum = 0.0;
                for (const item of this.products) {
                    sum += item.price * item.amount;
                }
                return sum;
            },
            addresses: function () {
                let x = [];
                x = this.$store.getters.getAllAddresses;
                // console.log(x.length);
                return this.$store.getters.getAllAddresses;
            },
            products: function () {
                let x = [];
                x = this.$store.getters.sellItems;
                //console.log(x.length);
                return this.$store.getters.sellItems;
            },
            totalPrice: function () {
                return this.productTotalPrice + this.freightAmount;
            },
            showAddress: function () {
                return this.address + ' ' + this.addressDetail;
            }
        },

        methods: {
            /*  initAddresses: function () {
                  this.addresses = this.$store.getters.addresses;
                  console.log(this.addresses.length);
              },*/

            changeBorder: function (deliveryAddress) {
                // deliveryAddress.isDefault=false;
                this.addressId = deliveryAddress.addressId;
                this.name = deliveryAddress.receiverName;
                this.phone = deliveryAddress.receiverPhone;
                this.address = deliveryAddress.address;
                this.addressDetail = deliveryAddress.addressDetail;
                // this.showAddress = deliveryAddress.address + ' ' + deliveryAddress.addressDetail;
            },

            toPay() {
                //给跳转后的页面增加传入总价
                this.$store.commit("setTotalPrice", this.totalPrice);

                //确认订单后要修改一下订单状态为2
                this.$store.commit("setStatus", 2);
                let orderItems = [];
                let product = {};
                for (let i = 0; i < this.products.length; i++) {
                    product = this.products[i];
                    orderItems.push({
                        itemId: product.itemId,
                        itemTitle: product.itemTitle,
                        itemMainImage: product.attrImg,
                        currentUnitPrice: product.price,
                        amount: product.amount,
                        totalPrice: product.amount * product.price,
                    });
                }
                //发送订单的信息给服务器,用post方法
                console.log('id:'+this.$store.getters.user.userName);
                const userId=this.$store.getters.user.userId;
                this.$axios.post('/createOrders', {
                        orderDO: {
                            //暂时用name来代替
                            userId: userId,

                            payment: this.totalPrice,
                            paymentType: 1,//先采取默认的，因为现在不知道类型
                            postage: this.freightAmount,

                            totalPrice: this.productTotalPrice,

                            addressId: this.addressId,
                            receiverName: this.name,
                            receiverPhone: this.phone,
                            address: this.address,
                            addressDetail: this.addressDetail
                        }
                        ,
                        orderItemDOs: orderItems
                    },
                    {
                        headers: {
                            'Content-Type':
                                'application/json;charset=UTF-8'
                        }
                    }
                )
                    .then((response) => {
                        console.log(response.data.data);
                        this.$store.commit('setOrderId',response.data.data);
                    })
                    .catch((error) => {
                        console.log(error.data)
                    });
                this.$router.push('/pay');
            }
        },

    }
</script>

<style scoped>
    .small-title {
        font-size: 1.5em;
    }

    .show-more-address {
        text-align: center;
        background-color: gray;
    }

    .product-clearing-pos {
        float: right;
        margin-right: 20px;
    }

    .inline {
        display: inline;
    }
</style>
