<template>
  <div class="table">
    <slot name="table" :currentPage="page.current"></slot>
    <div class="el-pagination-box">
      <el-pagination
        v-if="!noPage"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40]"
        layout="prev, pager, next,jumper,sizes,total"
        :current-page.sync="page.current"
        :page-size="page.limit"
        :total="page.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'table-with-page',
    props: {
      pageInfo: {
        required: true,
        type: Object
      },
      noPage: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        page: {
          ...this.pageInfo
        }
      }
    },
    mounted() {
      console.log(this.pageInfo);
    },
    watch: {
      pageInfo: {
        handler(val) {
          this.page = {...val}
        },
        immediate: true

      }
    },
    methods: {
      handleSizeChange(limit) {
        this.page = {
          ...this.page,
          limit
        };
        // this.deptListApi({page: 1, limit});
        this.$emit('changePage', {page: this.page})
      },
      handleCurrentChange(current) {
        this.page = {
          ...this.page,
          current
        };
        this.$emit('changePage', {page: this.page})
        // this.deptListApi({page: current, limit: this.page.limit});
      }
    }
  }
</script>

<style scoped>

</style>
