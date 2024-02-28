import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isAuthenticated: false, // Ajout pour gérer l'état de connexion
  }),
  actions: {
    setUser(userData) {
      this.user = userData;
      this.isAuthenticated = true; // L'utilisateur est considéré comme authentifié
    },
    logout() {
      this.user = null;
      this.isAuthenticated = false; // L'utilisateur n'est plus authentifié
    },
  },
});
