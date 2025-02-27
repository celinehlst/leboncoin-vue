<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { inject } from 'vue'

const title = ref('')
const description = ref('')
const price = ref()
const pictures = ref([])
const Store = inject('Store')
// console.log(Store.userInfos.value)
// console.log(Store.userInfos.value.token)

const handleSubmit = async () => {
  try {
    const formData = new FormData()
    for (const key in pictures.value) {
      if (Object.hasOwnProperty.call(pictures.value, key)) {
        formData.append('files.pictures', pictures.value[key])
      }
    }
    const stringifiedInfos = JSON.stringify({
      title: title.value,
      description: description.value,
      price: price.value,
      owner: Store.userInfos.value.id,
    })
    console.log(stringifiedInfos)

    formData.append('data', stringifiedInfos)
    //   for (let i = 0; i < pictures.value.length; i++) {
    //     formData.append('files.url', pictures.value[i])
    //   }
    //   formData.append('data', JSON.stringify({ title: title.value }))
    //   formData.append('data', JSON.stringify({ description: description.value }))
    //   formData.append('data', JSON.stringify({ price: price.value }))
    //   formData.append('data', JSON.stringify({ owner: Store.userInfos.value.id }))
    const { data } = await axios.post(
      'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers',
      formData,
      {
        headers: {
          Authorization: `Bearer ${Store.userInfos.value.token}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    )
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}
</script>
<template>
  <main>
    <h1>Déposer une annonce</h1>
    <form @submit.prevent="handleSubmit">
      <label for="title">Titre de l'annonce</label>
      <input type="text" id="title" name="title" v-model="title" />
      <p>Vous n'avez pas besoin de mentionner "Achat" ou "Vente" ici</p>
      <label for="description">Description de l'annonce</label>
      <textarea name="description" id="description" rows="10" v-model="description"></textarea>
      <p>Nous vous rappelons que...</p>
      <label for="price">Votre prix de vente</label>
      <input type="number" v-model="price" />
      <label for="pictures">Ajoutez des photos</label>
      <input
        type="file"
        multiple
        @input="
          (event) => {
            pictures = event.target.files
          }
        "
      />
      <img src="" alt="" />
      <button class="main-button">Déposer mon annonce</button>
    </form>
  </main>
</template>
<style scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: left;
  gap: 10px;
}

form p {
  color: grey;
}
</style>
