<template>
  <div class="security-setting-div">
    <div class="inner-box">
      <p>您的基本信息</p>
      <Form ref="formItem" :model="formItem" :rules="ruleValidate" :labelWidth="120">
        <FormItem label="会员名：">
          {{userInfo.userName}}
        </FormItem>
        <FormItem label="绑定的邮箱号：" prop="email">
          <Input style="width:200px;" :disabled="emailInputEnable" v-model="formItem.email"></Input>
          <Button type="primary" class="btn-modify-complete" v-show="showModifyEmail" @click="modifyEmail()">修改</Button>
          <Button type="success" class="btn-modify-complete" v-show="showCompleteEmail" @click="completeEmail('formItem')">完成</Button>
        </FormItem>
        <FormItem label="绑定的手机号：" prop="phone">
          <Input style="width:200px;" :disabled="phoneInputEnable" v-model="formItem.phone"></Input>
          <Button type="primary" class="btn-modify-complete" v-show="showModifyPhone" @click="modifyPhone()">修改</Button>
          <Button type="success" class="btn-modify-complete" v-show="showCompletePhone" @click="completePhone('formItem')">完成</Button>
        </FormItem>
      </Form>
      <p> 密码安全等级 <span class="pointer1"/><span class="pointer2" v-show="strength>25"/><span class="pointer3" v-show="strength>50"/><span class="pointer4" v-show="strength>75"/> <span class="span-class">{{strength}}</span> </p>
      <Divider/>
      <div class="password-modify-div">
        <div class="title">
          登录密码
        </div>
        <div class="supply">
          安全性高的密码可以使账号更安全。建议您定期更换密码，且设置一个包含数字和字母，并长度超过6位以上的密码。
        </div>
        <div class="operate">
          <Button type="primary" @click="modifyPassword()">修改</Button>
        </div>
        <Modal
          v-model="modal"
          title="密码修改"
          @on-ok="ok('formModal')"
          @on-cancel="cancel">
          <Form ref="formModal" :model="formModal" :rules="ruleModal" :labelWidth="120">
            <FormItem label="原密码：" prop="oldPassword">
              <Input style="width:200px;" type="password" v-model="formModal.oldPassword"></Input>
            </FormItem>
            <FormItem label="新密码：" prop="newPassword">
              <Input style="width:200px;" type="password" v-model="formModal.newPassword"></Input>
            </FormItem>
            <FormItem label="确认密码：" prop="confirmPassword">
              <Input style="width:200px;" type="password" v-model="formModal.confirmPassword"></Input>
            </FormItem>
          </Form>
        </Modal>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'securitysetting',
  data() {
    return {
      userInfo: {},
      formItem: {
        email: '',
        phone: ''
      },
      ruleValidate: {
        email: [
          { required: true, message: '邮箱地址不能为空', trigger: 'blur' },
          { validator: this.checkEmail }
        ],
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { validator: this.checkPhone }
        ]
      },
      emailInputEnable: true,
      phoneInputEnable: true,
      showModifyEmail: true,
      showCompleteEmail: false,
      showModifyPhone: true,
      showCompletePhone: false,
      strength: 0,
      modal: false,
      formModal: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      ruleModal: {
        oldPassword:[
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: this.checkOldPassword }
        ],
        newPassword: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: this.checkConfirmPassword }
        ]
      }
    }
  },
  methods: {
    modifyEmail() {
      if (this.emailInputEnable) {
        this.emailInputEnable = false;
        this.showModifyEmail = false;
        this.showCompleteEmail = true;
      }
    },
    completeEmail(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (!this.emailInputEnable) {
            // 后台修改
            this.$axios({
              method: 'post',
              url: '/user/modifyEmail',
              params: {
                userId: this.userInfo.userId,
                email: this.formItem.email
              }
            }).then(res => {
              let result = res.data;
              if (result.status == 'success') {
                this.emailInputEnable = true;
                this.showModifyEmail = true;
                this.showCompleteEmail = false;
                this.$Message.success('修改邮箱成功！');
                this.$store.commit('editUser', {user: {
                  email: result.data
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
          }
        } else {
          this.$Message.error('修改失败!');
        }
      });
    },
    modifyPhone() {
      if (this.phoneInputEnable) {
        this.phoneInputEnable = false;
        this.showModifyPhone = false;
        this.showCompletePhone = true;
      }
    },
    completePhone(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (!this.phoneInputEnable) {
            // 后台修改
            this.$axios({
              method: 'post',
              url: '/user/modifyTel',
              params: {
                userId: this.userInfo.userId,
                tel: this.formItem.phone
              }
            }).then(res => {
              let result = res.data;
              if (result.status == 'success') {
                this.phoneInputEnable = true;
                this.showModifyPhone = true;
                this.showCompletePhone = false;
                this.$Message.success('修改手机号成功！');
                this.$store.commit('editUser', {user: {
                  phone: result.data
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
          }
        } else {
          this.$Message.error('修改失败!');
        }
      });
    },
    checkEmail(rule, value, callback) {
        if (value.length == 0) {
          callback();
        }
        if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value)) {
          callback("邮箱号错误");
        } else {
          callback();
        }
    },
    checkPhone(rule, value, callback) {
        if (value.length == 0) {
          callback();
        }
        if (!/^1[34578]\d{9}$/.test(value)) {
          callback("手机号码错误");
        } else {
          callback();
        }
    },
    checkStrong(sValue) {
      var modes = 0;
      if (sValue.length < 1) return modes;
      if (/\d/.test(sValue)) modes++; //数字
      if (/[a-z]/.test(sValue)) modes++; //小写
      if (/[A-Z]/.test(sValue)) modes++; //大写
      if (/\W/.test(sValue)) modes++; //特殊字符
      switch (modes) {
        case 1:
          return 1 * 25;
          break;
        case 2:
          return 2 * 25;
          break;
        case 3:
        case 4:
          return sValue.length < 12 ? 3 * 25 : 4 * 25;
          break;
      }
      return modes * 25;
    },
    modifyPassword() {
      this.modal = true;
    },
    checkOldPassword(rule, value, callback) {
        if (value.length == 0) {
          callback();
        }
        if (value != this.userInfo.password) {
          callback("原密码输入有误！");
        } else {
          callback();
        }
    },
    checkConfirmPassword(rule, value, callback) {
      if (typeof (value) == undefined) {
        callback('请再次输入密码');
      } else {
        if (value === this.formModal.newPassword) {
          callback();
        } else {
          callback('密码不一致');
        }
      }
    },
    ok(e) {
      this.$refs[e].validate((valid) => {
        if (valid) {
          // 后台修改
          this.$axios({
            method: 'post',
            url: '/user/modifyPassword',
            params: {
              userId: this.userInfo.userId,
              oldPwd: this.formModal.oldPassword,
              newPwd: this.formModal.newPassword,
              confirmPwd: this.formModal.confirmPassword
            }
          }).then(res => {
            let result = res.data;
            if (result.status == 'success') {
              this.$Message.success('修改密码成功！');
              this.$store.commit('editUser', {user: {
                password: this.formModal.confirmPassword
              }});
              this.strength = this.checkStrong(this.formModal.confirmPassword);
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
          this.$Message.error('修改失败!');
        }
      });
    },
    cancel() {

    }
  },
  mounted() {
    this.userInfo = this.$store.getters.user;
    this.formItem.email = this.userInfo.email;
    this.formItem.phone = this.userInfo.phone;
    this.strength = this.checkStrong(this.userInfo.password);
  },
  computed: {

  }
}
</script>

<style scoped>
.security-setting-div {
  border: 1px solid #eeeeee;
  margin: 20px 50px;
}
.inner-box {
  margin: 30px 50px;
}
.btn-modify-complete {
  margin-left: 15px;
}
.span-class {
  margin: 0px 50px;
}
.pointer1 {
  background-color: #98FB98;
  width: 100px;
  height: 10px;
  display: inline-block;
  margin-left: 20px;
}
.pointer2 {
  background-color: #7CFC00;
  width: 100px;
  height: 10px;
  display: inline-block;
  margin-left: 5px;
}
.pointer3 {
  background-color: #32CD32	;
  width: 100px;
  height: 10px;
  display: inline-block;
  margin-left: 5px;
}
.pointer4 {
  background-color: #228B22;
  width: 100px;
  height: 10px;
  display: inline-block;
  margin-left: 5px;
}
.password-modify-div {
  margin: 20px 10px;
  display: inline-block;
}

.title {
  float: left;
  font-weight: bolder;
}

.supply {
  float: left;
  width: 400px;
  margin: 0px 100px;
  color: #555;
  font-size: 15px;
}

.operate {
  float: left;
}
</style>
