<template>
  <div class="home">
    <div class="search"><input autofocus type="text" name="" id=""></div>
    45646
    5465465
    464654654654654654654654654654654
    654654654654
    <div class="edit">
      <i>+</i>
      <b>-</b>
      <b>*</b>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {

    }
  },
  created () {
 
  },
  methods: {
    updateCode () {

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

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.home{
  position: relative;
  text-align: center;
  .search{
    position: absolute;
    top: 0.6rem;
    width: 100%;
    opacity: 0.6;
    input{
      border: 1px solid #999;
      width: 78%;
      height: 0.5rem;
      border-radius: 0.3rem;
      padding: 0 0.3rem;
      // opacity: 1;
      color: #000;
    }
  }
  i{
    $h: 1rem;
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    width: $h;
    height: $h;
    line-height: 0.86rem;
    background-color: rgb(42, 187, 114);
    border-radius: 50% 50%;
    text-align: center;
    font-size: 1rem;
    color: #fff;
  }
}
</style>
