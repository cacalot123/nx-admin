<template>
  <el-dialog
    :title="id?'编辑用户':'新增用户'"
    :visible.sync="dialogVisible"
    width="720px"
    @close="close"
  >
    <el-form ref="fillForm" :model="fillForm" :rules="rules" label-width="200px" style="width: 500px">
      <el-form-item label="登录姓名：" prop="loginName">
        <el-input v-model="fillForm.loginName"/>
      </el-form-item>
      <el-form-item label="角色：" prop="role_id">
        <el-select
          v-model="fillForm.roleId"
          placeholder="请选择角色"
          clearable
        >
          <el-option
            v-for="item in role"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态：" prop="status">
        <el-select
          v-model="fillForm.status"
          placeholder="状态"
          clearable
        >
          <el-option
            v-for="item in Object.entries(user.status)"
            :key="item[0]"
            :label="item[1]"
            :value="item[0]">
          </el-option>
        </el-select>
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
  import {roleList} from '@/api/roles'
  import {userEdit} from '@/api/user'

  export default {
    name: 'add_edit_dialog',
    data() {
      return {
        role: [],
        user,
        id: '',
        fillForm: {
          loginName: '',
          userName: '',
          displayName: '',
          mobile: '',
          roleId: '',
          status: '',
          type: '',
          typeId: ''
        },
        disabledTypeId: false,
        typeNameListOption: [],
        supplierListOption: [],
        distributorListOption: [],
        visibleUserOption: [],
        dialogVisible: false,
        type: [],
        rules: {}
      }
    },

    methods: {
      async init() {
        await this.roleListApi()
        await this.statusApi()
      },
      async editApi() {
        console.log('this.fillForm', this.fillForm)
        const res = await userEdit({
          id: this.id,
          ...this.fillForm
        })
        if (res) {
          this.$message({
            message: `${this.id ? '修改' : '添加'}成功`,
            type: 'success',
            onClose: () => {
              this.close()
              // location.reload()
            }
          });
        }
      },
      async statusApi() {
        await this.$store.dispatch('getStatus').then(res => {
          console.log('store2', this.$store);
        })
      },
      async roleListApi() {
        const res = await roleList()
        this.role = res.list
      },
      async typeChange(value) {
        this.fillForm.typeId = '';
        if (value === 1) {
          this.typeNameListOption = this.supplierListOption;
        } else {
          this.typeNameListOption = this.distributorListOption;
        }
        console.log(this.typeNameListOption);
      },

      async open(data) {
        this.dialogVisible = true;
        await this.init();
        if (data) {
          console.log('data', data);
          this.typeChange(data.type_id)

          this.$nextTick(() => {
            this.fillForm = {
              ...data,
              status: data.status.toString(),
              type: data.type,
              typeId: +data.type_id,
              displayName: data.display_name,
              loginName: data.login_name,
              roleId: data.role_id
            };
            this.id = data.id;
          })
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
      },
      changeTypeId(v) {
        this.fillForm.typeId = v
      }
    },
    watch: {
      'fillForm.type': function(val) {
        if (val === 3) {
          this.disabledTypeId = true
          this.fillForm.typeId = ''
        } else {
          this.disabledTypeId = false
        }
        // if (val) {
        //   this.canButtonClick = true
        // } else {
        //   this.canButtonClick = false
        // }
      }
    }
  }
</script>

<style scoped>

</style>
