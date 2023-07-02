<script setup>
import Product from '../components/myProduct.vue';
</script>

<template>
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
