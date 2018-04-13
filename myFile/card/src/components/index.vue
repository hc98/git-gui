<template>
  <div class="index">
    <a href="">CARD</a>
    <div class="box">
      <input autofocus type="number" id="phone" oninput="if(value.length>5)value=value.slice(0,11)" v-model="phone" placeholder="请输入手机号">
      <input type="password" id="pwd" maxlength=6 v-model="pwd" placeholder="请输入密码">
      <p><input type="text" id="yzm" maxlength=4 v-model="yzm" placeholder="请输入验证码"><i @click="updateCode">{{code.slice(0, 4)}}</i></p>
      <button @click="login">登录</button>
    </div>
    <div class="winBox" v-show="show">
      {{msg}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      code: 'error!',
      codeArr: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
      flag: true,
      phone: null,
      pwd: null,
      yzm: null,
      msg: '',
      show: false
    }
  },
  created () {
    this.code = ''
    for (let index = 0; index < 4; index++) {
      this.code += this.codeArr[Math.floor(Math.random() * 37)]
    }
  },
  methods: {
    updateCode () {
      // 刷新验证码限制，没1s可刷新一次 ？？？
      // const timer = setTimeout(() => {
      //   this.flag = true
      //   console.log(9)
      // }, 1500)
      if (this.flag) {
      //   this.flag = false
        this.code = ''
        this.yzm = null
        for (let index = 0; index < 4; index++) {
          this.code += this.codeArr[Math.floor(Math.random() * 37)]
          // console.log(index)
        }
        // timer()
      }
      // clearTimeout(timer)
    },
    login () {
      if (!(this.phone && this.pwd && this.yzm)) {
        this.alert('请输入完整！')
      } else if (this.phone.length !== 11) {
        this.alert('手机号长度错误！')
      } else if (this.pwd.length !== 6) {
        this.alert('密码长度错误！')
      } else if (this.code !== this.yzm) {
        this.alert('验证码错误！')
      } else {
        this.$axios.post('/apis/login', {
          phone: this.phone,
          password: this.pwd
        }).then((res) => {
          console.log(res)
          if (res.status === 200) {
            this.$router.push('/home')
          } else if (res.status === 201) {
            this.alert(res.body.msg)
          } else if (res.status === 202) {
            this.alert(res.body.msg)
          } else {
            this.alert(res.body.msg)
          }
        }).catch((err) => {
          this.alert('操作失败')
        })
      }
    },
    alert (msg) {
      clearTimeout()
      const that = this
      that.msg = msg
      that.show = true
      setTimeout(() => {
        that.show = false
      }, 1000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.index{
  text-align: center;
  padding-top: 1rem;
  a{
    font-size: 1rem;
  }
  .box{
    width: 80%;
    height: 3.8rem;
    margin: 2rem auto 1rem;
    padding: .1rem;
    box-shadow: 0px 0px 50px #999;
    border-radius: .1rem;
    input{
      display: block;
      width: 5rem;
      height: .5rem;
      line-height: .5rem;
      margin: 0.3rem auto;
      border-bottom: 1px solid #999;
      text-align: center;
    }
    p{
      width: 5rem;
      margin: 0.3rem auto;
      overflow: hidden;
      input{
        width: 3.5rem;
        margin: 0;
        float: left;
      }
      i{
        font-style: italic;
        float: right;
        margin-right: .3rem;
      }
    }
    button{
      width: 70%;
      height: .7rem;
      margin: 0.2rem auto 0;
      background-color: #3fcbdd;
      color: #fff;
      font-size: .36rem;
      &:active{
        background-color: #00bcd3;
      }
    }
  }
  .winBox{
    width: 3rem;
    height: 1rem;
    line-height: 1rem;
    position: absolute;
    top: 2.5rem;
    left: 50%;
    margin-left: -1.5rem;
    text-align: center;
    background-color: rgba(153, 153, 153, 0.5);
    border-radius: 0.1rem;
  }
}
</style>
