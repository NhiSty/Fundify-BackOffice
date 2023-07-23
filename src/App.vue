<script setup>
import { RouterView } from 'vue-router';
import { useStore } from 'vuex';
import NavBar from './components/NavBar.vue';

const store = useStore();
store.dispatch('checkAuth');
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
