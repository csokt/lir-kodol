<template>
  <div>
    <h3>Teljesítmény kódolás</h3>
    Felhasználó: <input type="text" v-model="store.user" readonly/>
    <div v-if="store.user">
      Gyártási hely: <input type="text" v-model="hely" readonly/>
      <br>
      Dolgozó: <input type="text" v-model="dolgozo" readonly/>
      <br>
      Gyártási lap: <input type="number" v-model="gyartasi_lap_id"/>
      <br>
      Műveletkód: <input type="number" v-model="szefo_muvelet_id"/>
      <br>
      Művelet: <input type="text" v-model="szefo_muvelet" readonly/>
      <br>
      Összes db: <input type="number" v-model="osszes_db" readonly/>
      <br>
      Kész db: <input type="number" v-model="kesz_db" readonly/>
      <br>
      Mennyiség: <input type="number" v-model="mennyiseg"/>
    </div>
    <div v-else>
      <qrcode-reader @capture="login"></qrcode-reader>
    </div>
  </div>
</template>
<!--
    <qrcode-reader v-bind:mirror="false"></qrcode-reader>

    <input type="number" @keyup.enter="submit" v-model="input" placeholder="Kézi adatbevitel"/>

-->

<script>
import store from '../store'
import QrcodeReader from './QrcodeReader.vue'

export default {
  name: 'teszt',
  data () {
    return {
      store: store,
      hely: null,
      dolgozo: null,
      gyartasi_lap_id: null,
      szefo_muvelet_id: null,
      szefo_muvelet: null,
      osszes_db: null,
      kesz_db: null,
      mennyiseg: null
    }
  },
  components: {
    'qrcode-reader': QrcodeReader
  },
  methods: {
    login (value) {
      console.log('login:', value)
      this.store.user = value
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

