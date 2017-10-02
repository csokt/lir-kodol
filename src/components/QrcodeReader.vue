
<script>
import QRCode from 'qrcode-reader'

export default {
  props: {
    active: {
      type: Boolean,
      default: true,
    },

    scanInterval: {
      type: Number,
      default: 100, // milliseconds
    },

    constraints: {
      type: Object,
      default: () => ({
        video: { facingMode: 'environment' }, // back camera
        audio: false,
      }),
    },

  },

  data () {
    return {
      reader: new QRCode(),
      isDestroyed: false,
    }
  },

  watch: {
    active (newValue) {
      if (newValue === false) {
        this.$refs.video.pause()
      } else {
        this.$refs.video.play()
        this.loopScan()
      }
    },
  },

  methods: {
    startCamera: async function () {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(this.constraints)
        const video = this.$refs.video

        video.srcObject = stream

        this.loopScan()
      } catch (e) {
        if (e.name === 'PermissionDeniedError' || e.name === 'NotAllowedError') {
          this.$emit('permission-deny')
        } else {
          this.$emit('error', e)
        }
      }
    },

    stopCamera () {
      if (this.$refs.video.srcObject !== null) {
        this.$refs.video.srcObject.getTracks().forEach(
          track => track.stop()
        )
      }
    },

    scan () {
      const video = this.$refs.video
      const canvas = this.$refs.canvas

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      const ctx = canvas.getContext('2d')
      const bounds = [0, 0, canvas.width, canvas.height]

      ctx.clearRect(...bounds)
      ctx.drawImage(video, ...bounds)

      return ctx.getImageData(...bounds)
    },

    loopScan () {
      if (this.active && !this.isDestroyed) {
        try {
          this.reader.decode(this.scan())
        } catch (e) {
          // video probably not initilized yet: trying again
        }

        window.setTimeout(this.loopScan, this.scanInterval)
      }
    },
  },

  mounted () {
    const canvas = this.$refs.canvas

    if (canvas.getContext === undefined || canvas.getContext('2d') === undefined) {
      this.$emit('no-support', 'HTML5 Canvas not supported in this browser.')
    } else if (navigator.mediaDevices.getUserMedia === undefined) {
      this.$emit('no-support', 'WebRTC API not supported in this browser')
    } else {
      this.reader.callback = (_error, payload) => {
        if (payload !== undefined && payload.result !== undefined) {
          this.$emit('capture', payload)
        }
      }

      this.startCamera()
    }
  },

  beforeDestroy () {
    this.stopCamera()
    this.isDestroyed = true
  },
}
</script>

