import './assets/main.css'
import { createApp, provide, ref } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'

const app = createApp(App)

app.use(VueCookies)
app.use(router)

const tokenCookies = ref($cookies.get('token'))
const usernameCookies = ref($cookies.get('username'))
const emailCookies = ref($cookies.get('email'))

const userInfos = ref({
  username: usernameCookies.value,
  token: tokenCookies.value,
  email: emailCookies.value,
})

const changeUserInfos = (infos) => {
  userInfos.value = infos
}

app.provide('Store', {
  changeUserInfos: changeUserInfos,
  userInfos: userInfos,
})

app.mount('#app')
