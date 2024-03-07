<template>
  <nav>
    <div class="header-links">
      <router-link to="/">Accueil</router-link>
      <router-link v-if="!isAuthenticated" to="/login">Login</router-link>
      <router-link v-if="isAuthenticated" to="/logout" @click="logout">Logout</router-link>
      <router-link to="/principal">Principal</router-link>
      <router-link to="/contact">Contact</router-link>
    </div>
    <header v-if="isAuthenticated" class="user-header">
      <span class="user-greeting">Bonjour {{ user.nom }} {{ user.prenom }} !</span>
      <span class="user-age">({{ calculateAge(user.dateDeNaissance) }} ans)</span>
    </header>
  </nav>
</template>

<script>
import { useUserStore } from '../stores/userStore';
import { computed } from 'vue';

export default {
  setup() {
    const userStore = useUserStore();
    const isAuthenticated = computed(() => userStore.isAuthenticated);

    const calculateAge = (dateDeNaissance) => {
      const birthDate = new Date(dateDeNaissance);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    };

    const logout = () => {
      userStore.logout();
      router.push('/login');
    };

    return { user: userStore.user, isAuthenticated, calculateAge, logout };
  },
};
</script>

<style>
.header-links {
  padding: 0%;
  margin : -30px;
  display: flex;
  justify-content: space-evenly;
}

.header-links a {
  text-decoration: none;
  color: black;
  font-weight: bold;  
  font-size: 20px;
}

.user-header {
  padding: 20px;
  margin-top: -50px;
  text-align: center;
  margin-top: 30px;
}

.user-greeting {
  padding: 0%;
  display: inline-block;
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
}

.user-age {
  padding: 0;
  display: block;
  font-size: 16px;
  margin-top: 10px;
}
</style>