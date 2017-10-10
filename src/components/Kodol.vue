<template>
  <div class="box is-size-4">
    <div class="is-size-2">Teljesítmény kódolás</div>
    <br>
    <div v-if="store.user">

      <div class="columns is-variable is-8">
        <div class="column is-one-quarter">

          <my-input label="Gyártási lap">
            <input v-on:change="checkGyartasiLap" class="input is-large" type="number" v-model="store.gyartasi_lap_id"/>
          </my-input>

          <my-input label="Műveletkód">
            <input v-on:change="checkMuvelet" class="input is-large" type="number" v-model="store.muveletszam"/>
          </my-input>

          <my-input label="Mennyiség">
            <input class="input is-large" type="number" v-model="mennyiseg"/>
          </my-input>

          <button v-if="store.gyartasi_lap && store.gylap_szefo_muvelet && mennyiseg" class="button is-info is-large">Mentés</button>

        </div>

        <div class="column">
          <br>
          <table class="table is-bordered">
            <tbody>
              <tr>
                <th>Kódoló</th>
                <td>{{store.user.name}}</td>
              </tr>

              <tr>
                <th>Gyártási hely</th>
                <td>{{store.user.hely}}</td>
              </tr>

              <tr v-if="store.dolgozo">
                <th>Dolgozó</th>
                <td>{{store.dolgozo.name}}</td>
              </tr>

              <tr v-if="store.gyartasi_lap">
                <th>Gyártási lap</th>
                <td>{{store.gyartasi_lap.name}}</td>
              </tr>

              <tr v-if="store.gylap_szefo_muvelet">
                <th>Művelet</th>
                <td>{{store.gylap_szefo_muvelet.name}}</td>
              </tr>

              <tr v-if="store.gylap_szefo_muvelet">
                <th>Összes db</th>
                <td>{{store.gylap_szefo_muvelet.osszes_db}}</td>
              </tr>

              <tr v-if="store.gylap_szefo_muvelet">
                <th>Kész db</th>
                <td>{{store.gylap_szefo_muvelet.kesz_db}}</td>
              </tr>

            </tbody>
          </table>
          <button @click="scanDolgozo=true" type="button" class="button is-danger is-large">Új dolgozó</button>
          <button @click="$router.go(-1)" type="button" class="button is-dark is-large">Vissza</button>
        </div>
      </div>

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
      this.store.muveletszam = null
      this.store.gylap_szefo_muvelet = null
      this.mennyiseg = null
      if (this.store.gyartasi_lap_id) {
        HTTP.get(`legrand_gyartasi_lap?limit=1&active&id=eq.` + this.store.gyartasi_lap_id)
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
      this.mennyiseg = null
      if (this.store.muveletszam) {
        console.log(`legrand_gylap_szefo_muvelet?limit=1&active&gyartasi_lap_id=eq.` + store.gyartasi_lap.id + `&muveletszam=eq.` + this.store.muveletszam)
        HTTP.get(`legrand_gylap_szefo_muvelet?limit=1&active&gyartasi_lap_id=eq.` + store.gyartasi_lap.id + `&muveletszam=eq.` + this.store.muveletszam)
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
.button {
  margin: 0.5em;
}
.scan-qr-style {
  background-color: red;
  color: white;
  font-weight: bold;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 2px;
  padding-bottom: 2px;
}
</style>

