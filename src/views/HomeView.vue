<script setup>
import { onMounted, ref } from 'vue';
import Product from '../components/myProduct.vue';

let isLoggedIn = ref(false);

onMounted(() => {
  if (document.cookie.split(';').some((cookie) => cookie.trim().startsWith('token='))) {
    isLoggedIn.value = true;
    console.log(isLoggedIn.value);
  } else {
    isLoggedIn.value = false;
    console.log(isLoggedIn.value);
  }
});

</script>

<template>
  <h1 class="text-2xl font-semibold text-gray-900" v-if="isLoggedIn">
    Bienvue sur Fundify
  </h1>
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
