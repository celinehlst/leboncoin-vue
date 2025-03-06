<script setup>
import { onMounted, ref, computed, watchEffect } from 'vue'
import axios from 'axios'
import Card from '@/components/Card.vue'
import Filter from '@/components/Filter.vue'

const offersInfos = ref([])
const props = defineProps({
  sort: String,
  pricemin: String,
  pricemax: String,
})
// console.log(props)

onMounted(async () => {
  watchEffect(async () => {
    try {
      let pricefilters = ''
      if (props.pricemin) {
        pricefilters += `&filters[price][$gte]=${props.pricemin}`
      }
      if (props.pricemax) {
        pricefilters += `&filters[price][$lte]=${props.pricemax}`
      }
      console.log(props)

      const { data } = await axios.get(
        `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers?populate[0]=pictures&populate[1]=owner.avatar${pricefilters}&sort=${props.sort}`,
      )
      console.log(data.data)

      offersInfos.value = [...data.data]
      // console.log(offersInfos.value)
      // console.log(data.data)
    } catch (error) {
      console.log(error.message)
    }
  })
})

// console.log(offersInfos.value)

// offersInfos.value.attributes.publishedAt = computed(() => {
//   return offersInfos.value.attributes.publishedAt
// })
</script>

<template>
  <main class="container">
    <Filter :sort="sort" :pricemin="pricemin" :pricemax="pricemax" />
    <h1>Des millions de petites annonces et autant d'occasions de se faire plairsir</h1>
    <section>
      <div id="banner">
        <img src="../assets/img/onde-corail.svg" alt="" class="left" />
        <h3>C'est le moment de vendre</h3>
        <button class="main-button">
          <i class="fa-regular fa-square-plus"></i>Déposer une annonce
        </button>
        <img src="../assets/img/feuille-bleue.svg" alt="" class="right" />
      </div>
    </section>
  </main>
  <section id="offers" class="container">
    <p v-if="!offersInfos">Chargement en cours...</p>
    <div v-else>
      <Card v-for="offer in offersInfos" :key="offer.id" :offer="offer" />
    </div>
  </section>
</template>

<style scoped>
#banner {
  background: rgb(244, 203, 188);
  padding: 20px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
}

#banner img {
  position: absolute;
  border-radius: 20px;
  height: 100%;
}

.left {
  left: 0;
}

.right {
  right: 0;
}
#offers {
  display: flex;
  flex-wrap: wrap;
  column-gap: 10px;
  justify-content: space-between;
}
</style>
