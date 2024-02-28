<template>
    <main>
      <h1>Login</h1>
      <p>Si vous n'avez pas de compte </p>
      <router-link to="/signUp">Créer un compte</router-link>
      <br>
      <label>Votre adresse e-mail
        <input v-model="email" type="email" name="email" maxlength="150" required autocomplete="email"/>
      </label>
      <br>
      <label>Mot de passe
        <input v-model="password" type="password" name="mdp" maxlength="30" required autocomplete="current-password"/>
      </label>
      <br>
      <button @click="login">Connexion</button>
    </main>
  </template>
  
  <script>
  // Imports
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '../stores/userStore';
  import apolloClient from '../apollo/apollo-client';
  import gql from 'graphql-tag';
  import { SHA256 } from 'crypto-js';
  
  export default {
    setup() {
      // Réactives references
      const email = ref('');
      const password = ref('');
      const dateDeNaissance = ref('');
      const router = useRouter();
      const userStore = useUserStore();
      
  
      // Login function
      const login = async () => {
        const hashedPassword = SHA256(password.value).toString();
        console.log(`Hashed Password: ${hashedPassword}`);
  
        // GraphQL query
        const query = gql`
        query LoginUser {
            loginUsers {
                email
                password
                nom
                prenom
                dateDeNaissance
            }
        }
        `;
  
        // Trying to login
        try {
          const response = await apolloClient.query({
            query,
            variables: {
              email: email.value,
              password: hashedPassword,
              dateDeNaissance : dateDeNaissance.value,
            },
          });
  
          // Handling response
          if (response.data.loginUsers.length > 0) {
            userStore.setUser(response.data.loginUsers[0]);
            router.push('/principal');
          } else {
            // TODO: Replace alert with a more user-friendly message
            alert('Invalid credentials');
          }
        } catch (error) {
          // TODO: Handle different error types accordingly
          console.error('Error logging in:', error);
          alert('An error occurred while trying to log in.');
        }
      };
  
      // Exposing to the template
      return {
        email,
        password,
        login
      };
    }
  };
  </script>