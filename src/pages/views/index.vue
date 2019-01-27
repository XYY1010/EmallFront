<template>
  <div>
    <Header/>
    <SearchBar/>
    <ClassifyNav/>
    <Phone/>
    <Accessories/>
    <Appliance/>
    <Hardware/>
    <SimpleCopyright/>
  </div>
</template>

<script>
import Header from '../components/HeaderNav.vue';
import SearchBar from "../components/SearchBar.vue"
import Footer from '../components/Footer.vue';
import Copyright from '../components/Copyright.vue';
import ClassifyNav from '../components/ClassifyNav.vue';
import Phone from '../components/indexpage/Phone.vue';
import Accessories from '../components/indexpage/Accessories.vue';
import Appliance from '../components/indexpage/Appliance.vue';
import Hardware from '../components/indexpage/Hardware.vue';
import SimpleCopyright from '../components/SimpleCopyright.vue';
export default {
  name: 'index',
  data() {
    return {

    }
  },
  components: {
    Header,
    SearchBar,
    ClassifyNav,
    Phone,
    Accessories,
    Appliance,
    Hardware,
    SimpleCopyright
  }
}
</script>

<style scoped>
</style>
