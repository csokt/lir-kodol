<template>
  <div>
    <span class="title">Legrand Információs Rendszer</span>
    <div v-if="store.user">
      <span class="is-size-4 has-text-danger"> Üdvözlöm {{ store.user.name }} </span>
      <br>
      <button @click="store.user=null" type="button" class="button is-danger is-large">Kijelentkezés</button>
      <br>
      <button @click="$router.push('kodol')" type="button" class="button is-info is-large">Kódolás</button>
    </div>
    <div v-else>
      <button @click="scanUser=true" type="button" class="button is-danger is-large">Jelentkezzen be kódkártyájával!</button>

      <div v-if="scanUser" class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content">
          <qrcode-reader @capture="checkUser" head="Bejelentkezés" :message="messageUser"></qrcode-reader>
        </div>
        <button @click="scanUser=false" class="modal-close is-large" aria-label="close"></button>
      </div>

    </div>
  </div>
</template>

<script>
import store from '../store'
import {HTTP} from '../http-common'
import QrcodeReader from './QrcodeReader.vue'

export default {
  name: 'hello',
  data () {
    return {
      store: store,
      scanUser: false,
      messageUser: ''
    }
  },
  components: {
    'qrcode-reader': QrcodeReader
  },
  methods: {
    checkUser (value) {
      HTTP.get(`legrand_lir_user?limit=1&qr=eq.` + value)
      .then(response => {
        if (response.data.length) {
          this.store.user = response.data[0]
          this.scanUser = false
        } else {
          this.messageUser = 'Érvénytelen felhasználó kód!'
        }
      })
      .catch(e => {
        this.messageUser = e
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
