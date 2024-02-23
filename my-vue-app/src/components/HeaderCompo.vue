<template>
<nav>
    <router-link to="/">Accueil</router-link>
    <router-link to="/login">Login</router-link>
    <router-link to="/Principal">PM</router-link>
    <router-link to="/contact">Contact</router-link>
    <template>
    <header>
      <p>Nom : {{ user.nom }}</p>
      <p>Prénom : {{ user.prenom }}</p>
      <p>Date de Naissance : {{ user.dateDeNaissance }}</p>
    </header>
  </template>
  
  <script setup>

  import { useUserStore } from '../stores/userStore';
   const store = useUserStore()
   store.$state
    
  </script>
  
</nav>
</template>
<style>
  
</style>