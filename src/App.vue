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
  }
}
</script>

<style>
#app {
  margin: 1em;
}
</style>
