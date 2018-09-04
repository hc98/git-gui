<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang=''>
* {
  margin: 0;
  padding: 0;
}
a:hover, a:link, a:active, a:visited {
  text-decoration: none;
  color: #000000;
}
i{
  font-style: normal;
}
input, button, textarea{
  outline: none;
  border: 0;
  background-color: #fff;
}
ul li{
  list-style: none;
}
body {
  background-color: #fff;
  width: 100%;
  font-size: 16px;
  color: #000000;
}

</style>
