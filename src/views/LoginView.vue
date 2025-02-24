<script setup>
import { inject, ref } from 'vue'
import axios from 'axios'

const Store = inject('Store')

const email = ref('')
const username = ref('')
const password = ref('')
let incomplete = ref(false)
let errorMessage = ref(false)
let isSubmitting = ref(false)

const handleSubmit = async () => {
  try {
    if (email.value === '' || password.value === '') {
      incomplete.value = true
    } else {
      incomplete.value = false
      errorMessage.value = false
      isSubmitting.value = true
      const { data } = await axios.post(
        'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/auth/local',
        {
          identifier: email.value,
          password: password.value,
        },
      )
      console.log(data)
      Store.userInfos.value.token = $cookies.set('token', data.jwt)
      Store.userInfos.value.username = $cookies.set('username', data.user.username)

      Store.changeUserInfos({ username: usernameCookies.value, token: tokenCookies.value })
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
</script>
<template>
  <main>
    <section>
      <div class="card">
        <h1>Bonjour !</h1>
        <p>Connectez-vous pour découvrir toutes nos fonctionnalités</p>
        <form @submit.prevent="handleSubmit">
          <label for="email">E-mail*</label>
          <input type="email" name="email" v-model="email" />
          <label for="password">Mot de passe*</label>
          <input type="password" name="password" v-model="password" />
          <p v-if="incomplete === true" class="error-message">Veuillez remplir tous les champs</p>
          <p v-if="errorMessage === true" class="error-message">
            Un problème est survenu, veuillez essayer à nouveau
          </p>
          <button class="main-button">
            <span v-if="isSubmitting === false">Se connecter </span>
            <span v-else>Connexion en cours </span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </form>
        <p>
          Envie de nous rejoindre ?
          <RouterLink :to="{ name: 'signup' }">Créer un compte</RouterLink>
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

a {
  text-decoration: underline;
  font-weight: 600;
}

.error-message {
  color: red;
  text-align: center;
  margin-bottom: 5px;
}
</style>
