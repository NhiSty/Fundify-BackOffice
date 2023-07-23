<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import Product from '../components/myProduct.vue';

const store = useStore();

const isLoggedIn = computed(() => store.state.isLoggedIn);
const isMerchant = computed(() => store.state.isMerchant);
const isApproved = computed(() => store.state.isApproved);
const isAdmin = computed(() => store.state.isAdmin);
</script>

<template>
  <h1 class="text-2xl font-semibold text-gray-900" v-if="isLoggedIn">
    Bienvue sur Fundify
  </h1>
  <h2 class="text-xl font-semibold text-gray-900" v-if="isLoggedIn && isMerchant">
    Vous êtes un marchand<span v-if="isApproved"> approuvé</span><span v-else> non approuvé</span>
  </h2>
  <h2 class="text-xl font-semibold text-gray-900" v-if="isLoggedIn && isAdmin">
    Administrateur Shepard, votre intégration est terminée. Bienvenue dans notre consensus.
  </h2>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
    <Product
      :price=1500
      title="iPhone 13"
      description="Découvrez l'iphone 13 de chez Apple"
    />
    <Product
      :price=2500
      title="iPhone 14"
      description="Découvrez l'iphone 13 de chez Apple"
    />
    <Product
      :price=3500
      title="iPhone 15"
      description="Découvrez l'iphone 15 de chez Apple qui coûte un rein"
    />
  </div>
</template>
