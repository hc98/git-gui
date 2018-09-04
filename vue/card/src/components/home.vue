<template>
  <div class="home">
    <div class="search"><input autofocus type="text" name="" id=""></div>
    <ul class="list">
      <li v-for="(item, index) in items" :key="index">{{item.name}}</li>
    </ul>
    <div class="edit">
      <router-link to="/create"><i>+</i></router-link>
      <!-- <b>-</b>
      <b>*</b> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
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
    this.$axios.post('/apis/home', {
      userId: that.userId
    }).then((res) => {
      console.log(res)
      if (res.status === 200) {
        that.items = res
      } else if (res.status === 201) {
        // this.alert(res.body.msg)
      } else if (res.status === 202) {
        // this.alert(res.body.msg)
      } else {
        // this.alert(res.body.msg)
      }
    }).catch((error) => {
      // this.alert('操作失败')
      console.log(error)
    })
    console.log(that.userId)
  },
  methods: {
    list () {
      this.$axios.post('/apis/home', {
        userId: this.userId
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
      }).catch((error) => {
        this.alert('操作失败')
        console.log(error)
      })
    },
    create () {
      this.$axios.post('/apis/create', {
        userId: this.userId
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
      }).catch((error) => {
        this.alert('操作失败')
        console.log(error)
      })
    },
    getCookie () {
      let cookieArr = document.cookie.split('; ')
      let obj = {}
      cookieArr.map((index) => {
        let ind = index.split('=')
        obj[ind[0]] = ind[1]
      })
      console.log(obj)
      return obj
    }
  }
}
</script>
