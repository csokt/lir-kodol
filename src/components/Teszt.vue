<template>
  <div class="teszt">
    <h1>{{ msg }}</h1>
    <div>{{ input }}</div>
    <video class="kamera" id="preview"></video>
  </div>
</template>
<!--
    <el-input placeholder="Please input" v-model="input"></el-input>
-->

<script>
import Instascan from 'instascan-ngfar'
// import Instascan from 'instascan'

export default {
  name: 'teszt',
  data () {
    return {
      msg: 'Teszt App',
      input: 'üres',
      stillActive: true,
      readData: '',
      cameras: [],
      activeCameraIndex: 1
    }
  },

  mounted () {
    let self = this
    self.scanner = new Instascan.Scanner({ video: document.getElementById('preview'), scanPeriod: 5 })

    self.scanner.addListener('scan', function (content) {
      self.input = content
      console.log(content)
    })

    Instascan.Camera.getCameras().then(function (cameras) {
      console.log(cameras)
      self.cameras = cameras
      self.cameraCount = cameras.length
      if (self.activeCameraIndex >= self.cameraCount) { self.activeCameraIndex = self.cameraCount - 1 }
      if (self.cameraCount > 0) {
        self.scanner.start(cameras[self.activeCameraIndex])
      } else {
        console.error('No cameras found.')
      }
    }).catch(function (e) {
      console.error(e)
    })

    console.log('mounted')
  },

  beforeDestroy: function () {
    this.scanner.stop()
    console.log('beforeDestroy')
  },

  methods: {
    handleChange (value) {
      console.log(value)
    },

    onCapture (payload) {
      console.log(payload.result)
      this.input = payload.result
      this.readData = payload.result
//      this.stillActive = false
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

</style>
