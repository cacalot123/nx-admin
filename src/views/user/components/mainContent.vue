<template>
  <div class="main-content" :style="{backgroundImage: `url(${banner})`}">
    <div class="content-box">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
  import bg from '@/assets/images/register_login/bg.jpg'
  export default {
    name: 'main-content',
    data() {
      return {
        banner: bg
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/variables.scss";
  .main-content {
    height: 640px;
    background: #000000 no-repeat center center;

    .content-box {
      width: 1440px;
      margin: 0 auto;
      position: relative;

      .register-login-box {
        position: absolute;
        right: 180px;
        top: 63px;
        width: 380px;
        /*height: 513px;*/
        background: #FFFFFF;
        border-radius: 10px;
        box-sizing: border-box;
        padding: 40px 35px;

        .title {
          font-size: 20px;
          color: #333333;
          font-weight: bolder;
          margin-bottom: 32px;
        }

        .el-form-item{
          width: 320px;
        }
        .input-1 {
        }

        .input-2 {
          width: 180px;
        }

        .input-1, .input-2 {
          .el-input__inner {
            background: #F6F8FB;
            border-radius: 5px;
            border: 0 none;
            color: #333333;
            height: 48px;
          }
        }

        .send-code {
          width: 120px;
          height: 48px;
        }

        .agree {
          a {
            color: $mainColor;
          }
        }
        .el-form-item.justify-between {
          .input-2 {
            margin-right: 15px
          }

          .el-form-item__content {
            display: flex;
            justify-content: space-between;
          }
        }
        .submit-button {
          display: block;
          width: 100%;
          background-image: linear-gradient(-135deg, #5BA3FC 15%, #2A89FF 85%);
          box-shadow: 0 5px 10px 0 #A6CEFF;
          border-radius: 24px;
          font-size: 16px;
          height: 48px;
          &.is-disabled {
            opacity: .5;
          }
        }
      }
    }
  }
</style>
