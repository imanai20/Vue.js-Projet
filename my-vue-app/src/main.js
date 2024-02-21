import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import Accueil from './pages/Accueil.vue'
import Login from './pages/Login.vue'
import App from './App.vue'


  const routes = [
  { path: "/", component: Accueil },
  { path: "/login", component: Login },
]


const router = createRouter({
    history: createWebHashHistory(),
    routes,
  })
const app = createApp(App)

app.use(router)

app.mount('#app')


