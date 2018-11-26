<template>
  <div>
    <Header/>
    <SearchBar/>
    <Footer/>
    <Copyright/>
  </div>
</template>

<script>
import Header from '../components/HeaderNav.vue';
import SearchBar from "../components/SearchBar.vue"
import Footer from '../components/Footer.vue';
import Copyright from '../components/Copyright.vue'
export default {
  name: 'index',
  data() {
    return {

    }
  },
  components: {
    Header,
    SearchBar,
    Footer,
    Copyright
  }
}
</script>

<style scoped>
</style>
