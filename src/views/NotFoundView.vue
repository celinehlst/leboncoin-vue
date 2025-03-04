<script setup></script>
<template>
  <main class="container">
    <div>
      <p style="font-size: 40px; color: var(--main-color); font-weight: 700">404</p>
      <p style="font-size: 40px; font-weight: 700">Perdu dans les</p>
      <p style="font-size: 40px; color: var(--main-color); font-weight: 700">RAYONS !</p>
    </div>
    <p>Désolé, on a cherché dans tous les coins, on n’a pas trouvé la bonne page.</p>
    <RouterLink :to="{ name: 'home' }">
      <p><i class="fa-solid fa-arrow-left"></i> Retour à l'accueil</p></RouterLink
    >
  </main>
</template>
<style scoped>
main {
  text-align: left;
  background-image: url('../assets/img/notfound-D8MXZORp.webp');
  height: calc(100vh - 280px);
  background-position: right;
  background-size: contain;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 50px;
}
</style>
