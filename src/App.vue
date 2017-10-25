<template>
  <div id="app">
<!--
    <router-link to="/">Home</router-link>
    <router-link to="/kodol">Teljesítmény kódolás</router-link>
    <router-link to="/teszt" >Teszt</router-link>
-->
    <router-view></router-view>
  </div>
</template>

<script>
import {store} from './store'
export default {
  name: 'app',
  data () {
    return {
      store: store
    }
  },

  created: function () {
//    console.log('params:', this.$route.params)
    console.log('route:', this.$route)
//    console.log('this:', this)
//    console.log('router.match:', router.match('/'))
  }
}
</script>

<style>
#app {
  margin: 1em;
}
</style>
