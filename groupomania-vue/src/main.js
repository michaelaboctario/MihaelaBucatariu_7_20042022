import { createApp } from 'vue'
import App from './App.vue'
import store from '@/store';
import router from '@/router';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faCoffee, faTrash, faEnvelope} from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'

//import { faTwitter } from '@fortawesome/free-solid-svg-icons'

library.add(faUserSecret, faTwitter, faFacebook, faInstagram, faCoffee, faTrash, faEnvelope)
//library.add(faFacebook)
//library.add(faInstagram)

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon)    
app.use(store)
    .use(router)
    .mount('#app')

