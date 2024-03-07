<template>
  <main class="full-page">
    <div class="error-container">
      <h1>ERROR 404</h1>
      <p>Page not found</p>
    </div>
  </main>
</template>

<script setup>
</script>

<style scoped>
.full-page {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  z-index: 2;
}

h1 {
  color: white;
  font-size: 6.5em;
  margin-bottom: 10px;
}

p {
  color: white;
  font-size: 2em;
  margin-bottom: 20px;
}
</style>
