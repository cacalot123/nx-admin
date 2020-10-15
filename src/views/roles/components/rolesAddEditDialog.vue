<template>
  <el-dialog
    :title="id? '修改角色' : '添加角色'"
    :visible.sync="dialogVisible"
    width="720px"
    @close="close"
  >
    <el-form ref="fillForm" :model="fillForm" :rules="rules" label-width="200px" style="width: 500px">
      <el-form-item label="角色名：" prop="name">
        <el-input v-model="fillForm.name" clearable/>
      </el-form-item>
      <el-form-item label="角色权限：" prop="permissions">
        <el-input
          placeholder="输入角色权限搜索"
          v-model="fillForm.filterPermissionsText"
          style=" margin-bottom: 10px"
          clearable
        >
        </el-input>
        <div class="tree-box">
          <el-tree
            node-key="id"
            :data="permissionsList"
            v-model="fillForm.permissions"
            :props="defaultProps"
            :default-expanded-keys="checkedTree"
            :default-checked-keys="checkedTree"
            ref="permissionsListTree"
            show-checkbox
            :filter-node-method="filterNode"
            @check-change="handleCheckChange"
          ></el-tree>
        </div>
      </el-form-item>
      <el-form-item label="状态：" prop="status">
        <el-switch
          v-model="fillForm.status"
        >
        </el-switch>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {roleEdit} from '@/api/roles'
  import {permissionsList} from '@/api/permissions';
  import {listToTree} from '@/utils'

  export default {
    name: 'roles_add_edit_dialog',
    data() {
      return {
        id: '',
        fillForm: {
          name: '',
          filterPermissionsText: '',
          permissions: [],
          status: ''
        },
        dialogVisible: false,
        rules: {
          name: [
            {required: true, message: '角色名称', trigger: 'change'}
          ]
        },
        permissionsList: [],
        checkedTree: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      }
    },
    watch: {
      'fillForm.filterPermissionsText'(val) {
        this.$refs.permissionsListTree.filter(val);
      }
    },
    methods: {
      async roleEditApi({roleKeys}) {
        try {
          await roleEdit({
            id: this.id,
            name: this.fillForm.name,
            permissions: roleKeys.join('|'),
            status: this.fillForm.status ? 1 : 0
          })
          this.$message({
            message: `角色权限${this.id ? '修改' : '添加'}成功`,
            type: 'success',
            onClose: () => {
              this.dialogVisible = false;
              location.reload()
            }
          });
        } catch (e) {
          console.log(e)
        }
      },
      async permissionsListApi() {
        try {
          const res = await permissionsList();
          this.permissionsList = listToTree(res.rows, null, 0);
        } catch (e) {
          console.log(e)
        }
      },
      open(data) {
        this.dialogVisible = true;
        this.permissionsListApi();
        if (data) {
          this.id = data.id;
          const parentsIds = data.role_permissions.map(value => value.permission.parent_id);
          const son = data.role_permissions.filter(value => !parentsIds.includes(value.permission_id));
          this.fillForm = {
            filterPermissionsText: '',
            name: data.name,
            status: data.status ? 1 : 0
          }
          this.checkedTree = son.map(value => value.permission_id);
          this.$nextTick(() => {
            this.$refs.permissionsListTree.setCheckedKeys(this.checkedTree);
          })
        }
      },
      close() {
        this.dialogVisible = false;
        this.$emit('reload')
      },
      submit() {
        this.$refs['fillForm'].validate((valid) => {
          if (valid) {
            const roleKeys = this.$refs.permissionsListTree.getCheckedKeys().concat(this.$refs.permissionsListTree.getHalfCheckedKeys());
            if (roleKeys.length === 0) {
              this.$message.error('请选择角色权限');
              return false;
            }
            this.roleEditApi({roleKeys});
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      handleCheckChange(data, checked, indeterminate) {
      }
    }
  }
</script>

<style scoped>
  .tree-box {
    border: 1px solid #DCDFE6
  }
</style>
