<template>
  <div id="app">
    <router-link to="/">Kezdőoldal</router-link>
    <router-link to="/hello">Hello</router-link>
    <router-link to="/kodol">Teljesítmény kódolás</router-link>
    <router-link to="/teszt" v-if="store.user">Go to Teszt</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import store from './store'
export default {
  name: 'app',
  data () {
    return {
      store: store,
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
</style>
