<template>
  <div>
    Teszt

    <div class="columns">
      <div class="column">
        First column
      </div>
      <div class="column">
        Second column
      </div>
      <div class="column">
        Third column
      </div>
      <div class="column">
        Fourth column
      </div>
    </div>

  </div>
</template>

<script>

export default {
  data () {
    return {
      lirUsers: [],
      errors: []
    }
  }

  // Fetches lirUsers when the component is created.
//  created () {
//    HTTP.get(`legrand_lir_user`)
//    .then(response => {
//      // JSON responses are automatically parsed.
//      console.log('response:', response.data)
//      this.lirUsers = response.data
//    })
//    .catch(e => {
//      this.errors.push(e)
//    })
//  }

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
