<template>
  <div>
    Axios
    <br>
    <ul v-if="errors && errors.length">
      <li v-for="error of errors">
        {{error.message}}
      </li>
    </ul>
  </div>
</template>

<script>
import {HTTP} from '../http-common'

export default {
  data () {
    return {
      lirUsers: [],
      errors: []
    }
  },

  // Fetches lirUsers when the component is created.
  created () {
    HTTP.get(`legrand_lir_user`)
    .then(response => {
      // JSON responses are automatically parsed.
      console.log('response:', response.data)
      this.lirUsers = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  }

  //  async / await version (created() becomes async created())
//  async created () {
//    try {
//      const response = await axios.get(`http://raktar.szefo.local:3000/legrand_lir_user`)
//      // JSON responses are automatically parsed.
//      console.log('response:', response.data)
//      this.lirUsers = response.data
//    } catch (e) {
//      this.errors.push(e)
//    }
//  }

//  created () {
//    axios.post(`http://raktar.szefo.local:3000/legrand_impex`, {
//      sorszam: 12345
//    })
//    .then(response => {
//      // JSON responses are automatically parsed.
//      console.log('response:', response)
//    })
//    .catch(e => {
//      this.errors.push(e)
//    })
//  }

}
</script>
