<template>
  <div class="roles-list">
    <el-form ref="filter" :inline="true" :model="filters" label-width="120px" class="filter-box">
      <el-form-item label="角色名称：" prop="name">
        <el-input v-model="filters.name" class="input_1" clearable/>
      </el-form-item>
      <!--      <el-form-item label="类型：" prop="type">-->
      <!--        <el-select-->
      <!--          v-model="filter.type"-->
      <!--          placeholder="用户类型"-->
      <!--          clearable-->
      <!--        >-->
      <!--          <el-option-->
      <!--            v-for="item in userTypeListOption"-->
      <!--            :key="item.id"-->
      <!--            :label="item.label"-->
      <!--            :value="item.value">-->
      <!--          </el-option>-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
      <el-form-item class="filter-box-button">
        <el-button type="primary" @click="submit"
                   v-if="!setRoles('roles/list/search')"
        >查 询</el-button>
        <el-button @click="$refs['filter'].resetFields()"
                   v-if="!setRoles('roles/list/search')"

        >清 除</el-button>
        <el-button type="primary" @click="add"
                   v-if="!setRoles('roles/list/add')"
        >新 增</el-button>
      </el-form-item>
    </el-form>

    <el-table
      ref="rolesListTable"
      :data="tableData"
      class="main-table"
      empty-text="没有权限"
      @selection-change="handleSelectionChange"
      :row-key="getRowKeys"
    >
      <el-table-column
        type="selection"
        :reserve-selection="true"
        width="55">
      </el-table-column>
      <el-table-column prop="id" label="序号"/>
      <el-table-column prop="name" label="角色名"/>
      <el-table-column prop="status" label="状态">
        <template slot-scope="{row}">
          {{user.status[row.status]}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="180">
        <template slot-scope="{row}">
          <el-button
            type="text"
            size="small"
            @click="edit(row)"
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <roles-add-edit-dialog
      ref="rolesAddEditDialog"
      @reload="roleListApi"
      :key="dialogKey"
    />
  </div>
</template>

<script>
  import {roleDel, roleList} from '@/api/roles'
  import {user} from '@/components/enumerate'
  import rolesAddEditDialog from './components/rolesAddEditDialog'
  // import UserModel from '@/model/User'
  import RolesItem from '@/components/roles-item'

  export default {
    name: 'list',
    components: {
      rolesAddEditDialog
    },
    mixins: [RolesItem],
    data() {
      return {
        user,
        filters: {
          name: ''
        },
        tableData: [],
        dialogKey: 'add'
      }
    },
    mounted() {
      this.roleListApi();
      // const data = [{name: 'Onion'}, {name: 'Garlic'}]
      // UserModel.create({data}).then(res => console.log('res', res))
    },
    methods: {
      async roleDelApi({id, name}) {
        const res = await roleDel({id, name})
        if (res === 'ok') {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.roleListApi();
        }
      },
      async roleListApi() {
        const {list} = await roleList({
          ...this.filters
        });
        this.tableData = list;
      },
      handleSelectionChange(val) {
        this.selectItem = val;
      },
      getRowKeys(row) {
        return row.id;
      },
      submit() {
        this.roleListApi();
      },
      add() {
        this.dialogKey = 'add';
        this.$nextTick(() => {
          this.$refs.rolesAddEditDialog.open()
        })
      },
      edit(row) {
        this.dialogKey = 'edit';
        this.$nextTick(() => {
          this.$refs.rolesAddEditDialog.open(row)
        })
      },
      delItem({id, name}) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        })
          .then(() => {
            this.roleDelApi({id, name})
          })
          .catch(() => {
            this.$message({
              message: '删除已取消',
              type: 'info'
            })
          })
      },
      start() {
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .roles-list {

  }
</style>
