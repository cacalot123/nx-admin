<template>
  <div class="component-header">
    <img :src="logo" class="logo"/>
    <div class="logo-title">{{title}}</div>
    <div class="login-info">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{store.getters.name||store.getters.userInfo.other.name}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <!--          <el-dropdown-item>黄金糕</el-dropdown-item>-->
          <!--          <el-dropdown-item>狮子头</el-dropdown-item>-->
          <!--          <el-dropdown-item>螺蛳粉</el-dropdown-item>-->
          <!--          <el-dropdown-item disabled>双皮奶</el-dropdown-item>-->
          <el-dropdown-item> <router-link to="/user"><div>个人中心</div></router-link></el-dropdown-item>
          <el-dropdown-item divided><div @click="logout">退出</div></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import logo from '@/assets/images/header/logo_white.png'
  import approve from '@/assets/images/header/approve.png'
  import store from '@/store'

  export default {
    name: 'top',
    data() {
      return {
        logo,
        approve,
        store,
        company: store.state.user.userInfo.enterprise,
        title: localStorage.getItem('title')
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('FedLogOut').then(() => {
          location.reload() // In order to re-instantiate the vue-router object to avoid bugs
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .component-header {
    background: linear-gradient(#5BA3FC, #3889ED);
   // background: $color-primary;
    height: 68px;
    line-height: 68px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    padding: 0 32px 0 26px;
    display: flex;

    .logo {
      margin-top: 24px;
      margin-right: 10px;
      width: 20px;
      height: 20px;
    }

    .logo-title {
      font-size: 14px;
      font-weight: bolder;
      color: #FFFFFF;
      margin-right: 48px;
    }

    .company-name {
      font-weight: bolder;
      font-size: 22px;
      margin-right: 15px;
      color: #FFFFFF;
    }

    .approve-state {
      width: 45px;
      height: 18px;
      margin-top: 26px;
    }

    .login-info {
      text-align: right;
      flex: 1;

      .el-dropdown-link {
        cursor: pointer;
        color: #FFFFFF;
        font-size: 16px;
      }

      .el-icon-arrow-down {
        font-size: 12px;
      }
    }

  }

  .el-dropdown-menu {
    margin-top: -15px
  }
</style>
