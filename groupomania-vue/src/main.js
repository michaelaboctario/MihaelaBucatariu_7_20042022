import { createApp } from 'vue'
import App from './App.vue'
import store from '@/store';
import router from '@/router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faEnvelope, faBars} from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'

library.add(faBars, faTwitter, faFacebook, faInstagram, faTrash, faEnvelope)

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon)    
app.use(store)
    .use(router)
    .mount('#app')

