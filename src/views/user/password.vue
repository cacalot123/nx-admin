<template>
  <div class="add-edit">
    <div class="add-edit-bd">
      <el-form ref="form" :model="form" :rules="rules" label-width="250px" class="fill-add-edit-form">
        <el-form-item label="原登陆密码：" prop="oldPwd">
          <el-input v-model="form.oldPwd" autocomplete="off" type="password" placeholder="请输入登陆密码"></el-input>
          <span class="tips">新注册用户无需填写原登陆密码</span>
        </el-form-item>

        <el-form-item label="新登陆密码：" prop="newPwd">
          <el-input v-model="form.newPwd" autocomplete="off" type="password" placeholder="请输入新登陆密码"></el-input>
        </el-form-item>
        <el-form-item label="确认新登陆密码：" prop="newPwdConfirm">
          <el-input v-model="form.newPwdConfirm" autocomplete="off" type="password" placeholder="请再次输入登陆密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" @click="onSubmit" round>确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {changePwd} from '@/api/user'

  export default {
    name: 'password',
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value.length < 8 || value.length > 16) {
          callback(new Error('密码长度需8-16位'));
        } else {
          if (this.form.newPwdPonfirm !== '') {
            this.$refs.form.validateField('newPwdConfirm');
          }
          callback();
        }
      };
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.newPwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        form: {
          oldPwd: '',
          newPwd: '',
          newPwdConfirm: ''
        },
        rules: {
          newPwd: [
            {validator: validatePass, trigger: 'blur'}
          ],
          newPwdConfirm: [
            {validator: validatePass2, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      onSubmit() {
        this.$refs.form.validate(async valid => {
          if (valid) {
            console.log(this.form);
            const res = await changePwd({
              oldPwd: this.form.oldPwd,
              newPwd: this.form.newPwd
            })
            if (res) {
              this.$message({
                message: '修改密码成功',
                type: 'success',
                onClose: () => {
                  this.$router.push({ path: '/user' })
                }
              });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/variables.scss";

  .tips {
    color: $secondaryColorLevel3;
    padding-left: 12px;
  }

  .add-edit {
    padding-top: 60px;
  }
</style>
