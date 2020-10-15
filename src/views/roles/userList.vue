<template>
  <div class="user-list">
    <el-form ref="filter" :inline="true" :model="filters" label-width="120px" class="filter-box">
      <el-form-item label="用户名称：" prop="name">
        <el-input v-model="filters.name" class="input_1" clearable/>
      </el-form-item>
      <el-form-item label="类型：" prop="type">
        <el-select
          v-model="filters.type"
          placeholder="用户类型"
          clearable
        >
          <el-option
            v-for="item in Object.entries(userType)"
            :key="item[0]"
            :label="item[1]"
            :value="item[0]">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="filter-box-button">
        <el-button type="primary" @click="submit"
        >查 询
        </el-button>
        <el-button @click="$refs['filter'].resetFields()"
        >清 除
        </el-button>
        <el-button type="primary" @click="add"
        >新 增
        </el-button>
      </el-form-item>
    </el-form>
    <div class="handle-button">
      <el-button @click="exportApi({ids: selectItem.map(v => v.id)})">导出</el-button>
      <el-button @click="exportApi">全部导出</el-button>

    </div>
    <table-with-page :pageInfo="page" @changePage="changePageInfo">
      <template slot="table">
        <el-table
          ref="rolesListTable"
          :data="tableData"
          class="main-table"
          empty-text="没有用户"
          @selection-change="handleSelectionChange"
          :row-key="getRowKeys"
        >
          <el-table-column
            type="selection"
            :reserve-selection="true"
            width="55">
          </el-table-column>
          <el-table-column prop="id" label="序号" width="50"/>
          <el-table-column prop="login_name" label="登录姓名"/>
          <el-table-column prop="role.name" label="所属角色"/>
          <el-table-column prop="status" label="状态" :formatter="statusFormatter"/>
          <el-table-column prop="updated_at" label="最后修改时间" width="170"/>
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
              <el-button
                type="text"
                size="small"
                @click="resetPassword(row)"
              >
                重置密码
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </table-with-page>
    <add-edit-dialog ref="addEditDialog"
                     @closeDialog="listApi()"></add-edit-dialog>
    <reset-password-dialog ref="resetPasswordDialog"
                     @closeDialog="listApi()"></reset-password-dialog>
  </div>
</template>

<script>
  import TableWithPage from '@/components/component-table-with-page'
  import RolesItem from '@/components/roles-item'
  import {user} from '@/components/enumerate'
  import {userList} from '@/api/user'
  import addEditDialog from './components/addEditDialog'
  import resetPasswordDialog from './components/resetPasswordDialog'
  import store from '@/store'

  export default {
    name: 'user-list',
    mixins: [RolesItem],
    components: {
      TableWithPage,
      addEditDialog,
      resetPasswordDialog
    },
    data() {
      this.userType = {
        ...user.type
      }
      return {
        user,
        filters: {
          name: '',
          type: ''
        },
        tableData: [],
        selectItem: [],
        page: {
          current: 1,
          limit: 20,
          total: 1
        }
      }
    },
    mounted() {
      this.listApi();
    },
    methods: {
      async listApi() {
        const {list, total_row} = await userList({
          ...this.filters,
          page: this.page.current,
          limit: this.page.limit
        })
        this.page = {
          ...this.page,
          total: total_row
        }
        this.tableData = list;
      },
      async exportApi({ids}) {
        console.log('this.selectItem', this.selectItem);
        console.log('ids', ids);
      },
      handleSelectionChange(val) {
        this.selectItem = val;
      },
      getRowKeys(row) {
        return row.id;
      },
      changePageInfo({page}) {
        this.page = page;
        this.listApi();
      },
      submit() {
        this.listApi();
      },
      add() {
        this.$refs.addEditDialog.open()
      },
      edit(row) {
        this.$refs.addEditDialog.open(row)
      },
      resetPassword(row) {
        this.$refs.resetPasswordDialog.open(row)
      },
      start() {
        console.log(this.selectItem)
        console.log(store)
      },
      statusFormatter(row, column, cellValue, index) {
        return user.status[row.status]
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .user-list {

  }
</style>
