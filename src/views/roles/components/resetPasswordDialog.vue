<template>
  <el-dialog
    title="重置密码"
    :visible.sync="dialogVisible"
    width="720px"
    @close="close"
  >
    <el-form ref="fillForm" :model="fillForm" :rules="rules" label-width="200px" style="width: 500px">
      <el-form-item label="用户名：" prop="login_name">
        {{fillForm.loginName}}
      </el-form-item>
      <el-form-item label="密码：" prop="pwd">
        <el-input v-model="fillForm.pwd" type="password"/>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {user} from '@/components/enumerate/user'
  import {resetPwd} from '@/api/user'

  export default {
    name: 'resetPasswordDialog',
    data() {
      return {
        role: [],
        user,
        fillForm: {
          userId: '',
          loginName: '',
          pwd: ''
        },
        dialogVisible: false,
        rules: {}
      }
    },
    methods: {
      async editApi() {
        console.log('this.fillForm', this.fillForm)
        const res = await resetPwd({
          userId: this.fillForm.userId,
          pwd: this.fillForm.pwd
        })
        if (res) {
          this.$message({
            message: '修改成功',
            type: 'success',
            onClose: () => {
              this.close()
              // location.reload()
            }
          });
        }
      },
      open(data) {
        this.dialogVisible = true;
        console.log(data);
        this.$nextTick(() => {
          this.fillForm = {
            userId: data.id,
            loginName: data.login_name
          };
        })
      },
      close() {
        this.dialogVisible = false;
        this.$emit('closeDialog');
      },
      submit() {
        try {
          this.editApi()
        } catch (e) {
          console.log(e)
        }
      }
    }
  }

</script>

<style scoped>

</style>
