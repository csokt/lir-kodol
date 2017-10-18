// /////////////////////////////////////////////////////////////////////////
//
//                              store
//
// /////////////////////////////////////////////////////////////////////////
var store = {
  user: null,
  dolgozo: null,
  gyartasi_lap_id: null,
  muveletszam: null,
  gyartasi_lap: null,
  gylap_szefo_muvelet: null,
  odooConnected: false,
  odooError: 'Kapcsolódás...'
}

// /////////////////////////////////////////////////////////////////////////
//
//                               odoo
//
// /////////////////////////////////////////////////////////////////////////
import odoo from './odoo-jsonrpc'

odoo.setHost('localhost:1337/localhost:8069')

odoo.login('raktar', 'hegedus.istvan', 'Godhak04').then(
  function (result) {
    store.odooConnected = true
    store.odooError = ''
    console.log('You are logged !')
    console.log('Your UID is : ' + result.uid)
  },
  function (error) {
    store.odooError = 'Nincs kapcsolat az adatbázissal!'
    console.error(error)
  }
)
export {store, odoo}

// /////////////////////////////////////////////////////////////////////////
//
//                              axios
//
// /////////////////////////////////////////////////////////////////////////
// import axios from 'axios'
//
// export const HTTP = axios.create({
//   baseURL: `http://raktar.szefo.local:3000/`,
//   headers: {
//   }
// })
