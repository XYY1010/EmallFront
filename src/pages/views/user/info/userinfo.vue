<template>
  <div class="user-info-div">
    <Tabs value="base">
        <TabPane label="基本资料" name="base"><BaseInfo/></TabPane>
        <TabPane label="头像资料" name="avatar"><AvatarInfo/></TabPane>
    </Tabs>
  </div>
</template>

<script>
import BaseInfo from './infocomponents/BaseInfo.vue'
import AvatarInfo from './infocomponents/AvatarInfo.vue'
export default {
  name: 'userinfo',
  data() {
    return {

    }
  },
  components: {
    BaseInfo,
    AvatarInfo
  }
}
</script>

<style scoped>
.user-info-div {
  border: 1px solid #eeeeee;
  margin: 20px 50px;
}
</style>
