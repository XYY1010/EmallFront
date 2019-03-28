<template>
  <div class="register">
    <div class="simpleLogo">
  		<img src="../assets/EmallIcon.png">
  	</div>
    <Form ref="form" :model="form" :rules="rule">
	     <div class="registerDiv">
        <table class="registerTable" align="center">
    			<tr>
    				<td  class="registerTip registerTableLeftTD"><Icon type="ios-contact" size="20" style="margin: 0 10px 5px 0"/>设置会员名</td>
    				<td></td>
    			</tr>
  			<tr>
  				<td class="registerTableLeftTD">登陆名</td>
  				<td  class="registerTableRightTD">
            <FormItem prop='username'>
              <Input v-model='form.username' style="margin-top:20px;" placeholder="会员名一旦设置成功，无法修改" size="large"></Input>
            </FormItem>
          </td>
  			</tr>
        <tr>
          <td  class="registerTip registerTableLeftTD"><Icon type="ios-phone-portrait" size="20" style="margin: 0 10px 5px 0"/>设置手机号</td>
          <td  class="registerTableRightTD">同一手机号只能注册一次</td>
        </tr>
        <tr>
  				<td class="registerTableLeftTD">手机号</td>
  				<td  class="registerTableRightTD">
            <FormItem prop='telephone'>
              <Input v-model='form.telephone' style="margin-top:20px;" placeholder="手机号" size="large"></Input>
            </FormItem>
          </td>
  			</tr>
        <tr>
          <td  class="registerTip registerTableLeftTD"><Icon type="ios-mail-outline" size="20" style="margin: 0 10px 5px 0"/>设置邮箱号</td>
          <td  class="registerTableRightTD">同一邮箱号只能注册一次</td>
        </tr>
        <tr>
  				<td class="registerTableLeftTD">邮箱号</td>
  				<td  class="registerTableRightTD">
            <FormItem prop='email'>
              <Input v-model='form.email' style="margin-top:20px;" placeholder="邮箱号" size="large"></Input>
            </FormItem>
          </td>
  			</tr>
  			<tr>
  				<td  class="registerTip registerTableLeftTD"><Icon type="ios-lock" size="20" style="margin: 0 10px 5px 0"/>设置登陆密码</td>
  				<td  class="registerTableRightTD">登陆时验证，保护账号信息</td>
  			</tr>
  			<tr>
  				<td class="registerTableLeftTD">登陆密码</td>
  				<td class="registerTableRightTD">
            <FormItem prop='password'>
              <Input v-model='form.password' style="margin-top:20px;" type="password"  placeholder="设置您的登陆密码" size="large"></Input>
            </FormItem>
          </td>
  			</tr>
  			<tr>
  				<td class="registerTableLeftTD">密码确认</td>
  				<td class="registerTableRightTD">
            <FormItem prop='repeatpassword'>
              <Input v-model='form.repeatpassword' style="margin-top:20px;" type="password"  placeholder="请再次输入您的密码" size="large"></Input>
            </FormItem>
          </td>
  			</tr>

  			<tr>
  				<td colspan="2" class="registerButtonTD">
            <FormItem>
    				   <Button type="error" long @click="handleSubmit('form')" size="large">提 交</Button>
            </FormItem>
  				</td>
  			</tr>
  		</table>
	</div>
</Form>
<SimpleCopyright/>
  </div>
</template>

<script>
import SimpleCopyright from './components/SimpleCopyright.vue'
export default {
  name: 'register',
  data() {
    return {
      form: {
        username: '',
        password: '',
        repeatpassword: '',
        telephone: '',
        email: ''
      },
      rule: {
        username: [
          {required: true, message: '请输入正确的用户名', trigger: 'blur'}
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        repeatpassword: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: this.checkPassword}
        ],
        telephone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { validator: this.checkPhone }
        ],
        email: [
          { required: true, message: '邮箱地址不能为空', trigger: 'blur' },
          { validator: this.checkEmail }
        ]
      }
    }
  },
  methods: {
    checkPassword(rule, value, callback) {
      if (typeof (value) == undefined) {
        callback('请再次输入密码');
      } else {
        if (value === this.form.password) {
                callback();
        } else {
          callback('密码不一致');
        }
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
    handleSubmit(e) {
      this.$refs[e].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: '/user/register',
            params: {
              username: this.form.username,
              password: this.form.password,
              confirmPassword: this.form.repeatpassword,
              telephone: this.form.telephone,
              email: this.form.email
            }
          }).then(res => {
            let result = res.data;
            if (result.status == 'success') {
              this.$Message.success('注册成功！');
              setTimeout(() => {
                this.$router.push('/login');
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
          this.$Message.error('请重新填写！');
        }
      });
      this.$refs[e].resetFields();
    }
  },
  components: {
    SimpleCopyright
  }
}
</script>

<style scoped>
.simpleLogo {
  text-align: center;
  margin-top: 5px;
}
.registerDiv {
  margin: 60px 20px;
  text-align: center;
}

table.registerTable {
	color: #3C3C3C;
	font-size: 16px;
	table-layout: fixed;
	margin-top: 50px;
}

table.registerTable td {
	/* 	border:1px dotted skyblue !important; */
	padding: 10px 30px;
}

td.registerTableLeftTD {
	width: 200px;
	text-align: right;
}

td.registerTableRightTD {
	width: 300px;
	text-align: left;
}

td.registerTip {
	font-weight: bold;
}

td.registerButtonTD {
	text-align: center;
}

.registerTable {

}

table.registerTable button {
	width: 170px;
	height: 36px;
	border-radius: 2px;
	color: white;
  font-size: 15px;
	background-color: #A013EB;
	border-width: 0px;
}
</style>
