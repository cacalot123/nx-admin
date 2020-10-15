import Vue from 'vue'
import ElementUI from 'element-ui'
// import Navigation from 'vue-navigation';

// import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
// import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

// import '../static/css/iconfont/1.0.0/index.css' /* icofont*/

// css
import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import '@/styles/index.scss' // global css

// font-awesome
import '@/assets/library/font-awesome-4.7.0/css/font-awesome.min.css'
import 'element-ui/lib/theme-chalk/index.css'

// import './styles/element-variables.scss'

import App from './App'

import router from './router'

import store from './store'

// Internationalization
// import i18n from './lang'

// import {
//   loadStyle
// } from './utils/util'
// import {
//   iconfontUrl,
//   iconfontVersion
// } from '@/config/env'

import '@/icons' // icon

import '@/permission' // permission control

import * as filters from './filters' // global filters
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// Vue.use(ElementUI, { locale })
// // iconfontVersion.forEach(ele => {
// //   loadStyle(iconfontUrl.replace('$key', ele))
// // })
// Vue.use(ElementUI, {
//   size: 'medium', // set element-ui default size
//   i18n: (key, value) => i18n.t(key, value)
// })
Vue.config.productionTip = false
// Vue.use(Navigation, {router})
Vue.use(ElementUI);

new Vue({
  el: '#app',
  router,
  store,
  // i18n,
  // template: '<App/>',
  // components: { App }
  render: h => h(App)
})
