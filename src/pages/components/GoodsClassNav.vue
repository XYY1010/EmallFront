<template>
    <div class="item-class-show">
      <Row class="item-class-group" v-for="(items, index) in categoryInfo" :key="index">
        <i-col class="item-class-name" span="3">{{ items.father.categoryName }} : </i-col>
        <i-col class="item-class-select" span="21">
          <span v-for="(item, subIndex) in items.childs" @click="categorySelected(index,subIndex)" :key="subIndex">{{ item.categoryName }}</span>
        </i-col>
      </Row>
    </div>
</template>

<script>
export default {
  name: 'GoodsClassNav',
  data () {
    return {
      categoryInfo: [
        
      ]
    };
  },
  methods:{
    getCategory(){
      this.$axios({
        methods:'get',
        url:'/category/getCategory'
      }).then(res=>{
          const data = res.data.data;
          this.categoryInfo = data;
      }).catch(error=>{
        this.$Notice.open({
          title:"错误",
          desc:"获得分类信息错误"
        });
      });
    },
    categorySelected(index,subIndex){
      //alert(this.categoryInfo[index].childs[subIndex].id);
      this.$emit('categoryClicked',this.categoryInfo[index].childs[subIndex].id);
    }
  },
  mounted(){
    this.getCategory();
  }
};
</script>

<style scoped>
.item-class-show {
  font-size: 15px;
  margin: 15px auto;
  width: 100%;
}
.item-class-group {
  margin-top: 1px;
  height: 45px;
  border-bottom: 1px solid #ccc;
}
.item-class-group:first-child {
  border-top: 1px solid #ccc;
}
.item-class-name {
  padding-left: 15px;
  line-height: 44px;
  color: #666;
  font-weight: bold;
  background-color: #f3f3f3;
}
.item-class-name:first-child {
  line-height: 43px;
}
.item-class-select span {
  margin-left: 15px;
  width: 160px;
  color: #005aa0;
  line-height: 45px;
  cursor: pointer;
}
</style>
