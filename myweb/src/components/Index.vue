<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.index {
  width: 100%;
  height: 100%;
  h1 {
    font-weight: normal;
    text-align: center;
  }
  table {
    border: 1px solid #000;
    border-bottom: 0;
    border-right: 0;
    border-spacing: 0;
    width: 80%;
    margin: 0 auto;
    text-align: center;
    th,
    td {
      border: 1px solid #000;
      border-top: 0;
      border-left: 0;
      height: 38px;
      padding: 0 10px;
    }
  }
  .top {
    $h: 44;
    height: $h+px;
    background-color: #000;
    color: #fff;
    overflow: hidden;
    padding: 0 50px;
    span {
      float: left;
      height: $h+px;
      line-height: $h+px;
      cursor: pointer;
    }
    i {
      float: right;
      font-style: normal;
      height: $h+px;
      line-height: $h+px;
      margin-left: 10px;
      cursor: pointer;
    }
    ul {
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
      li {
        height: 38px;
        line-height: 38px;
        cursor: pointer;
        &:hover {
          color: #00bbee;
        }
        .aTag {
          color: #000;
          display: block;
          width: 100%;
          height: 100%;
          border-bottom: 1px solid #888;
          &:hover {
            color: #00bbee;
          }
        }
      }
    }
  }
  .option {
    width: 240px;
    margin: 10px auto;
    font-size: 0;
    button {
      width: 70px;
      height: 38px;
      margin-right: 15px;
      background-color: #00bcd3;
      color: #fff;
      cursor: pointer;
      &:active {
        background-color: #0099cc;
      }
      &:last-child {
        margin-right: 0;
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
    <div class="option">
      <button @click="add">增加</button>
      <button @click="del">删除</button>
      <button @click="edit">修改</button>
    </div>
    <table>
      <tr>
        <th>选择</th>
        <th>ID</th>
        <th>姓名</th>
        <th>昵称</th>
        <th>性别</th>
        <th>手机</th>
        <th>地址</th>
        <th>备注</th>
      </tr>
      <tr v-for="(item, index) in data" :key="index">
        <td><input type="checkbox" name="delBoxItems" v-model="selectID" :value="item.id"></td>
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.nick}}</td>
        <td>{{item.sex=='m'?'男':'女'}}</td>
        <td>{{item.phone}}</td>
        <td>{{item.address}}</td>
        <td>{{item.remark}}</td>
      </tr>
    </table>
    <div class="box">
      <input type="file" @change="update">
    </div>
    <div class="file">
      <form action="/api/fileUp" method="post" enctype="multipart/form-data">
        <input type="file" name="upFiles" id="">
        <input type="submit" value="文件提交">
      </form>
    </div>
  <Win :showMessage="show" v-show="show" />
  </div>
</template>

<script>
import Win from "./win";
export default {
  name: "Index",
  components: {
    Win
  },
  data() {
    return {
      data: [],
      user: {},
      flag: false,
      show: false,
      selectID: []
    };
  },
  mounted() {
    //do something after mounting vue instance
    const that = this;
    const acc = window.sessionStorage.getItem("account");
    that.$axios({
      method: "POST",
      url: "/api/list",
      data: {
        phone: acc
      }
    }).then(res => {
      that.user = res.data.pop();
      that.data = res.data;
      window.sessionStorage.setItem("person", JSON.stringify(that.user));
    });
  },
  methods: {
    update(e) {
      let fs = e.target.files[0];
      console.log('--------------------');
      console.log(fs);
      console.log('--------------------');
      this.$axios({
        method: 'post',
        url: '/api/update',
        headers: {'name': fs.name},
        data: fs
      }).then(res=>{
        // console.log(res.data)
      })
    },
    logout() {
      const that = this;
      this.$axios({
        method: "POST",
        url: "/api/exit",
        data: {
          id: that.user.id
        }
      }).then(res => {
        if (res.status == 200) {
          window.sessionStorage.removeItem("account");
          that.$router.push("/login");
        }
      });
    },
    add() {
      const that = this;
      that.show = true;
      this.$root.bus.$on('showWin', (showMessage) => {
        that.show = showMessage
      })
    },
    del() {
      const that = this;
      this.$axios({
        method: "POST",
        url: "/api/del",
        data: {
          ids: that.selectID
        }
      }).then(res => {
        if (res.status == 200) {
          console.log('success!!!')
          const acc = window.sessionStorage.getItem("account");
          that.$axios({
            method: "POST",
            url: "/api/list",
            data: {
              phone: acc
            }
          }).then(res => {
            that.user = res.data.pop();
            that.data = res.data;
            window.sessionStorage.setItem("person", JSON.stringify(that.user));
          });
        }
      });
    },
    edit() {
      
    }
  }
};
</script>
