<script setup>
import jwt_decode from "jwt-decode";
import { useStore } from 'vuex';

const store = useStore();
const product = store.state.selectedProduct;

let userId = '';
const cookies = document.cookie.split(';');
for (let i = 0; i < cookies.length; i++) {
  const cookie = cookies[i].trim();
  if (cookie.startsWith('token=')) {
    const token = cookie.substring('token='.length, cookie.length);
    const decoded = jwt_decode(token);
    userId = decoded.id;
  } else {
    console.log('No token found');
  }
}

const input = {
  amount: product.price,
  merchantId: 1,
  userId: userId,
  currency: '',
};

const pay = async () => {
  try {
    fetch(import.meta.env.VITE_SERVER_URL + '/api/transition/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });
  } catch (error) {
    console.log(error);
    console.log(document.cookie.split(';').find(cookie => cookie.trim().startsWith('token=')).split('=')[1]);
  }
};
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold text-gray-900">
      Panier
    </h1>
    <div v-if="product">
      <div class="flex flex-col w-full rounded-lg shadow-lg overflow-hidden mt-6">
        <div class="flex flex-col w-full">
          <div class="flex flex-row justify-between items-center px-4 py-2 bg-gray-100">
            <div class="flex flex-col">
              <h3 class="text-lg font-semibold text-gray-900">
                {{ product.title }}
              </h3>
              <p class="text-sm font-medium text-gray-500">
                {{ product.description }}
              </p>
            </div>
            <div class="flex flex-col">
              <p class="text-sm font-medium text-gray-500">
                {{ product.price }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <form class="flex flex-col" action="#" method="POST">
        <div class="flex flex-row my-4">
          <div class="flex w-1/2 items-center">
            <p>
              Montant à payer : {{ product.price }}
            </p>
          </div>
          <div class="flex flex-col w-1/2">
            <label for="currency" class="text-sm font-medium text-gray-700 hidden">
              Devise
            </label>
            <select id="currency" name="currency" v-model="input.currency" autocomplete="currency"
              class="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option selected key="EUR">EUR</option>
              <option key="USD">USD</option>
              <option key="GBP">GBP</option>
            </select>
          </div>
        </div>
        <button
          class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          type="submit" v-on:click.prevent="pay()">
          Payer
        </button>
      </form>
    </div>
    <div v-else>
      <p>Vous devez sélectionner un produit avant d'accéder à cette page.</p>
    </div>
  </div>
</template>
