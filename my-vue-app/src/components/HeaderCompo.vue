<template>
  <nav>
      <router-link to="/">Accueil</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/principal">PM</router-link>
      <router-link to="/contact">Contact</router-link>
      <header v-if="user.isAuthenticated">
        <span>{{ user.nom }} {{ user.prenom }} - Âge: {{ userAge }}</span>
      </header>
  </nav>
</template>

<script>
import { useUserStore } from '../stores/userStore';
import { computed } from 'vue';

export default {
  setup() {
    const user = useUserStore();

    const userAge = computed(() => {
      console.log("Calculating age for date of birth:", user.dateDeNaissance);
      if(user.dateDeNaissance) {
        const birthDate = new Date(user.dateDeNaissance);
        const today = new Date();
        console.log("Today's date:", today); // Debug: log today's date
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        console.log("Calculated age:", age);
        return age;
      } else {
        console.log("Date of birth is missing");
      }
      return '';
    });

    return { user, userAge };
  },
};
</script>

