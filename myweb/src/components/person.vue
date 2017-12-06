<style lang="scss" scoped>
#person{
  width: calc(30% - 40px);
  padding: 20px;
  margin: 0 auto;
  margin-top: 20px;
  box-shadow: 0 0 10px #000;
  h1{
    text-align: center;
    margin-bottom: 20px;
  }
  p{
    margin: 10px 0;
    span{
      display: inline-block;
      width: 100px;
      text-align: right;
    }
    input{
      box-shadow: 0 0 2px #000;
      width: 50%;
      height: 24px;
      padding: 2px 10px;
    }
    #m, #f{
      width: auto;
      height: auto;
      box-shadow: 0 0 0;
      cursor: pointer;
    }
    label{
      cursor: pointer;
      margin-right: 30px;
    }
    textarea{
      box-shadow: 0 0 2px #000;
      width: 50%;
      height: 80px;
      border: 0;
      padding: 5px 10px;
    }
    button{
      display: block;
      width: 50%;
      height: 38px;
      margin: 20px auto;
      margin-top: 30px;
      background-color: #00bbee;
      color: #fff;
      user-select: none;
      cursor: pointer;
      &:active{
        background-color: #0099cc
      }
    }
  }
}
</style>

<template>
  <div id="person">
    <h1>个人中心</h1>
    <p><span>姓名：</span><input type="text" v-model="obj.name"></p>
    <p><span>昵称：</span><input type="text" v-model="obj.nick"></p>
    <p>
      <span>性别：</span>
      <input type="radio" name="radio" v-model="obj.sex" value="m" id="m">
      <label for="m">男</label>
      <input type="radio" name="radio" v-model="obj.sex" value="f" id="f">
      <label for="f">女</label>
    </p>
    <p><span>电话：</span><input type="number" v-model="obj.phone"></p>
    <p><span>生日：</span><input type="date" v-model="obj.birth"></p>
    <p><span>地址：</span><input type="text" v-model="obj.address"></p>
    <p><span>备注：</span><textarea v-model="obj.remark"></textarea> </p>
    <p><button @click='submit'>提交修改</button></p>
  </div>
</template>

<script>
  export default {
    name: "person",
    data () {
      return {
        obj: {}
      }
    },
    created() {
      this.obj = JSON.parse(window.sessionStorage.getItem('person'));
      console.log(this.obj);
    },
    methods: {
      submit () {
        const that = this;
        this.$axios({
          method:"POST",
          url:'/api/update',
          data:{
            person: that.obj
          }
        }).then((res)=>{
          if (res.status==200) {
            console.log('ok');
            that.$router.push('/index')
          }
        });
      }
    }
  }
</script>
