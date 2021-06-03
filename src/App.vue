<template>
<div>
  <router-view></router-view>
</div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    const str = localStorage.getItem('user')
    const data = JSON.parse(str)
  }
}
</script>

<style lang="less">
.clearfix {
  &::after {
    content: "";
    display: block;
    clear: both;
  }
}
</style>