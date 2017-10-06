<template>
  <div>
    <span class="title">Teszt</span>
    <qrcode-reader head="Teszt beolvasás" message="Teszt üzenet"></qrcode-reader>
  </div>
</template>

<script>
import store from '../store'
import QrcodeReader from './QrcodeReader.vue'

export default {
  name: 'teszt',
  data () {
    return {
      store: store
    }
  },
  components: {
    'qrcode-reader': QrcodeReader
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
