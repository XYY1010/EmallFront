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
            <FormItem prop="user">
      				<Input v-model="form.user" placeholder="手机/会员名/邮箱" type="text" size="large">
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
        user: '',
        password: ''
      },
      rule: {
        user: [
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
          console.log(this.form);
          this.$Message.success('登录成功！');
          setTimeout(() => {
            this.$router.push('/index');
          }, 1000);
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
	right: 180px;
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
