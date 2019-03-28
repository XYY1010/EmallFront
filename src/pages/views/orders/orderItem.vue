<template>

    <div class="border" v-show="orderItems&&orderItems.length!==0">
        <!--标题里面有状态，支付时间，收款人，订单号，支付方式以及订单金额-->
        <p>{{status}}</p>
        <span>{{payTime}}</span>
        <Divider type="vertical"/>
        <span>{{payee}}</span>
        <Divider type="vertical"/>
        <span>订单号：{{orderID}}</span>
        <Divider type="vertical"/>
        <span>{{paymentMethod}}</span>
        <!--右侧的订单金额-->
        <span class="order-amount-pos">
                订单金额：<strong>{{orderAmount}}</strong>元
            </span>
        <Divider/>
        <!--下面是具体内容，主要是产品图片一张，介绍单价以及数量，右侧是订单详情-->
        <div
             v-for="(data,index) in orderItems"
             :key="index">
            <img :src=data.imgUrl height="80" width="80"/>
            <p class="name">{{data.name}}</p>
            <p class="price">{{data.price}}元*{{data.amount}}</p>
            <Button style="float: right;margin-top: -40px" type="default">订单详情</Button>
           <!-- <p>{{index}}-{{orderItems.length-1}}</p>-->
            <Divider v-show="index!==orderItems.length-1"/>
        </div>

        <!--  <span>{{item.name}}</span>
          <span>{{item.price}}元*{{item.amount}}</span>-->

    </div>

</template>

<script>
    export default {
        name: "orderItem",
        props: {
            status: {
                type: String
            },
            payTime: {
                type: String
            },
            payee: {
                type: String
            },
            orderID: {
                type: String
            },
            paymentMethod: {
                type: String
            },
            orderAmount: {
                type: Number
            },
            orderItems: {
                type: Array
            },
        }
    }
</script>

<style scoped>
    .order-amount-pos {
        float: right
    }

    .border {
        border: 1px solid gray;
        padding: 15px;
    }
</style>
