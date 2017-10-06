import Vue from 'vue'
import Router from 'vue-router'

import 'bulma/css/bulma.css'

import Home from '@/components/Home'
import Hello from '@/components/Hello'
import Kodol from '@/components/Kodol'
import Teszt from '@/components/Teszt'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/kodol',
      name: 'Kodol',
      component: Kodol
    },
    {
      path: '/teszt',
      name: 'Teszt',
      component: Teszt
    }
  ]
})
