<template>
  <div class="footer">
<!--    <div class="footer-box">-->
<!--      <div class="friend-link">-->
<!--        <div class="friend-link-group">-->
<!--          <a href="https://baidu.com" target="_blank">关于生活杉德</a>-->
<!--          |-->
<!--          <a href="https://baidu.com" target="_blank">网站公告</a>-->
<!--          |-->
<!--          <a href="https://baidu.com" target="_blank">联系我们</a>-->
<!--          |-->
<!--          <a href="https://baidu.com" target="_blank">帮助中心</a>-->
<!--          |-->
<!--          <a href="https://baidu.com" target="_blank">诚征英才</a>-->
<!--          |-->
<!--          <a href="https://baidu.com" target="_blank">商家合作</a>-->
<!--          |-->
<!--          <a href="https://baidu.com" target="_blank">网站地图</a>-->
<!--          |-->
<!--          <a href="https://baidu.com" target="_blank">手机生活杉德</a>-->
<!--          |-->
<!--          <a href="https://baidu.com" target="_blank">法律声明</a>-->
<!--          |-->
<!--          <a href="https://baidu.com" target="_blank">隐私政策</a>-->

<!--          <a href="https://baidu.com" target="_blank">上海久彰电子商务有限公司</a>-->
<!--        </div>-->
<!--        <div class="copyright">营业执照 版权所有 © 生活杉德 2013-2018 保留所有权利</div>-->
<!--        <div class="certification">-->
<!--          <a v-for="v,i in certification" :key="i" :href="v.link"><img :alt="v.name" :src="v.src"/></a>-->
<!--        </div>-->

<!--      </div>-->
<!--      <div class="icp">沪公网安备 31010402002445号 | 沪ICP备13000850号</div>-->
<!--    </div>-->
  </div>
</template>

<script>
  import gongshang from '@/assets/images/footer/mdpi/gongshang.png';
  import zhengxin from '@/assets/images/footer/mdpi/zhengxin.png';

  export default {
    name: 'component-footer',
    data() {
      return {
        certification: [
          {link: '#', src: gongshang, name: '工商'},
          {link: '#', src: zhengxin, name: '征信'}

        ]
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .footer {
    background: rgba(247, 247, 247, 1);
    padding: 30px 0 20px 0;
    font-size: 12px;
    color: #999999;

  }

  .footer-box {
    width: 1200px;
    border-top: 2px solid #DCDCDC;
    margin: 0 auto;
    padding-top: 10px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;

    .friend-link-group a {
      color: #666666;
    }



    .certification {
      padding-top: 10px;
      img {
        width: 80px;
        height: 30px;
        margin-right: 10px;
      }
    }

    .icp {
    }
  }

</style>
