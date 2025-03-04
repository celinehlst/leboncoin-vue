<script setup>
import { computed, onBeforeMount, onMounted, ref, inject } from 'vue'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { useRouter } from 'vue-router'

const Store = inject('Store')
const props = defineProps({ id: String })
const offerInfos = ref({})
const firstname = ref('')
const lastname = ref('')
const phone = ref('')
const option = ref('faceToFace')
const total = computed(() => {
  if (option.value === 'faceToFace') {
    return offerInfos.value.attributes.price + 0.99
  } else {
    return offerInfos.value.attributes.price + 0.99 + 15.6
  }
})
const router = useRouter()

// Création d'une instance de Stripe (👇 Pensez à remplacer par votre clé publique)
const stripePromise = loadStripe(
  'pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP',
)

// Valeur réactive qui stockera l'élément 'Card'
const cardElement = ref(null)

// Hook qui se déclenche avant le montage du composant
onBeforeMount(async () => {
  // Utilisation de l'instance de Stripe
  const stripe = await stripePromise

  // Obtention du gestionnaire d'élément Stripe
  const elements = stripe.elements()

  // Création d'un élément 'Card' qui sera stocké dans la 'ref' nommée 'cardElement'
  cardElement.value = elements.create('card', {
    style: {
      // Style appliqué à l'élément 'Card' au démarrage
      base: {
        // fontSize: '20px',
        // fontFamily: 'Impact, Haettenschweiler',
        // color: 'purple',
        // '::placeholder': {
        //   color: 'coral',
        // },
        // iconColor: 'aqua', // couleur de l'icône carte
      },
      // Style appliqué à l'élément 'Card' si le numéro est invalide
      invalid: {
        color: 'blue',
        iconColor: 'gold',
      },
    },
  })

  // Montage de l'élément 'Card' dans la 'div' ayant l'id 'card-element'
  cardElement.value.mount('#card-element')
})
onMounted(async () => {
  try {
    const { data } = await axios.get(
      `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/${props.id}?populate[0]=owner.avatar&populate[1]=pictures`,
    )
    offerInfos.value = data.data
    console.log(offerInfos.value)
  } catch (error) {
    console.log(error)
  }
})

const handlePayment = async () => {
  try {
    if (firstname.value && lastname.value) {
      // Utilisation de l'instance de Stripe
      const stripe = await stripePromise

      // Création du TOKEN de Stripe
      const { token } = await stripe.createToken(cardElement.value)

      // Stocke l'id du TOKEN de Stripe dans une variable
      const stripeToken = token.id

      const response = await axios.post(
        'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/buy',
        {
          token: stripeToken,
          amount: total.value,
          title: offerInfos.value.attributes.title,
        },
        {
          headers: {
            Authorization: 'Bearer' + Store.userInfos.value.token,
            'Content-Type': 'multipart/form-data',
          },
        },
      )

      if (response.data.status === 'succeeded') {
        alert(
          `Paiement de ${total.value}€ validé pour l'achat du produit ${offerInfos.value.attributes.title} par ${lastname.value} ${firstname.value}`,
        )
      }

      router.push({ name: 'home' })
    } else {
      alert('Vous devez renseigner votre nom et prénom')
    }
  } catch (error) {
    console.log(error)
  }
}
</script>
<template>
  <h1>Finalisez votre paiement</h1>
  <main>
    <form @submit.prevent="handlePayment">
      <div class="content">
        <div class="box">
          <h2>Informations personnelles</h2>
          <p>Une pièce d'identité vous sera demandée pour récupérer votre colis</p>
          <label for="firstname">Prénom</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            v-model="firstname"
            placeholder="Prénom"
          />
          <label for="lastname">Nom</label>
          <input type="text" id="lastname" name="lastname" v-model="lastname" placeholder="Nom" />
          <label for="phone">Téléphone</label>
          <input type="text" id="phone" name="phone" v-model="phone" placeholder="Téléphone" />
          <p class="secondary-text">
            Recevoir un SMS pour l'arrivée de votre colis ou votre code de locker
          </p>
        </div>
        <div class="box">
          <h2>Coordonnées bancaires</h2>
          <div id="card-element"></div>
          <button class="main-button">Payer</button>
          <p class="secondary-text">
            Paiement sécurisé Votre banque peut vous demander d’autoriser le paiement pour compléter
            votre achat.
          </p>
          <p class="secondary-text">
            Vous êtes sur un serveur de paiement sécurisé par les normes ssl (https) et pcidss de
            nos partenaires bancaires. Vos données sont encryptées pour plus de sécurité.
          </p>
        </div>
      </div>
      <aside v-if="offerInfos.attributes" class="box">
        <div class="options">
          <img :src="offerInfos.attributes.pictures.data[0].attributes.url" alt="" />
          <h2>{{ offerInfos.attributes.title }}</h2>
          <p class="price">{{ offerInfos.attributes.price }} €</p>
        </div>
        <h3>Mode de remise</h3>
        <div class="options">
          <input type="radio" id="faceToFace" name="option" value="faceToFace" v-model="option" />
          <div>
            <label for="faceToFace">Remise en main propre</label>
            <p class="secondary-text">
              Payez en ligne et récupérez votre achat en main propre lors de votre rendez-vous avec
              le vendeur
            </p>
          </div>
        </div>
        <div class="options">
          <input type="radio" id="colissimo" name="option" value="colissimo" v-model="option" />
          <div>
            <label for="colissimo">Colissimo</label>
            <p class="secondary-text">à votre domicile sous 2-3 jours</p>
          </div>
          <p class="price">15,60€</p>
        </div>
        <div class="protection">
          <div>
            <h3>Protection Leboncoin</h3>
            <p class="price">0,99 €</p>
          </div>
          <div>
            <i class="fa-solid fa-check"></i>
            <p>Votre argent est sécurisé et versé au bon moment</p>
          </div>
          <div>
            <i class="fa-solid fa-check"></i>
            <p>Notre service client dédié vous accompagne</p>
          </div>
        </div>
        <div class="total">
          <h3>Total</h3>
          <p class="price">{{ total }} €</p>
        </div>
      </aside>
    </form>
  </main>
</template>
<style scoped>
main {
  display: flex;
}

.box {
  padding: 20px;
  margin: 20px;
  box-shadow: 0px 0px 10px lightgrey;
  border-radius: 20px;
}
.content {
  width: 70%;
}
.content div {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

form {
  display: flex;
  align-items: start;
}

input {
  border-radius: 10px;
  padding: 10px;
  border: 1px solid lightgrey;
}

aside {
  width: 30%;
}

aside img {
  width: 50px;
}

.options {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

label,
p,
.options div,
h2,
h3 {
  text-align: left;
}

.price {
  color: brown;
  font-weight: 700;
}

.protection div,
.total {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

i {
  color: green;
  margin-right: 10px;
}
</style>
