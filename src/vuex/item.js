    //用来传递信息
    import Vue from 'vue'  
    import Vuex from 'vuex'

    Vue.use(Vuex);

    export default new Vuex.Store({
    	state:{
    		itemId:''
    	},
    	mutations:{
    		setItemId(state,message){
    			state.itemId = message.itemId;
    		}
    	}
    })