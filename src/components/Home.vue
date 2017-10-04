<template>
  <div>
    <h2>Kezdőoldal</h2>
  </div>
</template>

<script>
import store from '../store'
export default {
  name: 'hello',
  data () {
    return {
      store: store,
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
