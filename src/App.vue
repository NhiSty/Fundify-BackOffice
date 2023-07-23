<script setup>
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
import { useStore } from 'vuex';

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
