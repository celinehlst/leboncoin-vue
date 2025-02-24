<script setup>
import { ref } from 'vue'

const props = defineProps(['sort', 'pricemin', 'pricemax'])

const priceMin = ref(props.pricemin)
const priceMax = ref(props.pricemax)
const sort = ref(props.sort)
</script>

<template>
  <section id="search-bar">
    <form action="">
      <div>
        <h3>Prix</h3>
        <div>
          <div>
            <input type="number" name="priceMin" placeholder="Minimum" min="0" v-model="priceMin" />
            <label for="priceMin">€</label>
          </div>
          <div>
            <input
              type="number"
              name="priceMax"
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
        <label for="sort">Prix croissant</label>
        <input type="radio" value="price:desc" id="priceDesc" name="sort" v-model="sort" />
        <label for="sort">Prix décroissant</label>
        <input type="radio" name="sort" v-model="sort" />
        <label for="sort">Pas de tri</label>
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
