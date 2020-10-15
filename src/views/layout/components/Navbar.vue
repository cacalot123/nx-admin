<template>
  <el-menu class="navbar" mode="horizontal">
    <nx-hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></nx-hamburger>

    <nx-breadcrumb class="breadcrumb-container"></nx-breadcrumb>

    <div class="right-menu">

<!--      <nx-github style="margin-top:2px" class="nx-help right-menu-item"></nx-github>-->
      <!-- <error-log class="errLog-container right-menu-item"></error-log> -->
<!--      <nx-help class="nx-help right-menu-item"/>-->


      <!-- <lang-select class="international right-menu-item"></lang-select> -->
<!--      <nx-lang-select class="international right-menu-item"></nx-lang-select>-->
    </div>
  </el-menu>
</template>

<script>
  import {mapGetters} from 'vuex'

  import nxBreadcrumb from '@/components/nx-breadcrumb'
  import nxHamburger from '@/components/nx-hamburger'
  // import nxHelp from '@/components/nx-help/index'

  // import nxLangSelect from '@/components/nx-lang-select/index'

  // import nxGithub from '@/components/nx-github/index'
  import zh from '@/lang/zh'

  export default {
    name: 'navBar',
    components: {
      nxBreadcrumb,
      nxHamburger
      // nxHelp,
      // nxLangSelect
      // nxGithub
    },
    mounted() {
      this.getBreadcrumb()
    },
    computed: {
      ...mapGetters(['sidebar', 'name', 'avatar'])
    },
    watch: {
      $route() {
        this.getBreadcrumb()
      }
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('ToggleSideBar')
      },
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload() // In order to re-instantiate the vue-router object to avoid bugs
        })
      },
      getBreadcrumb() {
        const {name} = this.$route;
        // console.log('zh', zh.route[name])
        this.tagName = zh.route[name];
        const matched = this.$route.matched.filter(item => item.name)
        console.log('matched', matched);
        // const first = matched[0]
        // if (first && first.name !== 'dashboard') {
        //   matched = [{path: '/dashboard', meta: {title: 'Dashboard'}}].concat(matched)
        // }
        // this.levelList = matched
        // console.log('this.levelList', this.levelList);
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;

    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }

    .breadcrumb-container {
      float: left;
    }

    .nx-help {
      display: inline-block;
      vertical-align: top;
    }

    .right-menu {
      float: right;
      height: 100%;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        margin: 0 8px;
      }

      .screenfull {
        height: 20px;
      }

      .international {
        vertical-align: top;
      }

      .theme-switch {
        vertical-align: 15px;
      }

      .avatar-container {
        height: 50px;
        margin-right: 30px;

        .avatar-wrapper {
          cursor: pointer;
          margin-top: 5px;
          position: relative;

          .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
