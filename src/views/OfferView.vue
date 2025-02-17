<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const props = defineProps({
  id: String,
})

const offerViewInfos = ref({})
// console.log(offerViewInfos.value)
onMounted(async () => {
  try {
    const { data } = await axios.get(
      `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/${props.id}?populate[0]=owner&populate[1]=pictures`,
    )

    offerViewInfos.value = data.data
    console.log(offerViewInfos.value)
  } catch (error) {
    console.log(error)
  }
})
</script>
<template>
  <main>
    <section>
      <img :src="offerViewInfos.attributes.pictures.data[0].attributes.url" alt="" />
      <h1>Titre</h1>
    </section>
    <aside>
      <img src="" alt="" />
      <p>User</p>
      <p>Pièce d'identité vérifiée</p>
      <p>Répond généralement en 1 heure</p>
      <div class="flex">
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
}
section {
  width: 70%;
}
aside {
  width: 20%;
  padding: 20px;
  box-shadow: 0px 0px 6px 0px #80808094;
  border-radius: 5px;
}

button {
  display: block;
  text-align: center;
  width: 100%;
  margin-bottom: 10px;
}
</style>
