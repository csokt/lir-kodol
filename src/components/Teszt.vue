<template>
  <div class="qrcode-reader">
    <div>
      <button v-on:click="activeCamera += 1" type="button">Váltás az előlapi és hátlapi kamera között</button>
    </div>
    <video class="camera" ref="preview"></video>
    <div>
      <input type="number" v-model="input" placeholder="Kézi adatbevitel"/>
    </div>
  </div>

</template>
<!--
    <el-input placeholder="Please input" v-model="input"></el-input>
-->

<script>
import Instascan from 'instascan-ngfar'
// import Instascan from 'instascan'

export default {
  props: {
    active: {
      type: Boolean,
      default: true
    },

    // Whether to horizontally mirror the video preview.
    mirror: {
      type: Boolean,
      default: true
    },

    // Whether to actively scan when the tab is not active.
    backgroundScan: {
      type: Boolean,
      default: true
    },

    // The period, in milliseconds, before the same QR code will be recognized in succession.
    refractoryPeriod: {
      type: Number,
      default: 5000
    },

    // Only applies to continuous mode. The period, in rendered frames, between scans.
    scanPeriod: {
      type: Number,
      default: 10
    },

    // Default camera index, begins with 0.
    defaultCamera: {
      type: Number,
      default: 0
    }

  },

  data () {
    return {
      input: '',
      stillActive: true,
      readData: '',
      cameras: [],
      activeCamera: 0
    }
  },

  watch: {
    activeCamera (newValue) {
      console.log('activeCamera:', newValue)
    }
  },

  mounted () {
    let self = this
    let opts = { video: self.$refs.preview, mirror: self.mirror, backgroundScan: self.backgroundScan, refractoryPeriod: self.refractoryPeriod, scanPeriod: self.scanPeriod }
    self.scanner = new Instascan.Scanner(opts)

    self.scanner.addListener('scan', function (content) {
      self.input = content
      console.log(content)
    })

    Instascan.Camera.getCameras().then(function (cameras) {
      console.log(cameras)
      self.cameras = cameras
      self.cameraCount = cameras.length
      if (self.activeCamera >= self.cameraCount) { self.activeCamera = self.cameraCount - 1 }
      if (self.cameraCount > 0) {
        self.scanner.start(cameras[self.activeCamera])
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
