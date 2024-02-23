import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import Accueil from './pages/Accueil.vue'
import Login from './pages/Login.vue'
import App from './App.vue'
import Principal from './pages/Principal.vue'
import SignUp from './pages/SignUp.vue'
import contact from './pages/Contact.vue'
import { createPinia } from 'pinia'
import { useUserStore } from './stores/userStore';



  const routes = [
  { path: "/", component: Accueil },
  { path: "/login", component: Login },
  { path: "/principal", component: Principal },
  { path: "/signUp", component: SignUp },
  { path: "/contact", component: contact },
  { path: "/header", component:  },
]


const router = createRouter({
    history: createWebHashHistory(),
    routes,
  })

  function onUserLogin() {
  const userData = {
    nom: 'Doe',
    prenom: 'John',
    dateDeNaissance: '1990-01-01'
  };

  const userStore = useUserStore();
  userStore.setUser(userData.nom, userData.prenom, userData.dateDeNaissance);
}

const app = createApp(App)


const pinia = createPinia();




app.use(pinia);
app.use(router)

app.mount('#app')


