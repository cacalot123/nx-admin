<template>
  <div class="user-list">
    <el-form ref="filters" :inline="true" :model="filters" label-width="120px" class="filter-box">
      <el-form-item label="input：" prop="input">
        <el-input v-model="filters.input" class="input_1" placeholder="请输入input"/>
      </el-form-item>
      <el-form-item label="select：" prop="type">
        <el-select
          v-model="filters.select"
          placeholder="用户类型"
          clearable
        >
          <el-option
            v-for="item in selectOption"
            :key="item.code"
            :label="item.name"
            :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="select：" prop="type">
        <el-select
          v-model="filters.asyncSelect"
          placeholder="异步拉数据"
          clearable
          filterable
          remote
          reserve-keyword
          :remote-method="remoteMethod"
        >
          <el-option
            v-for="item in asyncSelectOption"
            :key="item.code"
            :label="item.name"
            :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="date:" prop="date">
        <el-date-picker
          v-model="filters.datePicker"
          type="date"
          placeholder="datePicker"
          clearable
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="daterange:" prop="daterange">
        <el-date-picker
          v-model="filters.daterange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          clearable
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
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
      <el-button @click="chooseApi({ids: selectItem.map(v => v.id)})">多选</el-button>
      <el-button @click="chooseApi">全选</el-button>
    </div>
    <table-with-page :pageInfo="page" @changePage="changePageInfo">
      <template slot="table">
        <el-table
          ref="rolesListTable"
          :data="tableData"
          class="main-table"
          @selection-change="handleSelectionChange"
          :row-key="getRowKeys"
        >
          <el-table-column
            type="selection"
            :reserve-selection="true"
            width="55">
          </el-table-column>
          <el-table-column prop="id" label="序号" width="50"/>
          <el-table-column prop="name" label="渠道名"/>
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
      </template>
    </table-with-page>
    <add-edit-dialog ref="addEditDialog"
                     @closeDialog="listApi()"></add-edit-dialog>
  </div>
</template>

<script>
  import TableWithPage from '@/components/component-table-with-page'
  import RolesItem from '@/components/roles-item'
  import {channelList} from '@/api/channel'
  import addEditDialog from './components/addEditDialog'
  import store from '@/store'

  export default {
    mixins: [RolesItem],
    components: {
      TableWithPage,
      addEditDialog
    },
    data() {
      return {
        filters: {
          input: '',
          select: '',
          date: '',
          daterange: '',
          asyncSelect: ''
        },
        tableData: [],
        selectItem: [],
        selectOption: [],
        asyncSelectOption: [],
        page: {
          current: 1,
          limit: 20,
          total: 1
        }
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      async init() {
        await this.statusApi();
        await this.listApi();
      },
      async statusApi() {
        await this.$store.dispatch('getStatus').then(res => {
          console.log('res', res)
          this.selectOption = res.status;
          console.log(this.selectOption);
        })
      },
      async listApi() {
        const {list, total_row} = await channelList({
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
      changePageInfo({page}) {
        this.page = page;
        this.listApi();
      },
      submit() {
        this.$refs['filters'].validate((valid) => {
          if (valid) {
            this.listApi();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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

      // 多选部分
      handleSelectionChange(val) {
        this.selectItem = val;
      },
      getRowKeys(row) {
        return row.id;
      },
      chooseApi({ids}) {
        console.log('this.selectItem', this.selectItem);
        console.log('ids', ids);
      },
      async remoteMethod(query) {
        if (query !== '') {
          this.GetTagListApi({name: query})

          // try {
          //   const res = await GetTagList({name: query});
          //   this.tagList = res.map(v => ({
          //     code: v.id,
          //     name: v.name
          //   }));
          // } catch (e) {
          //   console.log(e)
          // }
        } else {
          this.tagList = [];
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .user-list {

  }
</style>
