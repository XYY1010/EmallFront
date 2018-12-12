<template>
  <div class="base-info-div">
    <Alert show-icon class="tips-box" closable type="warning">
        小提示
        <Icon type="md-bulb" slot="icon"></Icon>
        <template slot="desc">亲爱的{{userInfo.userName}}，请填写真实信息，方便好友找到你哦~~</template>
    </Alert>
    <Form ref="formItem" :model="formItem" :label-width="100" :rules="ruleValidate">
      <FormItem label="当前头像：">
        <img v-if="userInfo.avatarSrc !== ''" class="imgAvatar" :src="userInfo.avatarSrc" alt="">
        <img v-if="userInfo.avatarSrc == ''" class="imgAvatar" src="" alt="">
      </FormItem>
      <FormItem label="昵称：" prop="nickname">
        <Input v-model="formItem.nickname" style="width: 400px;"/>
      </FormItem>
      <FormItem label="真实姓名：" prop="realname">
        <Input v-model="formItem.realname" style="width: 200px;"/>
      </FormItem>
      <FormItem label="性别：" prop="gender">
        <RadioGroup v-model="formItem.gender">
            <Radio label="male">男</Radio>
            <Radio label="female">女</Radio>
            <Radio label="secret">保密</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="生日：">
        <DatePicker type="date" placeholder="选择日期" v-model="formItem.date"></DatePicker>
      </FormItem>
      <FormItem label="居住地：">
        <Cascader :data="address" v-model="formItem.residence" style="width:400px;"></Cascader>
      </FormItem>
      <FormItem label="家乡：">
        <Cascader :data="address" v-model="formItem.hometown" style="width:400px;"></Cascader>
      </FormItem>
      <Divider/>
      <FormItem>
        <Button type="warning" @click="handleSubmit('formItem')" size="large">保存</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import addressData from '../../../../../db/generateAddressData';
const {address} = addressData;
export default {
  name: 'baseinfo',
  data() {
    return {
      address,
      userInfo: {},
      formItem: {
        nickname: '',
        realname: '',
        gender: '',
        date: '',
        residence: [],
        hometown: []
      },
      ruleValidate: {
        nickname: [
          { required: true, message: '昵称不能为空', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleSubmit(e) {
      this.$refs[e].validate((valid) => {
        if (valid) {
          console.log(this.formItem);
          this.$Message.success('保存成功！');
          setTimeout(() => {
            this.$router.push('/');
          }, 1000);
        } else {
          this.$Message.error('保存失败！');
        }
      });
    }
  },
  mounted() {
    this.userInfo = this.$store.getters.user;
  }
}
</script>

<style scoped>
.base-info-div {
  margin: 30px 50px;
}
.imgAvatar {
  width: 140px;
  height: 140px;
  border: 5px solid #eee;
}
</style>
