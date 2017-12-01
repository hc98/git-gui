<template>
  <div class="index">
    <h1 @click='getServer'>{{ msg }}</h1>
    <table>
      <tr>
        <th>ID</th>
        <th>姓名</th>
        <th>昵称</th>
        <th>手机</th>
        <th>地址</th>
        <th>权限</th>
        <th>备注</th>
      </tr>
      <tr v-for="item in data" :key="item.id">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.nick}}</td>
        <td>{{item.phone}}</td>
        <td>{{item.address}}</td>
        <td>{{item.admin==1?'管理员':'用户'}}</td>
        <td>{{item.remark}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      msg: 'Welcome to 通讯录',
      data: []
    }
  },
  mounted() {
    //do something after mounting vue instance
    this.$axios({
      method:"POST",
      url:'/api/list',
      data:{
        phone: '176****9839',
        password: '477150'
      }
    }).then((res)=>{
      this.data = res.data;
    });
  },
  methods: {
    getServer() {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
table{
  border: 1px solid #000;
  border-bottom: 0;
  border-right: 0;
  border-spacing: 0;
  width: 80%;
  margin: 0 auto;
  text-align: center;
}
th, td{
  border: 1px solid #000;
  border-top: 0;
  border-left: 0;
  height: 38px;
  padding: 0 10px;
}
</style>
