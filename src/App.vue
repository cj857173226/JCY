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

<style>
  html,body{
    height: 100%;
    font-size: 14px;
  }
  body{
    min-width: 648px;
  }
  #app{
    height: 100%;
  }
*{
	margin: 0;
  box-sizing: border-box;
}
ul li,
dl dd,
dl dd dt{
  list-style: none;
}
a,
a:focus,
a:link,
a:active,
a:hover{
	color: inherit;
	text-decoration: none;
}
.el-menu-item-group{
  overflow: hidden;
}
.el-menu-item-group__title{
  display: none;
}

</style>
