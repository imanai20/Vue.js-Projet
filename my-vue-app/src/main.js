import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import Accueil from './pages/Accueil.vue';
import Login from './pages/Login.vue';
import App from './App.vue';
import Principal from './pages/Principal.vue';
import SignUp from './pages/SignUp.vue';
import contact from './pages/Contact.vue';
import { createPinia } from 'pinia';

const routes = [
  { path: "/", component: Accueil },
  { path: "/login", component: Login },
  { path: "/principal", component: Principal },
  { path: "/signUp", component: SignUp },
  { path: "/contact", component: contact }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount('#app');
