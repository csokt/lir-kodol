import axios from 'axios'

export const HTTP = axios.create({
  baseURL: `http://raktar.szefo.local:3000/`,
  headers: {
  }
})
