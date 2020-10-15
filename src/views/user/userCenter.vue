<template>
  <div class="user-center">
    <div class="user-info">
      <div class="name">{{store.getters.userInfo.name}}</div>
      <div class="user-info-list">
        <!--        <div class="user-info-item">-->
        <!--          <i class="el-icon-service"/> {{store.getters.userInfo.other.name}}-->
        <!--        </div>-->
        <div class="user-info-item">
          <i class="el-icon-mobile-phone"/>  {{store.getters.userInfo.mobile||'手机未填写'}}
        </div>
      </div>
    </div>
    <div class="right-button">
      <!--      <el-button type="primary" @click.native.prevent="$router.push(`/business/staff/add_edit/${store.getters.userInfo.id}`)" class="login-submit">修改个人信息</el-button>-->
      <el-button type="primary" @click.native.prevent="$router.push('/user/password')" class="login-submit">修改密码
      </el-button>

    </div>
  </div>
</template>

<script>
  import store from '@/store'

  export default {
    name: 'userCenter',
    data() {
      return {
        store
      }
    },
    mounted() {
      console.log(store);
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/variables.scss";

  .user-center {
    display: flex;
    justify-content: space-between;
  }

  .user-info {
    padding: 60px 0 0 100px
  }

  .name {
    margin-bottom: 43px;
    color: $secondaryColorLevel1;
    font-size: 24px;
    font-weight: bolder;
  }

  .user-info-item {
    i {
      margin-right: 10px;
      margin-bottom: 35px;
      color: $mainColor;

      &:before {
        font-size: 20px;
        position: relative;
        top: 2px;
      }
    }
  }

  .right-button {
    padding: 60px 110px 0 0;
  }
</style>
