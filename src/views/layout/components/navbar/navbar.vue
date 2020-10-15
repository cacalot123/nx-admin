<template>
  <div class="navbar">{{tagName}}</div>
</template>

<script>
  import zh from '@/lang/zh'

  export default {
    name: 'navBar',
    data() {
      return {
        tagName: ''
      }
    },
    mounted() {
      this.getBreadcrumb()
    },
    watch: {
      $route() {
        this.getBreadcrumb()
      }
    },
    methods: {
      getBreadcrumb() {
        const {name, meta} = this.$route;
        this.tagName = zh.route[name] || meta.title;
        const matched = this.$route.matched.filter(item => item.name)
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

<style scoped>
  .navbar {
    height: 74px;
    line-height: 74px;
    font-size: 18px;
    font-weight: bolder;
    background: #f0f3fa;
  }
</style>
