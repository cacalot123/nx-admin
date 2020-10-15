<template>
  <div class="easy-header">
    <img :src="logo" class="logo"/>
    <div class="logo-title">{{title}}</div>
  </div>
</template>

<script>
  import logo from '@/assets/images/header/logo_blue.png'

  export default {
    name: 'easyHeader',
    data() {
      return {
        logo,
        title: localStorage.getItem('title')
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/variables.scss";

  .easy-header {
    max-width: 1380px;
    margin: 0 auto;
    padding-left: 60px;
    height: 110px;
    line-height: 110px;
    display: flex;
    color: $mainColor;

    .logo {
      margin-top: 40px;
      width: 31px;
      height: 31px;
      margin-right: 23px;
    }

    .logo-title {
      color: $mainColor;
      font-size: 24px;
      font-weight: bolder;
    }
  }
</style>
