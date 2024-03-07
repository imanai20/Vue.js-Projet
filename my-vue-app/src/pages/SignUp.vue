<template>
  <form @submit.prevent="signup">
    <input v-model="email" type="email" placeholder="Email" required autocomplete="email" />
    <input v-model="password" type="password" placeholder="Password" required autocomplete="new-password" />
    <input v-model="nom" type="text" placeholder="Nom" required />
    <input v-model="prenom" type="text" placeholder="Prénom" required />
    <input v-model="dateDeNaissance" type="date" :max="today" placeholder="Date de Naissance" required />
    <button type="submit">Sign Up</button>
  </form>
</template>

<script>
import { SHA256 } from 'crypto-js';
import apolloClient from '../apollo/apollo-client';
import gql from 'graphql-tag';
import { ref, computed } from 'vue';
import { useUserStore } from '../stores/userStore';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const nom = ref('');
    const prenom = ref('');
    const dateDeNaissance = ref('');
    const router = useRouter();

    const today = computed(() => {
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const day = now.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    });

    const signup = async () => {
      const hashedPassword = SHA256(password.value).toString();

      const mutation = gql`
        mutation SignupUser($email: String!, $password: String!, $nom: String!, $prenom: String!, $dateDeNaissance: Date!) {
          createLoginUser(data: { email: $email, password: $password, nom: $nom, prenom: $prenom, dateDeNaissance: $dateDeNaissance }) {
            id
          }
        }
      `;

      try {
        const response = await apolloClient.mutate({
          mutation,
          variables: {
            email: email.value,
            password: hashedPassword,
            nom: nom.value,
            prenom: prenom.value,
            dateDeNaissance: dateDeNaissance.value
          }
        });
        console.log('Signup successful:', response.data.createLoginUser); // Debugging: Successful signup
        const userStore = useUserStore();
        userStore.setUser(email.value, nom.value, prenom.value, dateDeNaissance.value);
        console.log("User stored:", userStore.$state); // Debugging: Check stored user data
        router.push('/login');
      } catch (error) {
        console.error('Error on signup:', error); // Debugging: Catch and log any errors
      }
    };

    return {
      email,
      password,
      nom,
      prenom,
      dateDeNaissance,
      today,
      signup
    };
  }
};
</script>