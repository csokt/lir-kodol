<template>
  <div>
    <h1>Legrand Információs Rendszer</h1>
    <div v-if="store.user">
      Üdvözölöm {{ store.user }}
      <br>
      <button @click="store.user=''" type="button">Kijelentkezés</button>
      <br>
      <button @click="$router.push('kodol')" type="button">Kódolás</button>
    </div>
    <div v-else>
      <qrcode-reader @capture="login" head="Bejelentkezés" :message="qrmessage"></qrcode-reader>
    </div>
  </div>
</template>

<script>
import store from '../store'
import QrcodeReader from './QrcodeReader.vue'

export default {
  name: 'hello',
  data () {
    return {
      store: store,
      qrmessage: ''
    }
  },
  components: {
    'qrcode-reader': QrcodeReader
  },
  methods: {
    login (value) {
      this.store.user = value
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
