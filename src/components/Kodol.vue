<template>
  <div class="container">
    <span class="is-size-4">Teljesítmény kódolás</span>
    <div v-if="store.user">

      <my-input label="Gyártási lap sorszám">
        <input v-on:blur="checkGyartasiLap" class="input" type="number" v-model="gyartasi_lap_id"/>
      </my-input>

      <my-input label="Műveletkód">
        <input v-on:blur="checkMuvelet" class="input" type="number" v-model="muveletszam"/>
      </my-input>

      <my-input label="Mennyiség">
        <input class="input" type="number" v-model="mennyiseg"/>
      </my-input>

      <my-input>
        <button @click="scanDolgozo=true" type="button" class="button">Dolgozó QR-kód</button>
        <button class="button is-primary"> Send message </button>
        <button @click="$router.go(-1)" type="button" class="button">Vissza</button>
      </my-input>

      <my-input label="Kódoló">
        <input class="input" type="text" v-model="store.user.name" readonly>
      </my-input>

      <my-input label="Gyártási hely">
        <input class="input" type="text" v-model="store.user.hely" readonly/>
      </my-input>

      <my-input v-if="store.dolgozo" label="Dolgozó">
        <input class="input" type="text" v-model="store.dolgozo.name" readonly/>
      </my-input>

      <my-input v-if="store.gyartasi_lap" label="Gyártási lap">
        <input class="input" type="text" v-model="store.gyartasi_lap.name" readonly/>
      </my-input>

      <my-input v-if="store.gylap_szefo_muvelet" label="Művelet">
        <input class="input" type="text" v-model="store.gylap_szefo_muvelet.name" readonly/>
      </my-input>

      <my-input v-if="store.gylap_szefo_muvelet" label="Összes db">
        <input class="input" type="number" v-model="store.gylap_szefo_muvelet.osszes_db" readonly/>
      </my-input>

      <my-input v-if="store.gylap_szefo_muvelet" label="Kész db">
        <input class="input" type="number" v-model="store.gylap_szefo_muvelet.kesz_db" readonly/>
      </my-input>

      <div v-if="scanDolgozo || !store.dolgozo" class="modal is-active">
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
import {HTTP} from '../http-common'
import Input from './Input.vue'
import QrcodeReader from './QrcodeReader.vue'

export default {
  name: 'teszt',
  data () {
    return {
      store: store,
      gyartasi_lap_id: null,
      muveletszam: null,
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
      HTTP.get(`nexon_szemely?limit=1&active&SzemelyId=eq.` + value)
      .then(response => {
        if (response.data.length) {
          this.store.dolgozo = response.data[0]
          this.scanDolgozo = false
        } else {
          this.messageDolgozo = 'Érvénytelen dolgozó kód!'
        }
      })
      .catch(e => {
        this.messageDolgozo = e
      })
    },

    checkGyartasiLap () {
      this.store.gyartasi_lap = null
      if (this.gyartasi_lap_id) {
        HTTP.get(`legrand_gyartasi_lap?limit=1&active&id=eq.` + this.gyartasi_lap_id)
        .then(response => {
          if (response.data.length) {
            console.log(response.data[0])
            this.store.gyartasi_lap = response.data[0]
          }
        })
        .catch(e => {
        })
      }
    },

    checkMuvelet () {
      this.store.gylap_szefo_muvelet = null
      if (this.muveletszam) {
        console.log(`legrand_gylap_szefo_muvelet?limit=1&active&gyartasi_lap_id=eq.` + store.gyartasi_lap.id + `&muveletszam=eq.` + this.muveletszam)
        HTTP.get(`legrand_gylap_szefo_muvelet?limit=1&active&gyartasi_lap_id=eq.` + store.gyartasi_lap.id + `&muveletszam=eq.` + this.muveletszam)
        .then(response => {
          if (response.data.length) {
            console.log(response.data[0])
            this.store.gylap_szefo_muvelet = response.data[0]
          }
        })
        .catch(e => {
          console.log(e)
        })
      }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

