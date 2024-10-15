import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import router from './router'
import '../src/assets/css/GlobalView.css' 
import VueSweetalert2 from 'vue-sweetalert2';

const app = createApp(App);
const pinia = createPinia();

app.use(VueSweetalert2);
app.use(pinia);
app.use(router);
app.mount('#app');
