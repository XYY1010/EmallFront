import shoppingcart from "./shoppingcart";

const state = {
    sellItems: [{
        amount: 2,
        attrImg: 'http://139.199.125.60/bijiben13.3.jpg',
        attrVals: '银色13.3寸 i5',
        cartId: '654321',
        itemId: '123456',
        itemTitle: '小米笔记本',
        price: '5500',
        stockId: 1
    }]
}
const getters = {
    sellItems: state => {
       /* state.sellItems=[{
            amount: 2,
            attrImg: 'http://139.199.125.60/bijiben13.3.jpg',
            attrVals: '银色13.3寸 i5',
            cartId: '654321',
            itemId: '123456',
            itemTitle: '小米笔记本',
            price: '5500',
            stockId: 1
        }];*/
        return state.sellItems;
    }
}

const mutations = {
    setSellItems(state, payload) {
        state.sellItems=[];
        state.sellItems.push(payload);
    },
    setSellItemsByShoppingCart(state,payload){
      state.sellItems=payload;
    }

};
export default {
    state,
    getters,
    mutations
};
