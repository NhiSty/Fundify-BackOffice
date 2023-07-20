<script setup>
import { useStore } from 'vuex';

const store = useStore();
const product = store.state.selectedProduct;
console.log(product);
</script>

<template>
  <div>
      <h1 class="text-2xl font-semibold text-gray-900">
        Panier
      </h1>
    <div v-if="product">
      <!-- Two columns, left is the paiement form, right is the cart -->
      <div class="flex flex-row">
        <div class="flex flex-col w-1/2">
          <form class="flex flex-col" action="#" method="POST">
            <div class="flex flex-row">
              <div class="flex flex-col w-1/2">
                <label for="firstName" class="block text-sm font-medium text-gray-700">Prénom <span style="color: red;">*</span></label>
                <input
                  type="firstName"
                  id="firstName"
                  v-model="input.firstName"
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>
              <div class="flex flex-col w-1/2">
                <label for="lastName" class="block text-sm font-medium text-gray-700">Nom <span style="color: red;">*</span></label>
                <input
                  type="lastName"
                  id="lastName"
                  v-model="input.lastName"
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>
            </div>
            <div class="flex flex-row">
              <div class="flex flex-col w-1/2">
                <label for="email" class="block text-sm font-medium text-gray-700">Email <span style="color: red;">*</span></label>
                <input
                  type="email"
                  id="email"
                  v-model="input.email"
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>
              <div class="flex flex-col w-1/2">
                <label for="phone" class="block text-sm font-medium text-gray-700">Téléphone <span style="color: red;">*</span></label>
                <input
                  type="phone"
                  id="phone"
                  v-model="input.phone"
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>
            </div>
            <div class="flex flex-row">
              <div class="flex flex-col w-1/2">
                <label for="address" class="block text-sm font-medium text-gray-700">Adresse <span style="color: red;">*</span></label>
                <input
                  type="address"
                  id="address"
                  v-model="input.address"
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>
              <div class="flex flex-col w-1/2">
                <label for="city" class="block text-sm font-medium text-gray-700">Ville <span style="color: red;">*</span></label>
                <input
                  type="city"
                  id="city"
                  v-model="input.city"
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>
              <div class="flex flex-col w-1/2">
                <label for="zipCode" class="block text-sm font-medium text-gray-700">Code postal <span style="color: red;">*</span></label>
                <input
                  type="zipCode"
                  id="zipCode"
                  v-model="input.zipCode"
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>
              <div class="flex flex-col w-1/2">
                <label for="country" class="block text-sm font-medium text-gray-700">Pays <span style="color: red;">*</span></label>
                <input
                  type="country"
                  id="country"
                  v-model="input.country"
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>
            </div>
            <button
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="submit"
              v-on:click.prevent="login()">
              Payer
            </button>
          </form>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Vous devez sélectionner un produit avant d'accéder à cette page.</p>
    </div>
  </div>
</template>
