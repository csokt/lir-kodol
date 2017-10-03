<template>
  <div>
    <h1>{{ msg }}</h1>
    <qrcode-reader></qrcode-reader>
  </div>
</template>

<script>
import QrcodeReader from './QrcodeReader.vue'

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Teszt'
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
