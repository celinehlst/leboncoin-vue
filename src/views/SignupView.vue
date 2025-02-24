<script setup>
import { ref, inject } from 'vue'
import axios from 'axios'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

const Store = inject('Store')

const email = ref('')
const username = ref('')
const password = ref('')
let incomplete = ref(false)
let errorMessage = ref(false)
let isSubmitting = ref(false)

const handleSubmit = async () => {
  try {
    if (email.value === '' || username.value === '' || password.value === '') {
      incomplete.value = true
    } else {
      incomplete.value = false
      errorMessage.value = false
      isSubmitting.value = true
      const { data } = await axios.post(
        'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/auth/local/register',
        {
          email: email.value,
          username: username.value,
          password: password.value,
        },
      )
      console.log(data)
      Store.userInfos.value.token = $cookies.set('token', data.jwt)
      Store.userInfos.value.username = $cookies.set('username', data.user.username)
      Store.userInfos.value.email = $cookies.set('username', data.user.email)
      Store.changeUserInfos({ username: data.user.username, token: data.jwt })
    }
  } catch (error) {
    incomplete.value = false
    errorMessage.value = true
    console.log(error)
    if (error.response) {
      console.log(error.response.data.error.message)
    }
  }
  isSubmitting.value = false
}
// onMounted(async () => {
// try {
//     const {data} = await axios.post('https://site--strapileboncoin--2m8zk47gvydr.code.run/api/auth/local/register')

// } catch (error) {
//     console.log(error);

// }
// })
</script>
<template>
  <main>
    <section class="container">
      <div class="card">
        <h1>Bonjour !</h1>
        <p>Inscrivez-vous pour découvrir toutes nos fonctionnalités</p>
        <form @submit.prevent="handleSubmit">
          <label for="name">Nom*</label>
          <input type="text" name="name" v-model="username" />
          <label for="email">E-mail*</label>
          <input type="email" name="email" v-model="email" />
          <label for="password">Mot de passe*</label>
          <input type="password" name="password" v-model="password" />
          <p v-if="incomplete === true" class="error-message">Veuillez remplir tous les champs</p>
          <p v-if="errorMessage === true" class="error-message">
            Un problème est survenu, veuillez essayer à nouveau
          </p>
          <button class="main-button">
            <span v-if="isSubmitting === false">S'inscrire </span>
            <span v-else>Inscription en cours </span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </form>

        <p>
          Vous avez déjà un compte ?
          <RouterLink :to="{ name: 'login' }">Connectez-vous</RouterLink>
        </p>
      </div>
    </section>
  </main>
</template>
<style scoped>
main {
}
section {
  background-image: url('../assets/img/illustration.png');
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  min-height: 75vh;
}
div {
  width: 400px;
  margin: 0 auto;
  background: #fff;
  padding: 20px;
  border-radius: 2vw;
  box-shadow: 0px 0px 6px 0px grey;
  text-align: left;
}

form {
  display: flex;
  flex-direction: column;
  margin: 20px 0px;
}

input {
  margin: 5px 0px 20px 0px;
  border-radius: 10px;
  border: 1px solid;
  height: 25px;
}

.error-message {
  color: red;
  text-align: center;
  margin-bottom: 5px;
}

a {
  text-decoration: underline;
  font-weight: 600;
}
</style>
