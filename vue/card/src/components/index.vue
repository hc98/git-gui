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
            console.log(document.cookie)
            this.$router.push({
              path: '/home'
            })
          } else if (res.status === 201) {
            this.alert(res.data.msg)
          } else if (res.status === 202) {
            this.alert(res.data.msg)
          } else {
            this.alert(res.data.msg)
          }
        }).catch((error) => {
          this.alert('操作失败')
          console.log(error)
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
      this.updateCode()
    }
  }
}
</script>
