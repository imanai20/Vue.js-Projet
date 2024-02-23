<template>
    <form @submit.prevent="signup">
      <input v-model="email" type="email" placeholder="Email" required autocomplete="email" />
      <input v-model="password" type="password" placeholder="Password" required autocomplete="new-password" />
      <input v-model="nom" type="text" placeholder="Nom" required />
      <input v-model="prenom" type="text" placeholder="Prénom" required />
      <input v-model="dateDeNaissance" type="date" placeholder="Date de Naissance" required />
      <button type="submit">Sign Up</button>
    </form>
  </template>
  
  <script>
import { SHA256 } from 'crypto-js';
import apolloClient from '../apollo/apollo-client';
import gql from 'graphql-tag';

export default {
  data() {
    return {
      email: '',
      password: '',
      nom: '',
      prenom: '',
      dateDeNaissance: ''
    };
  },
  methods: {
    signup() {
  const hashedPassword = SHA256(this.password).toString();
  
  const mutation = gql`
    mutation SignupUser($email: String!, $password: String!, $nom: String!, $prenom: String!, $dateDeNaissance: Date!) {
      createLoginUser(data: { email: $email, password: $password, nom: $nom, prenom: $prenom, dateDeNaissance: $dateDeNaissance }) {
        id
      }
    }
  `;

  apolloClient.mutate({
    mutation,
    variables: {
      email: this.email,
      password: hashedPassword,
      nom: this.nom,
      prenom: this.prenom,
      dateDeNaissance: this.dateDeNaissance
    }
  })
  .then(response => {
    console.log('Signup successful:', response.data.createLoginUser);
    this.$router.push('/login');
  })
  .catch(error => {
    console.error('Error on signup:', error);
  });
}

  }
};
</script>
