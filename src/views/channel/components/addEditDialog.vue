<template>
  <el-dialog
    :title="id?'编辑渠道':'新增渠道'"
    :visible.sync="dialogVisible"
    width="720px"
    @close="close"
  >
    <el-form ref="fillForm" :model="fillForm" :rules="rules" label-width="200px" style="width: 500px">
      <el-form-item label="渠道名：" prop="name">
        <el-input v-model="fillForm.name"/>
      </el-form-item>
      <el-form-item label="活动性质">
<!--        <el-checkbox-group v-model="fillForm.type"  size="mini">-->
<!--          <el-checkbox-button label="开启" :value="1"></el-checkbox-button>-->
<!--          <el-checkbox-button label="关闭" :value="0"></el-checkbox-button>-->
<!--        </el-checkbox-group>-->
        <el-radio-group v-model="fillForm.type"  size="mini">
          <el-radio-button :label="v.code" :key="v.code" v-for="v,i in statusOption">{{v.name}}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动性质">
        <el-radio-group v-model="fillForm.radio">
          <el-radio :label="3">备选项</el-radio>
          <el-radio :label="6">备选项</el-radio>
          <el-radio :label="9">备选项</el-radio>
        </el-radio-group>
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
  import {channelEdit} from '@/api/channel'

  export default {
    name: 'add_edit_dialog',
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
      return {
        dialogVisible: false,
        role: [],
        user,
        id: '',
        statusOption: [],
        fillForm: {
          name: '',
          type: 0
        },
        rules: {
          name: [
            {required: true, trigger: 'blur', message: '请输入用户名'}
          ],
          password: [
            {validator: validatePass, trigger: 'blur'}
          ]
        }
      }
    },

    methods: {
      async init() {
        await this.statusApi()
      },
      async editApi() {
        this.$refs['fillForm'].validate(async(valid) => {
          if (valid) {
            try {
              await channelEdit({
                id: this.id,
                ...this.fillForm
              })
              this.$message({
                message: `${this.id ? '修改' : '添加'}成功`,
                type: 'success',
                onClose: () => {
                  this.close()
                  // location.reload()
                }
              });
            } catch (e) {
              console.log('e', e)
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      async statusApi() {
        await this.$store.dispatch('getStatus').then(res => {
          this.statusOption = res.status
        })
      },

      async open(data) {
        this.dialogVisible = true;
        await this.init();
        if (data) {
          this.fillForm = data;
        } else {
          this.$nextTick(() => {
            this.$refs['fillForm'].resetFields()
            this.id = '';
            this.fillForm.roleId = ''
          })
        }
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
