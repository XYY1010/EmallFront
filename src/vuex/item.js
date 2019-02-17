    //用来传递信息
    import Vue from 'vue'  
    import Vuex from 'vuex'

    Vue.use(Vuex);

    export default new Vuex.Store({
    	state:{
    		itemId:'',
            price:'',
			stock:''
    	},
    	mutations:{
    		setItemId(state,message){
    			state.itemId = message;
    		},
            setPrice(state,message){
                state.price = message;
            },
			setStock(state,messaage){
				state.stock = messaage;
			}
    	}
    })