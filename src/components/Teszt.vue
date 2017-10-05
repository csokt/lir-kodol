<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import store from '../store'

export default {
  name: 'teszt',
  data () {
    return {
      store: store,
      msg: 'Teszt'
    }
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
