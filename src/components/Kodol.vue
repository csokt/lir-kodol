<template>
  <div class="container">
    <span class="is-size-4">Teljesítmény kódolás</span>
    <div v-if="store.user">

      <my-input label="Kódoló">
        <input class="input" type="text" v-model="store.user" readonly>
      </my-input>

      <my-input label="Gyártási hely">
        <input class="input" type="text" v-model="hely" readonly/>
      </my-input>

      <my-input label="Dolgozó">
        <input class="input" type="text" v-model="dolgozo"/>
      </my-input>

      <my-input label="Gyártási lap">
        <input class="input" type="number" v-model="gyartasi_lap_id"/>
      </my-input>

      <my-input label="Műveletkód">
        <input class="input" type="number" v-model="szefo_muvelet_id"/>
      </my-input>

      <my-input label="Művelet">
        <input class="input" type="text" v-model="szefo_muvelet" readonly/>
      </my-input>

      <my-input label="Összes db">
        <input class="input" type="number" v-model="osszes_db" readonly/>
      </my-input>

      <my-input label="Kész db">
        <input class="input" type="number" v-model="kesz_db" readonly/>
      </my-input>

      <my-input label="Mennyiség">
        <input class="input" type="number" v-model="mennyiseg"/>
      </my-input>

      <my-input>
        <button @click="scanDolgozo=true" type="button" class="button">Dolgozó QR-kód</button>
        <button class="button is-primary"> Send message </button>
        <button @click="$router.go(-1)" type="button" class="button">Vissza</button>
      </my-input>


      <div v-if="scanDolgozo" class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content">
          <qrcode-reader @capture="checkDolgozo" head="Dolgozó beolvasás" :message="messageDolgozo"></qrcode-reader>
        </div>
        <button @click="scanDolgozo=false" class="modal-close is-large" aria-label="close"></button>
      </div>
    </div>
    <div v-else>
      <button @click="$router.push('/')" type="button">Jelentkezzen be!</button>
    </div>
  </div>
</template>
<!--
      <h1 @click="$router.push('/')">Jelentkezzen be!</h1>

    <input type="number" @keyup.enter="submit" v-model="input" placeholder="Kézi adatbevitel"/>

-->

<script>
import store from '../store'
import Input from './Input.vue'
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
      scanDolgozo: false,
      messageDolgozo: ''
    }
  },
  components: {
    'my-input': Input,
    'qrcode-reader': QrcodeReader
  },
  methods: {
    checkDolgozo (value) {
      this.dolgozo = value
      this.scanDolgozo = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

