<template>
  <div class="create">
    <div class="top">
      <i @click="$router.go(-1)">&lt;</i>
      <b @click="create">保存</b>
    </div>
    <p><span>姓名：</span><input type="text" v-model="obj.name"></p>
    <p><span>性别：</span><input type="radio" v-model="obj.sex" value="m" id="man"><label for="man">男</label><input type="radio" v-model="obj.sex" value="f" id="feman"><label for="feman">女</label></p>
    <p><span>私人手机：</span><input type="text" v-model="obj.phone"></p>
    <p><span>公共电话：</span><input type="text" v-model="obj.tel"></p>
    <p><span>邮箱：</span><input type="email" v-model="obj.email"></p>
    <p><span>网络账号：</span><textarea v-model="obj.internetAccount"></textarea></p>
    <p><span>行业：</span><input type="text" v-model="obj.occupation"></p>
    <p><span>职位：</span><input type="text" v-model="obj.past"></p>
    <p><span>公司：</span><input type="text" v-model="obj.company"></p>
    <p><span>地址：</span><input type="text" v-model="obj.address"></p>
    <p><span>备注：</span><textarea v-model="obj.remark"></textarea></p>
  </div>
</template>

<script>
export default {
  name: 'create',
  data () {
    return {
      items: [],
      obj: {
        userId: '',
        id: '',
        name: '',
        sex: '',
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
  methods: {
    create () {
      const that = this
      that.obj.userId = that.getCookie().no
      console.log(that.obj)
      that.$axios.post('/apis/create', {
        params: that.obj
      }).then((res) => {
        console.log(res)
        if (res.status === 200) {
          that.$router.push('/home')
        } else if (res.status === 201) {
          that.alert(res.body.msg)
        } else if (res.status === 202) {
          that.alert(res.body.msg)
        } else {
          that.alert(res.body.msg)
        }
      }).catch((error) => {
        that.alert('操作失败')
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
      return obj
    }
  }
}
</script>
