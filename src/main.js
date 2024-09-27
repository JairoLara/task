import { createApp } from 'vue';
import App from './App.vue';
import './style.css'

import { createPinia } from 'pinia'; // Importar Pinia
import router from './router'; // importar router

const app = createApp(App);

const pinia = createPinia(); // Crear instancia de Pinia
app.use(pinia); // usar pina
app.use(router); // usar el router
app.mount('#app');
