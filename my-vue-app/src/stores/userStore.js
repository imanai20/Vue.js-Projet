import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    nom: '',
    prenom: '',
    dateDeNaissance: ''
  }),
  actions: {
    setUser(nom, prenom, dateDeNaissance) {
      this.nom = nom;
      this.prenom = prenom;
      this.dateDeNaissance = dateDeNaissance;
    }
  }
});
