import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import router from './router'
// import VueMeta from 'vue-meta'

loadFonts()

createApp(App)
  .use(vuetify)
  .use(router)
  // .use(VueMeta)
  .mount('#app')
