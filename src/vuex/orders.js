import axios from "axios";

const state = {
    allOrders: [{
        status: '已付款',
        payTime: '',
        payee: '',
        orderID: '123',
        paymentMethod: "微信支付",
        orderSumPrice: 100,
        orderItems: []
    }],
    status: 0,

    totalPrice:0,
    orderId:''
};
const getters = {
    getStatus: state => {
        return state.status;
    },
    allOrders: state => {
        return state.allOrders;
    },
    otherOrders:state=>(orderStatus)=>{
        let ans=[];
        const length=state.allOrders.length;

        let curObj={};
        for (let i = 0; i <length ; i++) {
            curObj=state.allOrders[i];
            if(curObj.status===orderStatus){
                ans.push(curObj);
            }
        }

        return ans;
    },
    getTotalPrice:state => {
        return state.totalPrice;
    },
    getOrderId:state => {
        return state.orderId;
    }

}
const mutations = {
    setAllOrders: (state, payload) => {
        state.allOrders = payload;
    },
    setStatus: (state, payload) => {
        state.status = payload;
    },
    setTotalPrice:(state, payload) => {
        state.totalPrice = payload;
    },
    setOrderId:(state, payload) => {
        state.orderId = payload;
    }
};
const actions = {
    getAllOrders: (context, userId) => {
        //http://api.douban.com/v2/movie/top250?start=25&count=25
        //http://127.0.0.1:8090/allOrders/user1
        if (context.getters.getStatus === 0 || context.getters.getStatus === 2) {
            //let userId = this.$store.getters.user.userName;
            axios.get("/allOrders/" + userId)
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
                        ans[i].payTime = data[i].orderDO.paymentTime;
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
                    context.commit('setAllOrders', ans);
                    context.commit('setStatus', 1);
                    //  console.log(this.$store.getters.getStatus);
                })
                .catch(error => {
                    console.log(error);
                })
        }

    }
};
export default {
    state,
   // actions,
    mutations,
    getters

}
