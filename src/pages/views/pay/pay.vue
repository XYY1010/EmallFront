<template>
    <div>
        <payHeader></payHeader>
        <Card>
            <Row class="container">
                <Col span="6">
                    <Icon type="ios-checkmark-circle-outline" size="175" color="green"/>
                </Col>
                <Col span="12">
                    <h3>订单提交成功！去付款咯～</h3>
                    <p> 请在<br/>
                        <strong>0小时29分</strong>内完成支付, 超时后将取消订单</p>
                    <p v-if="orderId">订单号：{{orderId}}</p>
                </Col>
                <Col span="6">
                    <p>应付总额：<strong>{{totalPrice}}</strong></p>
                </Col>
            </Row>
        </Card>

        <Card>
            <h2>选择以下支付方式付款</h2>
            <Divider/>
            <h3>支付平台</h3>
            <div style="margin: 20px;">
                <!--<ul>
                    <li style="list-style-type :none"  ><img src="//c1.mifile.cn/f/i/16/pay/weixinpay.png" alt="微信支付" ></li>
                    <li style="list-style-type :none"><input type="radio" name="payOnlineBank" id="alipay" value="alipay"> <img src="//s01.mifile.cn/i/banklogo/payOnline_zfb.png?ver2015" alt="支付宝" style="margin-left: 0;"></li>
                </ul>-->
                <!--    <Button><img src="//c1.mifile.cn/f/i/16/pay/weixinpay.png" alt="微信支付"></Button>-->
                <Button><img src="//s01.mifile.cn/i/banklogo/payOnline_zfb.png?ver2015" alt="支付宝"
                             style="margin-left: 0;" @click="aliPay"></Button>
            </div>
        </Card>
    </div>
</template>

<script>
    import payHeader from './payHeader.vue';
    import Qs from 'qs';

    export default {
        name: "pay",
        components: {payHeader},

        data() {
            return {}
        },
        computed: {
            totalPrice: function () {
                return this.$store.getters.getTotalPrice;
            },
            orderId: function () {
                return this.$store.getters.getOrderId;
            }
        },
        methods: {
            weixinPay: function () {


            },
            aliPay: function () {
                this.$axios.post('/aliPay', {
                    outTradeNo: this.orderId,
                    subject: "mi",
                    totalAmount: this.totalPrice.toFixed(2),
                    body: "body"
                }, {
                    transformRequest: [function (data) {
                        return Qs.stringify(data)
                    }],
                }).then(response => {
                    console.log(response.data.data);
                    // this.ch=response.data.data;
                    let routerData = this.$router.resolve({path: '/aliPay', query: {htmls: response.data}})
                    this.htmls = response.data;

                    //打开新页面
                    window.open(routerData.href, '_ blank');
                    const div = document.createElement('div');
                    div.innerHTML = htmls;
                    document.body.appendChild(div);
                    document.forms [0].submit();

                }).catch(error => {
                    console.log(error.data);
                })
            }
        }
    }
</script>

<style scoped>
    .container {
        display: flex;
        align-items: center;
    }

</style>
