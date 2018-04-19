<template>
  <div class="details">
    <div class="top">
      <i @click="$router.go(-1)">&lt;</i>
      <b @click="create">保存</b>
    </div>
    <ul class="list">
      <li v-for="(item, index) in items" :key="index"><span>{{item.name}}</span><span>{{item.company}}·{{item.past}}</span></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'details',
  data () {
    return {
      items: [],
      obj: {
        userId: '',
        id: '',
        name: '',
        phone: '',
        tel: '',
        address: '',
        class: '',
        company: '',
        past: '',
        occupation: '',
        email: '',
        internetAccount: '',
        remark: ''
      }
    }
  },
  created () {
    const that = this
    that.userId = that.getCookie().no
    this.$axios.post('/apis/details', {
      userId: that.userId
    }).then((res) => {
      console.log(res.data.data)
      if (res.status === 200) {
        that.items = res.data.data
      }
    }).catch((error) => {
      alert('操作失败')
      console.log(error)
    })
  },
  methods: {
    list () {
      this.$axios.post('/apis/details', {
        userId: this.userId
      }).then((res) => {
        // console.log(res)
        if (res.status === 200) {
          this.$router.push('/home')
        } else if (res.status === 201) {
          this.alert(res.body.msg)
        } else if (res.status === 202) {
          this.alert(res.body.msg)
        } else {
          this.alert(res.body.msg)
        }
      }).catch((error) => {
        alert('操作失败!')
        console.log('error:' + error)
      })
    },
    getCookie () {
      let cookieArr = document.cookie.split('; ')
      let obj = {}
      cookieArr.map((index) => {
        let ind = index.split('=')
        obj[ind[0]] = ind[1]
      })
      return obj
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.details{
  padding: 0 0.3rem;
  .top{
    overflow: hidden;
    padding: 0 0.3rem;
    margin: 0 auto 0.5rem;
    height: 1rem;
    line-height: 1rem;
    background-color: #00bcd3;
    i{
      float: left;
      font-family: '黑体';
      color: #fff;
    }
    b{
      float: right;
      color: #fff;
      font-weight: normal;
    }
  }
}
</style>
