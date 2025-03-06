<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'

const props = defineProps({
  sort: String,
  pricemin: String,
  pricemax: String,
})

const priceMin = ref(props.pricemin)
const priceMax = ref(props.pricemax)
const sort = ref(props.sort)

const route = useRoute()
const router = useRouter()

const handleSubmit = () => {
  // Copie des query existantes pour pouvoir les modifier, copier le contenu d'un objet dans un autre
  const queries = { ...route.query }
  if (priceMin.value) {
    queries.pricemin = priceMin.value
  } else {
    delete queries.pricemin
  }
  if (priceMax.value) {
    queries.pricemax = priceMax.value
  } else {
    delete queries.pricemax
  }
  if (sort.value) {
    queries.sort = sort.value
  } else {
    delete queries.sort
  }
  queries.page = 1
  router.push({ name: 'home', query: queries })
}
</script>

<template>
  <section id="search-bar">
    <form @submit.prevent="handleSubmit">
      <div>
        <h3>Prix</h3>
        <div>
          <div>
            <input
              type="number"
              name="priceMin"
              id="priceMin"
              placeholder="Minimum"
              min="0"
              v-model="priceMin"
            />
            <label for="priceMin">€</label>
          </div>
          <div>
            <input
              type="number"
              name="priceMax"
              id="priceMax"
              placeholder="Maximum"
              :min="priceMin"
              v-model="priceMax"
            />
            <label for="priceMax">€</label>
          </div>
        </div>
      </div>
      <div>
        <h3>Tri</h3>
        <input type="radio" value="price:asc" id="priceAsc" v-model="sort" />
        <label for="priceAsc">Prix croissant</label>
        <input type="radio" value="price:desc" id="priceDesc" name="sort" v-model="sort" />
        <label for="priceDesc">Prix décroissant</label>
        <input type="radio" value="" name="sort" v-model="sort" id="none" />
        <label for="none">Pas de tri</label>
      </div>
      <div>
        <button class="main-button">Rechercher</button>
      </div>
    </form>
  </section>
</template>

<style scoped>
#search-bar form {
  display: flex;
  justify-content: space-between;
}

form div div,
form div div div {
  display: flex;
}
</style>
