// Assuming this content is in your userStore.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: !!localStorage.getItem('user'),
  }),
  actions: {
    setUser(userDetails) {
      this.user = userDetails;
      this.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(userDetails));
    },
    logout() {
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem('user');
    },
  },
});
