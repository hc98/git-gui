<style lang="scss" scoped="" type="text/css">
#Login{
  width: 100%;
  height: 100%;
  background: url('../../../static/sum.jpg') no-repeat;
  background-size: 100% 100%;
  position: relative;
  .base{
    $width: 304;
    $height: 214;
    width: $width + px;
    height: $height + px;
    padding: 8px;
    box-shadow: 0px 0px 30px #888888;
    border-radius: 6px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -$height/2+px;
    margin-left: -$width/2+px;
    p{
      $heig: 35;
      width: 100%;
      font-size: 30px;
      text-align: center;
      color: #999;
      user-select: none;
      input{
        width: calc(100% - 10px);
        height: $heig+px;
        margin-bottom: 20px;
        padding: 0 5px;
      }
      button{
        width: 100%;
        height: $heig+px;
        margin-top: 15px;
        cursor: pointer;
        font-size: 18px;
        &.active{
          background-color: #00bbee;
          color: #fff;
          &:active{
            background-color: #0099cc;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div id="Login">
    <div class="base">
      <p>登录通讯录</p>
      <p><input type="text" v-model="account" placeholder="请输入账号"></p>
      <p><input type="password" v-model="password" placeholder="请输入密码"></p>
      <p><button v-bind:disabled="!flag" v-bind:class="{active: flag}" @click='submit'>登录</button></p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data () {
      return {
        account: '',
        password: '',
        flag: false
      }
    },
    watch: {
      password: function () {
        if (this.account&&this.password) {
          this.flag = true
        }
      }
    },
    mounted() {
      const acc = window.sessionStorage.getItem('account');
      this.account = acc;
    },
    methods: {
      submit () {
        const that = this;
        this.$axios({
          method:"POST",
          url:'/api/login',
          data:{
            phone: that.account,
            password: that.password
          }
        }).then((res)=>{
          if (res.data.code==200) {
            window.sessionStorage.setItem('account', that.account);
            this.$router.push('index');
          }
        });
      }
    }
  }
</script>
