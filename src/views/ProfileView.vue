<script setup>
import { inject } from 'vue'

const props = defineProps({ id: String })
const Store = inject('Store')
</script>
<template>
  <main>
    <div>
      <h1>{{ Store.userInfos.value.username }}</h1>
      <p>{{ Store.userInfos.value.username }}</p>
    </div>
  </main>
</template>
<style scoped></style>
