<template>
  <div>
    <Header/>
    <SearchBar/>
    <ClassifyNav/>
    <SimpleCopyright/>
  </div>
</template>

<script>
import Header from '../components/HeaderNav.vue';
import SearchBar from "../components/SearchBar.vue"
import Footer from '../components/Footer.vue';
import Copyright from '../components/Copyright.vue';
import ClassifyNav from '../components/ClassifyNav.vue';
import SimpleCopyright from '../components/SimpleCopyright.vue'
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
    SimpleCopyright
  }
}
</script>

<style scoped>
</style>
