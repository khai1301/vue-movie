import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/main.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHouse, faPlay, faMagnifyingGlass, faClock, faStar } from '@fortawesome/free-solid-svg-icons'
library.add( faHouse, faPlay, faMagnifyingGlass, faClock, faStar )

createApp(App).use(router).component('FontAwesomeIcon', FontAwesomeIcon).mount('#app')
