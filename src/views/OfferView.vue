<script setup>
import { onMounted, ref, computed } from 'vue'
import { useCycleList } from '@vueuse/core'
import axios from 'axios'

const props = defineProps({
  id: String,
})

const offerViewInfos = ref(null)

const formatDate = computed(() => {
  return offerViewInfos.value.attributes.publishedAt.split('T')[0].split('-').reverse().join('/')
})

const cycleList = computed(() => {
  if (offerViewInfos.value.attributes.pictures.data) {
    const { state, next, prev } = useCycleList(offerViewInfos.value.attributes.pictures.data)
    return { state, next, prev }
  } else {
    return {}
  }
})

// const formatPrice = computed(() => {
//   const price = offerViewInfos.value.attributes.price
//   const priceStr = price.toString()
//   return price
// })

onMounted(async () => {
  try {
    const { data } = await axios.get(
      `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/${props.id}?populate[0]=owner.avatar&populate[1]=pictures`,
    )

    offerViewInfos.value = data.data
    console.log(offerViewInfos.value)
  } catch (error) {
    console.log(error)
  }
})
</script>
<template>
  <main class="container">
    <section>
      <p v-if="offerViewInfos === null">Chargement en cours</p>
      <!-- <h1>{{ offerViewInfos.attributes.title }}</h1> -->
      <div v-else>
        <div id="pictures">
          <i @click="cycleList.prev()" class="fa-solid fa-chevron-left"></i>
          <img :src="cycleList.state.value.attributes.url" alt="" />
          <i @click="cycleList.next()" class="fa-solid fa-chevron-right"></i>
        </div>

        <div class="left">
          <h1>{{ offerViewInfos.attributes.title }}</h1>
          <p class="price">{{ offerViewInfos.attributes.price }}€</p>
          <p>{{ formatDate }}</p>
          <hr />
          <h2>Description</h2>
          <p>{{ offerViewInfos.attributes.description }}</p>
          <hr />
          <p><i class="fa-solid fa-location-dot"></i>Agon-Coutainville (50230)</p>
        </div>
      </div>
    </section>

    <p v-if="offerViewInfos === null">Chargement en cours</p>
    <aside v-else>
      <div>
        <img
          v-if="offerViewInfos.attributes.owner.data.attributes.avatar.data"
          :src="offerViewInfos.attributes.owner.data.attributes.avatar.data.attributes.url"
          alt=""
          class="avatar"
        />
        <p>{{ offerViewInfos.attributes.owner.data.attributes.username }}</p>
      </div>

      <p
        v-if="offerViewInfos.attributes.owner.data.attributes.confirmed === true"
        class="confirmed-status"
      >
        <i class="fa-solid fa-check-double"></i> Pièce d'identité vérifiée
      </p>
      <p>Répond généralement en 1 heure</p>
      <hr />
      <div>
        <button class="main-button">Acheter</button>
        <button class="secondary-button">Message</button>
      </div>
    </aside>
  </main>
</template>
<style scoped>
main {
  display: flex;
  justify-content: space-between;
  align-items: start;
}
section {
  width: 65%;
}

#pictures {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

#pictures i {
  cursor: pointer;
}
section img {
  height: 300px;
  text-align: center;
}

.left {
  text-align: left;
}

h1,
.price,
h2 {
  font-weight: 700;
}

hr {
  margin-top: 20px;
  border-color: rgb(251, 251, 251);
}

aside {
  width: 25%;
  padding: 20px;
  box-shadow: 0px 0px 6px 0px #80808094;
  border-radius: 5px;
  text-align: left;
}

aside div:first-child {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

aside img {
  height: 40px;
  width: 40px;
  object-fit: cover;
  border-radius: 20px;
}

.confirmed-status {
  background-color: rgba(255, 192, 163, 0.954);
  color: rgb(102, 69, 69);
  border-radius: 15px;
  padding: 5px;
  margin-bottom: 10px;
}

button {
  display: block;
  text-align: center;
  width: 100%;
  margin-bottom: 10px;
}
</style>
