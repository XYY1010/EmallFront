<template>
	<div class="goods-detail-div">
		<Header/>
		<ShowGoods/>
		<ShowGoodsDetail/>
	</div>
</template>

<script>
	import Header from '../components/HeaderNav.vue';
	import ShowGoods from '../components/ShowGoods.vue'
	import ShowGoodsDetail from '../components/ShowGoodsDetail.vue'
	import SimpleCopyright from '../components/SimpleCopyright.vue'
	export default{
		name:'goodsdetail',
		data:function(){
			return {

			}
		},
		components:{
			Header,
			ShowGoods,
			ShowGoodsDetail,
			SimpleCopyright
		}
	}
</script>

<style scoped>
	.goods-datail-div {
		position: relative;
	  width: 1226px;
	  height: auto;
	  margin: 0 auto;
	}
</style>
