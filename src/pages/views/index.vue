<template>
  <div>
    <BackTop></BackTop>
    <Header/>
    <SearchBar/>
    <ClassifyNav/>
    <Phone/>
    <Accessories/>
    <Appliance/>
    <Hardware/>
    <Recommend/>
    <SimpleCopyright/>
  </div>
</template>

<script>
import Header from '../components/HeaderNav.vue';
import SearchBar from "../components/SearchBar.vue"
import Footer from '../components/Footer.vue';
import Copyright from '../components/Copyright.vue';
import ClassifyNav from '../components/ClassifyNav.vue';
export default {
  name: 'index',
  data() {
    return {

    }
  },
  components: {
    Header,
    SearchBar,
    ClassifyNav:resolve => require(['../components/ClassifyNav.vue'], resolve),
    Phone:resolve => require(['../components/indexpage/Phone.vue'], resolve),
    Accessories:resolve => require(['../components/indexpage/Accessories.vue'], resolve),
    Appliance:resolve => require(['../components/indexpage/Appliance.vue'], resolve),
    Hardware:resolve => require(['../components/indexpage/Hardware.vue'], resolve),
    Recommend:resolve => require(['../components/indexpage/Recommend.vue'], resolve),
    SimpleCopyright:resolve => require(['../components/SimpleCopyright.vue'], resolve)
  }
}
</script>

<style scoped>
</style>
