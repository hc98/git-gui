<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
*{
  margin: 0;
  padding: 0
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
#app {
  width: 100%;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 16px;
  color: #000;
  background: #fff;
}
</style>
