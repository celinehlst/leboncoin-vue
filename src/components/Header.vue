<script setup></script>

<template>
  <header>
    <main class="container">
      <div id="topbar">
        <RouterLink :to="{ name: 'home' }"><img src="../assets/img/logo.svg" /></RouterLink>

        <div id="buttons">
          <button class="main-button">
            <i class="fa-regular fa-square-plus"></i>Déposer une annonce
          </button>
          <form action="">
            <input type="text" name="search" id="search" placeholder="Rechercher sur leboncoin" />
            <button><i class="fa-solid fa-magnifying-glass"></i></button>
          </form>
        </div>
        <div>
          <i class="fa-regular fa-user"></i><br />
          <a href="#">Se connecter</a>
        </div>
      </div>
      <div id="menu">
        <a href="#">Immobilier</a>
        <a href="#">Véhicules</a>
        <a href="#">Location de vacances</a>
        <a href="#">Emploi</a>
        <a href="#">Mode</a>
        <a href="#">Maison & Jardin</a>
        <a href="#">Famille</a>
        <a href="#">Electronique</a>
        <a href="#">Loisirs</a>
        <a href="#">Autres</a>
      </div>
    </main>
  </header>
</template>

<style scoped>
header {
  position: fixed;
  background: #fff;
  width: 100%;
  height: 120px;
  z-index: 999;
}

#topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
}

#topbar #buttons {
  display: flex;
  align-items: center;
}

#topbar div {
  text-align: center;
}

#menu {
  display: flex;
  justify-content: space-between;
}
</style>
