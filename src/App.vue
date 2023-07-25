<script setup>
import { RouterView } from 'vue-router';
import { useStore } from 'vuex';
import { onMounted } from 'vue';
import NavBar from './components/NavBar.vue';

const store = useStore();

onMounted(async () => {
  await store.dispatch('checkAuth');
});
</script>

<template>
  <div>
    <header>
      <NavBar />
    </header>
    <div class="container mx-auto mt-8">
      <Suspense>
        <RouterView />
      </Suspense>
    </div>
  </div>
</template>
