<template>
  <div class="home">
    <div class="search">
      <input autofocus type="text" name="" id="">
    </div>
    <ul class="list" @click="details">
      <li v-for="(item, index) in items" :key='index' :data-index="index">
        <span>{{item.name}}</span>
        <span>{{item.company}}·{{item.past}}</span>
      </li>
    </ul>
    <div class="edit">
      <router-link to="/create">
        <i>+</i>
      </router-link>
    </div>
    <ul class="sidebar">
      <li v-for="item in codeArr" :key="item">
        <a :href="'#'+item">{{item}}</a>
      </li>
    </ul>
    <div>{{count}}</div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'home',
  data () {
    return {
      items: [],
      codeArr: ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
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
      console.log(res.data.data)
      if (res.status === 200) {
        that.items = res.data.data
      }
    }).catch((error) => {
      alert('操作失败')
      console.log(error)
    })
  },
  // computed: {
  //   count () {
  //     return this.$store.state.count
  //   }
  // },
  computed: mapState(['count']),
  methods: {
    details ($event) {
      console.log($event.target.dataset.index)
      this.$store.state.count++
    },
    list () {
      this.$axios.post('/apis/home', {
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
.home{
  position: relative;
  padding: 0 0.3rem;
  .search{
    position: fixed;
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
  .list{
    li{
      height: .8rem;
      line-height: .8rem;
      background-color: #eee;
      margin: 0.1rem auto;
      padding-left: 0.3rem;
      overflow: hidden;
      span:nth-of-type(2){
        float: right;
        color: mediumvioletred;
        font-size: 12px;
        margin-right: 0.3rem;
      }
    }
  }
  .sidebar{
    text-align: center;
    font-size: 12px;
    position: fixed;
    right: 0.08rem;
    top: 50%;
    transform: translateY(-50%);
    li{
      margin: 0.05rem auto;
      &:hover{
        color: rgb(42, 187, 114);
      }
    }
  }
}
</style>
