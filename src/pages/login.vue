<template>
  <div class="loginDiv">
    <div class="simpleLogo">
  		<img src="../assets/EmallIcon.png">
  	</div>
    <div class="loginBackground">
      <Form ref="form" :model="form" :rules="rule">
    		<div id="loginSmallDiv" class="loginSmallDiv">

    			<div class="login_acount_text">账户登录</div>

          <div class="loginInput" >
            <FormItem prop="username">
      				<Input v-model="form.username" placeholder="会员名" type="text" size="large">
                <Icon type="ios-person" slot="prepend"></Icon>
              </Input>
            </FormItem>
    		 </div>

          <div class="loginInput " >
            <FormItem prop="password">
      				<Input v-model="form.password" type="password" placeholder="密码" size="large">
                <Icon type="ios-lock" slot="prepend"></Icon>
              </Input>
            </FormItem>
          </div>

    			<div style="margin-top:20px;">
            <FormItem>
    				   <Button type="error" long @click="handleSubmit('form')" size="large">登录</Button>
            </FormItem>
          </div>

          <div style="margin-top:10px;">
    				<a href="#">忘记登录密码</a>
    				<a href="javascript:void(0);" class="float-right" @click="register();">免费注册</a>
    			</div>
    		</div>
    	</Form>
    </div>
    <SimpleCopyright/>
	</div>
</template>

<script>
import SimpleCopyright from './components/SimpleCopyright.vue'
export default {
  name: 'login',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rule: {
        username: [
          {required: true, message: '请输入正确的用户名', trigger: 'blur'}
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit(e) {
      this.$refs[e].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: '/user/login',
            params: {
              userName: this.form.username,
              password: this.form.password
            }
          }).then(res => {
            let result = res.data;
            if (result.status == 'success') {
              this.$Message.success('登录成功！');
              this.$store.commit('initUser', {user: {
                userId: result.data.userId,
                userName: result.data.userName,
                password: this.form.password,
                gender: result.data.gender,
                phone: result.data.telephone,
                address: result.data.address,
                email: result.data.email,
                avatarSrc: result.data.avatarUrl,
                realName: result.data.realName,
                birthday: result.data.birthday,
                hometown: result.data.hometown
              }});
              setTimeout(() => {
                this.$router.push('/index');
              }, 1000);
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
          this.$Message.error('登录失败！');
        }
      });
    },
    register() {
      this.$router.push('/register');
    }
  },
  components: {
    SimpleCopyright
  }
}
</script>

<style scoped>
.simpleLogo {
  padding: 32px 80px;
}

.loginBackground {
  height: 550px;
  background: url(../assets/loginBackground.jpg);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

.loginSmallDiv {
	background-color: white;
	position: absolute;
	right: 150px;
	top: 180px;
	width: 350px;
	height: 400px;
	padding: 60px 25px 80px 25px;
}

.login_acount_text {
	color: #3C3C3C;
	font-size: 16px;
	font-weight: bold;
}

.loginInput {
	margin: 20px 0px;
}

a {
  font-size: 10px;
}
</style>
