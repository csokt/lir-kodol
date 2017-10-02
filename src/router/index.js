import Vue from 'vue'
import Router from 'vue-router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import Hello from '@/components/Hello'
import Teszt from '@/components/Teszt'

Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/teszt',
      name: 'Teszt',
      component: Teszt
    }
  ]
})
