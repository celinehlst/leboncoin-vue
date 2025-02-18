<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <Header />
  <section>
    <RouterView />
  </section>

  <Footer />
</template>

<style scoped>
section {
  padding-top: 120px;
}
</style>
