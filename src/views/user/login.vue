<template>
  <div class="login">
    <easy-header/>
    <main-content>
      <div slot="content">
        <div class="register-login-box">
          <div class="title">
            登录
          </div>
          <div class="form-box">
            <el-form ref="form" :model="form" :rules="rules">
              <el-form-item prop="mobile">
                <el-input v-model="form.name" class="input-1" placeholder="请输入登录账号" @keyup.enter.native='submit'/>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" @keyup.enter.native='submit' v-model="form.password" class="input-1"
                          placeholder="请输入密码" maxLength="16"/>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" class="submit-button" @click="submit">登 录
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </main-content>
    <page-footer/>
  </div>

</template>

<script>
  import {EasyHeader, Footer} from '@/views/layout/components';
  import mainContent from './components/mainContent'

  export default {
    name: 'login',
    components: {
      EasyHeader,
      mainContent,
      PageFooter: Footer
    },
    data() {
      return {
        form: {
          name: '',
          password: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        },
        content: '发送验证码',
        totalTime: 60,
        canClick: true,
        sendCodeButtonType: 'primary',
        buttonDisabled: true,
        passwordLogin: true
      }
    },
    methods: {
      submit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loginPwdApi();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      async loginCodeApi() {
        this.$store.dispatch('Login', this.form).then(res => {
          this.$router.push({path: '/'})
        })
        // const {name, code} = this.form;
        // const res = await loginCode({name, code});
        // setToken(res.key)
        // commit('SET_TOKEN', data.key)
      },
      async loginPwdApi() {
        const {name, password} = this.form;
        this.$store.dispatch('Login', {
          name, password
        }).then(res => {
          this.$router.push({path: '/'})
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/variables.scss";

  .change-login-type {
    margin-bottom: 50px;
    display: flex;
    color: $mainColor;
    cursor: pointer;
    line-height: 24px;
    font-size: 14px;

    .lock, .message {
      width: 24px;
      height: 24px;
      margin-right: 10px;
    }

    .message {
    }

  }

  .to-link {
    text-align: right;
    font-size: 14px;
    color: #999999;

    a {
      color: #999999;
      text-decoration: underline;
    }
  }

</style>
