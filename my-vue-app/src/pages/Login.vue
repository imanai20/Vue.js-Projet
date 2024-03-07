<template>
  <main>
    <h1 class="title">Login</h1>
    <p>Si vous n'avez pas de compte </p>
    <p><router-link to="/signUp">Créer un compte</router-link></p>
    <br>
    <form @submit.prevent="login" class="login-form">
      <label>Votre adresse e-mail
        <input v-model="email" type="email" name="email" maxlength="150" required autocomplete="email"/>
      </label>
      <br>
      <label>Mot de passe
        <input v-model="password" type="password" name="mdp" maxlength="30" required autocomplete="current-password"/>
      </label>
      <br>
      <button type="submit" class="login-button">Connexion</button>
    </form>
  </main>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';
import apolloClient from '../apollo/apollo-client';
import gql from 'graphql-tag';
import { SHA256 } from 'crypto-js'; // Import the SHA256 function

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();
    const userStore = useUserStore();

    async function login() {
      const LOGIN_QUERY = gql`
      query MyQuery {
  loginUsers {
    id
    email
    password
    nom
    prenom
    dateDeNaissance
  }
}
      `;

      const hashedPassword = SHA256(password.value).toString(); // Hash the password

      try {
        const response = await apolloClient.query({
          query: LOGIN_QUERY,
          variables: {
            email: email.value,
            password: hashedPassword, // send hashed password
          },
        });

        if (response.data.loginUsers.length > 0) {
          userStore.setUser(response.data.loginUsers[0]);
          router.push('/principal');
        } else {
          throw new Error('Invalid credentials');
        }
      } catch (error) {
        console.error('GraphQL error:', error);

        if (error.networkError && error.networkError.statusCode === 400) {
          console.log('Bad Request - The request was unacceptable, often due to missing a required parameter.');
          alert('Bad Request - The request was unacceptable.');
        } else if (error.message === 'Invalid credentials') {
          alert('Invalid credentials');
        } else {
          alert('An error occurred while trying to log in.');
        }
      }
    }

    return {
      email,
      password,
      login,
    };
  },
};
</script>

<style>
main {
    padding: 20px;
    background-color: rgba(250, 250, 250, 0.8);}

h1, h2, h3 {
    padding: 0%;
    text-align: center;
    color: black;
    font-family: 'Helvetica Neue', sans-serif;
}

.product-list {
    list-style-type: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}
p {
    color: black;
    text-decoration: none;
    font-weight: bold;
    font-size: 15px;
    text-align: center;
}
.product-item {
    border: 1px solid #e1e1e1;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    transition: transform 0.2s ease-in-out;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.product-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}

.product-image {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
}

h3 {
    color: black;
    margin: 10px 0;
}

p {
    text-align: center;
    font-size: 25px;
    margin-bottom: 10px;
    font-weight: bold; 
}

@media (max-width: 768px) {
    .product-list {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }
}

.cart-icon {
    position: fixed;
    top: 40px;
    right: 20px;
    background-color: black;
    padding: 10px;
    border-radius: 50%;
    color: white;
    cursor: pointer;
    z-index: 100;
}

.cart-icon:hover {
    background-color: black;
    justify-content: center;
    align-items: center;
    display: flex;
    transition: 0.3s;
    
}

.title {
    color: #333;
    font-size: 32px;
    margin-bottom: 20px;
}

.login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.login-button {
    background-color: #333;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 18px;
    cursor: pointer;
}

.login-button:hover {
    background-color: #555;
}
</style>
