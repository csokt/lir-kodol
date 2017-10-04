import Vue from 'vue'
import Router from 'vue-router'

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'

import Home from '@/components/Home'
import Hello from '@/components/Hello'
import Kodol from '@/components/Kodol'
import Teszt from '@/components/Teszt'

Vue.use(Router)
// Vue.use(ElementUI)

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
