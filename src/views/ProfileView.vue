<script setup>
import { useStore } from 'vuex';
import { ref, computed } from 'vue';

const store = useStore();

const selectedMerchant = localStorage.getItem('selectedMerchant');
const token = computed(() => store.state.token);
const isApproved = computed(() => store.state.isApproved);
let id;
if (selectedMerchant !== null) {
  id = computed(() => selectedMerchant);
} else {
  id = computed(() => store.state.merchantId);
}

const isEditing = ref(false);
const initialInfos = ref({});
const validationErrors = ref({});

const toggleEditing = () => {
  if (!isEditing.value) {
    initialInfos.value = { ...infos };
  } else {
    Object.assign(infos, initialInfos.value);
  }
  isEditing.value = !isEditing.value;
}

let infos; let clientToken; let clientSecret;
if (isApproved.value || selectedMerchant !== null) {
  const request = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/merchants/${id.value}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: token.value,
    },
    credentials: 'include',
  });

  infos = await request.json();
  console.log(infos);
  clientToken = ref(infos.clientToken);
  clientSecret = ref(infos.clientSecret);
}

async function generateNewCredentials() {
  fetch(`${import.meta.env.VITE_SERVER_URL}/api/merchants/${id.value}/credentials`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      token: token.value,
    },
    credentials: 'include',

  }).then((response) => response.json())
    .then((data) => {
      clientToken.value = data.clientToken;
      clientSecret.value = data.clientSecret;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function isValidEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
}

function isValidUrl(url) {
  const regex = /^(https?:\/\/)?([a-zA-Z0-9-]+)\.com(:[0-9]+)?(\/\S*)?$/;
  return regex.test(url);
}

function isValidPhone(phone) {
  const re = /^\d{10}$/;
  return re.test(String(phone).toLowerCase());
}

function isValidCurrency(currency) {
  const upperCaseCurrency = String(currency).toUpperCase();
  const re = /^[A-Z]{3}$/;
  return re.test(upperCaseCurrency);
}

async function updateMerchant() {
  validationErrors.value = {};

  const requiredFields = ['companyName', 'contactEmail', 'contactPhone', 'confirmationRedirectUrl', 'cancellationRedirectUrl', 'currency'];
  requiredFields.forEach(field => {
    if (!infos[field]) {
      validationErrors.value[field] = 'Ce champ est obligatoire';
    }
  });

  if (!infos.contactEmail || !isValidEmail(infos.contactEmail)) {
    validationErrors.value.email = "Email invalide";
  }
  if (!infos.contactPhone || !isValidPhone(infos.contactPhone)) {
    validationErrors.value.contactPhone = "Numéro de téléphone invalide";
  }
  if (!infos.confirmationRedirectUrl || !isValidUrl(infos.confirmationRedirectUrl)) {
    validationErrors.value.confirmationUrl = "URL de confirmation invalide";
  }
  if (!infos.cancellationRedirectUrl || !isValidUrl(infos.cancellationRedirectUrl)) {
    validationErrors.value.cancellationUrl = "URL d'annulation invalide";
  }
  if (!infos.currency || !isValidCurrency(infos.currency)) {
    validationErrors.value.currency = "Devise invalide (exemple : EUR, USD, GBP)";
  }

  if (Object.keys(validationErrors.value).length > 0) {
    return;
  }
  await fetch(`${import.meta.env.VITE_SERVER_URL}/api/merchants/${id.value}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      token: token.value,
    },
    body: JSON.stringify({
      companyName: infos.companyName,
      contactEmail: infos.contactEmail,
      contactPhone: infos.contactPhone,
      confirmationRedirectUrl: infos.confirmationRedirectUrl,
      cancellationRedirectUrl: infos.cancellationRedirectUrl,
      currency: infos.currency,
    }),
    credentials: 'include',
  });
  isEditing.value = false;
}
</script>

<template>
  <div v-if="isApproved || selectedMerchant !== null" class="flex flex-row-screen justify-center items-center">
    <div class="flex flex-col items-center py-10">
      <img class="w-24 h-24 mb-3 rounded-full shadow-lg"
        src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" alt="Bonnie image" />

      <div class="flex flex-col items-center" v-if="isEditing">
        <span class="text-sm text-gray-500 dark:text-gray-400">Marchand</span>
        <form @submit.prevent="updateMerchant" class="flex flex-col items-center">
          <dd class="text-lg font-semibold py-2"> Compagny name : <input v-model="infos.companyName"
              class="input-class" /><span v-if="validationErrors.companyName" class="text-red-500">{{
                validationErrors.companyName }}</span></dd>
          <dd class="text-lg font-semibold py-2"> email : <input v-model="infos.contactEmail" class="input-class" /><span
              v-if="validationErrors.email" class="text-red-500">{{ validationErrors.email }}</span></dd>
          <dd class="text-lg font-semibold py-2"> phone : <input v-model="infos.contactPhone" class="input-class" /><span
              v-if="validationErrors.contactPhone" class="text-red-500">{{ validationErrors.contactPhone }}</span></dd>
          <dd class="text-lg font-semibold py-2"> confirmation url : <input v-model="infos.confirmationRedirectUrl"
              class="input-class" /><span v-if="validationErrors.confirmationUrl" class="text-red-500">{{
                validationErrors.confirmationUrl }}</span></dd>
          <dd class="text-lg font-semibold py-2"> cancel url : <input v-model="infos.cancellationRedirectUrl"
              class="input-class" /><span v-if="validationErrors.cancellationUrl" class="text-red-500">{{
                validationErrors.cancellationUrl }}</span></dd>
          <dd class="text-lg font-semibold py-2"> currency : <input v-model="infos.currency" class="input-class" /><span
              v-if="validationErrors.currency" class="text-red-500">{{ validationErrors.currency }}</span></dd>
          <button
            class="px-4 py-2 mt-5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
            type="submit">Mettre à jour</button>
        </form>
      </div>
      <div class="flex flex-col items-center" v-else>
        <span class="text-sm text-gray-500 dark:text-gray-400">Marchand</span>
        <dd class="text-lg font-semibold"> Compagny name : {{ infos.companyName }}</dd>
        <dd class="text-lg font-semibold"> email : {{ infos.contactEmail }}</dd>
        <dd class="text-lg font-semibold"> phone : {{ infos.contactPhone }}</dd>
        <dd class="text-lg font-semibold"> confirmation url : {{ infos.confirmationRedirectUrl }}</dd>
        <dd class="text-lg font-semibold"> cancel url : {{ infos.cancellationRedirectUrl }}</dd>
        <dd class="text-lg font-semibold"> currency : {{ infos.currency }}</dd>
        <dd class="text-lg font-semibold"> id : {{ infos.id }}</dd>
        <dd class="text-lg font-semibold"> token : {{ clientToken }}</dd>
        <dd class="text-lg font-semibold"> secret : {{ clientSecret }}</dd>

        <button
          class="px-4 py-2 mt-5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-900 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
          @click="generateNewCredentials" v-if="isApproved">
          Générer des nouveaux crédentials
        </button>
      </div>
      <button @click="toggleEditing"
        class="px-4 py-2 mt-5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
        {{ isEditing ? 'Annuler' : 'Éditer' }}
      </button>
    </div>
  </div>
  <div v-else class="flex flex-col items-center py-10">
    <p class="text-lg font-semibold text-red-500 mb-4">Fait pas le malin, tu n'es pas encore approuvé !</p>
  </div></template>

<style>.input-class {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  font-size: 16px;
}</style>
