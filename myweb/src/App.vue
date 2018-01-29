<template>
  <div id="app">
    <transition :name="transition">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  watch: {
    '$route' (to, from) {
      const toNum = to.path.split('/').length
      const fromNum = from.path.split('/').length
      this.transition = (toNum < fromNum)?'slide-fade' : 'slide-fade'
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  user-select: none;
}
ul li{
  list-style: none;
}
a{
  text-decoration: none;
  color: #000;
}
button, input, textarea{
  outline: none;
  border: 0;
  border-radius: 3px;
  font-size: 15px;
}
textarea{
    vertical-align: top;
    resize: none;
}
img{
  border: 0;
  font-size: 0;
  border: 0;
}
i{
  font-style: normal;
}
#app {
  width: 100%;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 16px;
  color: #000;
  background: #fff;
}

/* 全局路由跳转动画 */
.slide-fade-enter-active {
  transition: all .9s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  opacity: 0;
}
</style>
