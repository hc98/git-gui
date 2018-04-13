<style lang="scss" scoped>
  .demo{
    width: 200px;
    height: 200px;
    border: 1px solid #999;
    margin: 50px auto;
    text-align: center;
    p{
      margin-top: 20px;
      text-align: left;
    }
    button{
      width: 60px;
      height: 30px;
      margin-top: 10px;
      background-color: #999;
      color: #ffffff;
    }
  }
  .list-complete-item {
    transition: all 1s;
    display: inline-block;
    margin-right: 10px;
  }
  .list-complete-enter, .list-complete-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  .list-complete-leave-active {
    position: absolute;
  }
  // .list-complete-move {
  //   transition: transform 1s;
  // }
</style>

<template>
<div>
  <!-- ><script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js"></script>< -->
  <div class="demo" id="list-complete-demo">
    <button @click="shuffle">shuffle</button>
    <button @click="add">add</button>
    <button @click="remove">remove</button>
    <transition-group name="list-complete" tag="p">
      <span class="list-complete-item" v-for="(item, index) in items" :key="index">
        {{item}}
      </span>
    </transition-group>
  </div>
  <div class="demoAnimated">
    <input type="number" :number="number" step="20">
    <p>{{animatedNumber}}</p>
  </div>
</div>
</template>

<script>
  export default {
  name: 'shuffle',
  data () {
    return {
      items: [1,2,3,4,5,6,7,8,9],
      nextNum: 10,
      number: 0,
      animatedNumber: 0
    }
  },
  watch: {
    number: function(newVal, oldVal){
      const that = this;
      func
    }
  },
  methods:{
    randomIndex (){
      // 随机位置
      return Math.floor(Math.random()*this.items.length)
    },
    add (){
      // 随机添加
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove (){
      // 随机删除
      this.items.splice(this.randomIndex(), 1)
    },
    shuffle (){
      // 打乱数组
      // this.items = _.shuffle(this.items)
    }
  }
}
</script>