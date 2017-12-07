<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.index{
  width: 100%;
  height: 100%;
  h1{
    font-weight: normal;
    text-align: center;
  }
  table{
    border: 1px solid #000;
    border-bottom: 0;
    border-right: 0;
    border-spacing: 0;
    width: 80%;
    margin: 0 auto;
    text-align: center;
    th, td{
      border: 1px solid #000;
      border-top: 0;
      border-left: 0;
      height: 38px;
      padding: 0 10px;
    }
  }
  .top{
    $h: 44;
    height: $h+px;
    background-color: #000;
    color: #fff;
    overflow: hidden;
    padding: 0 50px;
    margin-bottom: 10px;
    span{
      float: left;
      height: $h+px;
      line-height: $h+px;
      user-select: none;
      cursor: pointer;
    }
    i{
      float: right;
      font-style: normal;
      height: $h+px;
      line-height: $h+px;
      margin-left: 10px;
      cursor: pointer;
      user-select: none;
    }
    ul{
      user-select: none;
      position: absolute;
      top: 50px;
      right: 50px;
      width: 100px;
      text-align: center;
      border: 1px solid #555;
      border-radius: 6px;
      box-shadow: 0 0 10px #000;
      color: #000;
      background-color: #fff;
      padding: 5px;
      li{
        height: 38px;
        line-height: 38px;
        cursor: pointer;
        &:hover{
          color: #00bbee;
        }
        .aTag{
          color: #000;
          display: block;
          width: 100%;
          height: 100%;
          border-bottom: 1px solid #888;
          &:hover{
            color: #00bbee;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="index">
    <div class="top">
      <span>通讯录</span>
      <i @click='flag=!flag'>{{user.nick}}</i>
      <i @click='flag=!flag'>{{user.name}}</i>
      <ul v-show="flag">
        <li><router-link class="aTag" to="person">个人中心</router-link></li>
        <li @click='logout'>退出</li>
      </ul>
    </div>
    <table>
      <tr>
        <th>ID</th>
        <th>姓名</th>
        <th>昵称</th>
        <th>性别</th>
        <th>手机</th>
        <th>地址</th>
        <th>备注</th>
      </tr>
      <tr v-for="(item, index) in data" :key="index">
        <td>{{index+1}}</td>
        <td>{{item.name}}</td>
        <td>{{item.nick}}</td>
        <td>{{item.sex=='m'?'男':'女'}}</td>
        <td>{{item.phone}}</td>
        <td>{{item.address}}</td>
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
      data: [],
      user: {},
      flag: false
    }
  },
  mounted() {
    //do something after mounting vue instance
    const acc = window.sessionStorage.getItem('account');
    this.$axios({
      method:"POST",
      url:'/api/list',
      data:{
        phone: acc
      }
    }).then((res)=>{
      console.log(res.data);
      this.user = res.data.pop();
      this.data = res.data;
      window.sessionStorage.setItem('person', JSON.stringify(this.user))
    });
  },
  methods: {
    logout() {
      const that = this;
      this.$axios({
        method:"POST",
        url:'/api/exit',
        data:{
          id: that.user.id
        }
      }).then((res)=>{
        if (res.status==200) {
          window.sessionStorage.removeItem('account');
          that.$router.push('/login');
        }
      });
    }
  }
}
</script>
