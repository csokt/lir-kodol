<template>
  <div class="container">
    <h3>Teljesítmény kódolás</h3>
    Felhasználó: <input type="text" v-model="store.user" readonly/>
    <div v-if="store.user">
      Gyártási hely: <input type="text" v-model="hely" readonly/>
      <br>
      Dolgozó: <input type="text" v-model="dolgozo"/>
      <button @click="dolgozo=''; scandolgozo='true'" type="button">scan</button>
      <br>
      <div class="modal" :class="{ 'is-active': scandolgozo }">
        <div class="modal-background"></div>
        <div class="modal-content">
          <qrcode-reader @capture="checkdolgozo" head="Dolgozó beolvasás" :message="qrmessage"></qrcode-reader>
        </div>
        <button class="modal-close is-large" aria-label="close"></button>
      </div>
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
      <br>
      <button @click="$router.go(-1)" type="button">Vissza</button>
    </div>
    <div v-else>
      <h1>Jelentkezzen be!</h1>
    </div>
  </div>
</template>
<!--
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
      mennyiseg: null,
      scandolgozo: false,
      qrmessage: ''
    }
  },
  components: {
    'qrcode-reader': QrcodeReader
  },
  methods: {
    checkdolgozo (value) {
      this.dolgozo = value
      this.scandolgozo = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

