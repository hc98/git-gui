<style lang="scss" scoped>
  .wrapper{
    width: 100%;
    height: 100%;
    background-color: rgba(6, 6, 6, 0.6);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    .cont{
      box-sizing: border-box;
      width: 60%;
      height: 65%;
      border-radius: 6px;
      box-shadow: 6px 6px 66px #000;
      background-color: #ccc;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -30%;
      margin-top: -22%;
      opacity: 1;
      padding: 16px;
      i{
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 50%;
        background-color: #ccc;
        position: absolute;
        top: -10px;
        right: -10px;
        cursor: pointer;
      }
      .title{
        text-align: center;
        font-size: 26px;
        font-weight: bold;
        height: 44px;
        line-height: 44px;
        margin-bottom: 25px;
      }
      p{
        text-align: left;
        font-size: 18px;
        width: 60%;
        height: 30px;
        line-height: 30px;
        margin: 10px auto;
        span{
          display: inline-block;
          margin-left: 18%;
        }
        input, textarea{
          width: 50%;
          height: 30px;
          line-height: 30px;
          padding: 0 15px;
          font-size: 18px;
          font-family: '微软雅黑';
        }
        textarea{
          height: 60px;
          line-height: 1;
          padding: 5px 15px;
        }
        input[type='radio']{
          width: 18px;
          height: 18px;
          vertical-align: middle;
          margin-right: 5px;
          margin-left: 5%;
        }
      }
      button{
        display: block;
        width: 50%;
        height: 44px;
        margin: 0 auto;
        margin-top: 80px;
        font-size: 20px;
      }
    }
  }
</style>

<template>
  <div @click.self.stop="close" class="wrapper">
    <div class="cont">
      <i @click.self.stop="close">X</i>
      <p class="title">添加朋友</p>
      <p><span>姓名：</span><input type="text" id="name" v-model="data.name"></p>
      <p><span>昵称：</span><input type="text" id="nick" v-model="data.nick"></p>
      <p>
        <span>性别：</span>
        <input type="radio" name="sex" id="male" v-model="data.sex" value="m"><label for="male">男</label>
        <input type="radio" name="sex" id="female" v-model="data.sex" value="f"><label for="female">女</label>
      </p>
      <p><span>电话：</span><input type="tel" id="phone" v-model="data.phone"></p>
      <p><span>地址：</span><input type="text" id="address" v-model="data.address"></p>
      <p><span>生日：</span><input type="date" id="birth" v-model="data.birth"></p>
      <p><span>备注：</span><textarea id="remark" v-model="data.remark"></textarea></p>
      <button @click="submit">提交</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "win",
  data() {
    return {
      data: {
        name: '',
        nick: '',
        sex: 'm',
        phone: '',
        birth: '',
        address: '',
        remark: ''
      }
    };
  },
  methods: {
    close() {
      this.$root.bus.$emit('showWin', false)
    },
    submit() {
      const that = this;
      that.$axios({
        url: '/api/add',
        method: 'post',
        data: that.data
      }).then((res)=>{
        if (res.status == 200) {
          console.log(res)
          that.$root.bus.$emit('showWin', false)
        }
      })
    }
  }
};
</script>
