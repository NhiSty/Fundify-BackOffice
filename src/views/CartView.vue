<script setup>
import { useStore } from 'vuex';

const store = useStore();
const product = store.state.selectedProduct;
console.log(product);
</script>

<template>
  <div>
    <div v-if="product">
      <div>{{ product.title }}</div>
    </div>

    <div v-else>
      <p>Vous devez sélectionner un produit avant d'accéder à cette page.</p>
    </div>
  </div>
</template>
