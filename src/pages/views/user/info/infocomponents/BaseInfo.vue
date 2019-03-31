<template>
  <div class="base-info-div">
    <Alert show-icon class="tips-box" closable type="warning">
        小提示
        <Icon type="md-bulb" slot="icon"></Icon>
        <template slot="desc">亲爱的{{userInfo.userName}}，请填写真实信息，方便好友找到你哦~~</template>
    </Alert>
    <Form ref="formItem" :model="formItem" :label-width="100" :rules="ruleValidate">
      <FormItem label="当前头像：">
        <img v-if="userInfo.avatarSrc !== null" class="imgAvatar" :src="userInfo.avatarSrc" alt="">
        <img v-if="userInfo.avatarSrc == null" class="imgAvatar" src="http://139.199.125.60/avatar/8.jpeg" alt="">
      </FormItem>
      <FormItem label="会员名：" prop="nickname">
        <Input v-model="formItem.nickname" style="width: 400px;"/>
      </FormItem>
      <FormItem label="真实姓名：" prop="realname">
        <Input v-model="formItem.realname" style="width: 200px;"/>
      </FormItem>
      <FormItem label="性别：" prop="gender">
        <RadioGroup v-model="formItem.gender">
            <Radio label="male">男</Radio>
            <Radio label="female">女</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="生日：">
        <DatePicker type="date" format="yyyy-MM-dd" placeholder="选择日期" v-model="formItem.birthday"></DatePicker>
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
        birthday: '',
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
          var residence = '';
          var hometown = '';
          for (var i = 0; i < this.formItem.residence.length; i++) {
            if (this.formItem.residence[i] == undefined || this.formItem.residence[i] == '') {
              break;
            }
            residence += this.formItem.residence[i];
            if (i <= this.formItem.residence.length - 1) {
              residence += '/';
            }
          }
          for (var i = 0; i < this.formItem.hometown.length; i++) {
            if (this.formItem.hometown[i] == undefined || this.formItem.hometown[i] == '') {
              break;
            }
            hometown += this.formItem.hometown[i];
            if (i <= this.formItem.hometown.length - 1) {
              hometown += '/';
            }
          }
          var datee = new Date(this.formItem.birthday).toJSON();
          var date = new Date(+new Date(datee)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
          date = date.split(" ")[0];
          var gender = 1;
          if (this.formItem.gender == "male") {
            gender = 1;
          } else {
            gender = 2;
          }
          this.$axios({
            method: 'post',
            url: '/user/userInfo',
            params: {
              userId: this.userInfo.userId,
              userName: this.formItem.nickname,
              realname: this.formItem.realname,
              gender: gender,
              birthday: date,
              address: residence,
              hometown: hometown
            }
          }).then(res => {
            let result = res.data;
            if (result.status == 'success') {
              this.$Message.success('保存成功！');
              this.$store.commit('editUser', {user: {
                userId: result.data.userId,
                userName: result.data.userName,
                gender: result.data.gender,
                address: result.data.address,
                realName: result.data.realName,
                birthday: result.data.birthday,
                hometown: result.data.hometown,
                avatarSrc: result.data.avatarUrl
              }});
            } else {
              this.$Notice.error({
                title: "错误" + result.data.errCode,
                desc: result.data.errMsg
              });
            }
          }).catch(err => {
            this.$Notice.error({
              title: "错误",
              desc: "服务器开小差了,请稍后再试"
            });
          });
        } else {
          this.$Message.error('保存失败！');
        }
      });
    }
  },
  mounted() {
    this.userInfo = this.$store.getters.user;
    this.formItem.nickname = this.userInfo.userName;
    this.formItem.realname = this.userInfo.realName;
    if (this.userInfo.gender == true) {
      this.formItem.gender = 'male';
    } else {
      this.formItem.gender = 'female';
    }
    this.formItem.birthday = this.userInfo.birthday;
    this.formItem.residence = this.userInfo.address.split("/");
    this.formItem.hometown = this.userInfo.hometown.split("/");
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
