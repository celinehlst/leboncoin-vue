<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  offer: Object,
})

const formatDate = computed(() => {
  return props.offer.attributes.publishedAt.split('T')[0].split('-').reverse().join('/')
})
</script>
<template>
  <article>
    <div>
      <img
        v-if="offer.attributes.owner.data.attributes.avatar.data"
        :src="offer.attributes.owner.data.attributes.avatar.data.attributes.url"
        alt=""
        class="avatar"
      />
      <p>{{ offer.attributes.owner.data.attributes.username }}</p>
    </div>

    <RouterLink :to="{ name: 'offer', params: { id: offer.id } }" :offer="offer">
      <img :src="`${offer.attributes.pictures.data[0].attributes.url}`" alt="" />
      <h2>{{ offer.attributes.title }}</h2>
    </RouterLink>

    <p>{{ offer.attributes.price }}€</p>
    <br />
    <div>
      <p>{{ formatDate }}</p>
      <i class="fa-regular fa-heart"></i>
    </div>
  </article>
</template>
<style scoped>
article {
  width: 18%;
  margin-bottom: 10px;
}

article img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 20px;
}

article div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0px;
}

.avatar {
  height: 30px;
  width: 30px;
}
</style>
