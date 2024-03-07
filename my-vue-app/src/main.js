import { createApp, provide } from 'vue';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { createRouter, createWebHashHistory } from 'vue-router';
import { createPinia } from 'pinia';
import apolloClient from './apollo/apollo-client';
import Accueil from './pages/Accueil.vue';
import Login from './pages/Login.vue';
import App from './App.vue';
import Principal from './pages/Principal.vue';
import SignUp from './pages/SignUp.vue';
import contact from './pages/Contact.vue';
import '@fortawesome/fontawesome-free/css/all.css';
import PageNotFound from './pages/PageNotFound.vue';


const routes = [
  { path: "/", component: Accueil },
  { path: "/login", component: Login },
  { path: "/principal", component: Principal },
  { path: "/signUp", component: SignUp },
  { path: "/contact", component: contact },
  { path: '/:pathMatch(.*)', component: PageNotFound },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

app.component('DefaultApolloClientProvider', {
  setup() {
    provide(DefaultApolloClient, apolloClient);
  }
});

app.mount('#app');
