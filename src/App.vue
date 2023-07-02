<script setup>
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
</script>

<template>
  <div>
    <header>
      <NavBar />
    </header>
    <div class="container mx-auto mt-8">
      <RouterView />
    </div>
  </div>
</template>
