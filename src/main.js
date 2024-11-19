import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import router from './router'
import '../src/assets/css/GlobalView.css' 
import VueSweetalert2 from 'vue-sweetalert2';
import '@fortawesome/fontawesome-free/css/all.css'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App);
const pinia = createPinia();

app.use(Toast)
app.use(VueSweetalert2);
app.use(pinia);
app.use(router);
app.mount('#app');
