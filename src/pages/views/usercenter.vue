<template>
  <div>
    <Header/>
    <UserCenterSearch/>
  <div class="user-center-div">
      <Divider/>
      <Layout>
        <Sider class="side" hide-trigger>
            <img v-if="userInfo.avatarSrc !== null" class="imgAvatar" :src="userInfo.avatarSrc" alt="">
            <img v-if="userInfo.avatarSrc == null" class="imgAvatar" src="https://raw.githubusercontent.com/XYY1010/WebImgSrc/master/test/8.jpeg" alt="">
            <Menu theme="light" width="auto" :open-names="['1']">
              <Submenu v-for="subMenu in menu" :name="subMenu.id" :key="subMenu.id">
                <template slot="title">
                  <Icon :type="subMenu.icon"/> {{subMenu.name}}
                </template>
                <MenuItem v-for="menuItem in subMenu.menuItems" :name="menuItem.id" :key="menuItem.id">
                  <router-link :to="menuItem.link" class="router-link-style">{{menuItem.name}}</router-link>
                </MenuItem>
              </Submenu>
            </Menu>
        </Sider>
        <Layout>
          <Content class="content">
            <router-view></router-view>
          </Content>
        </Layout>
    </Layout>
    </div>
  </div>
</template>

<script>
import Header from '../components/HeaderNav.vue';
import UserCenterSearch from "../components/UserCenterSearch.vue";
import db from '../../db/meta';
const {menu} = db;
export default {
  name: 'usercenter',
  data() {
    return {
      menu,
      userInfo: {}
    }
  },
  components: {
    Header,
    UserCenterSearch
  },
  mounted() {
    this.userInfo = this.$store.getters.user;
  }
}
</script>

<style scoped>
  .user-center-div {
    position: relative;
    width: 1226px;
    height: auto;
    margin: 0 auto;
  }
  .side {
    background-color: #FFFFFF;
  }
  .imgAvatar {
    width: 140px;
    height: 140px;
    margin: 10px 20px;
  }
  .router-link-style {
    color: #222;
    width: 100%;
    height: 100%;
  }
  .router-link-style:hover {
    text-decoration: none;
  }
  .content {
    background-color: #FFF;
  }
</style>
