<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view/>
  </div>
</template>

<script>
import NavBar from '@/components/layouts/NavBar'
export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style>
body {
  background: #ddd;
}
</style>
