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
  import apolloClient from '../apollo/apollo-client'; // Assurez-vous que le chemin est correct
  import gql from 'graphql-tag';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        nom: '',
        prenom: '',
        dateDeNaissance: '' // Assurez-vous que cette date est au format 'YYYY-MM-DD'
      };
    },
    methods: {
      signup() {
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
            password: this.password,
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
          if (error.graphQLErrors && error.graphQLErrors.length > 0) {
            console.error('GraphQL Errors:', error.graphQLErrors);
          } else if (error.networkError) {
            console.error('Network Error:', error.networkError);
          } else if (error.message) {
            console.error('Error Message:', error.message);
          }
        });
      }
    }
  };
  </script>
  