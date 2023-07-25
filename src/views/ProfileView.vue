<script setup>
import {useStore} from 'vuex';
import {computed} from 'vue';

const store = useStore();

const id = computed(() => store.state.id);

const request = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/merchant/${id.value}/account`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});

const infos = await request.json();

console.log(infos);

</script>
<template>
  <div class="flex flex-row-screen justify-center items-center">
    <div class="flex flex-col items-center py-10">
      <img
          class="w-24 h-24 mb-3 rounded-full shadow-lg"
          src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
          alt="Bonnie image"
      />
      <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
        {{ infos.contactFirstName }} {{ infos.contactLastName }}
      </h5>
      <span class="text-sm text-gray-500 dark:text-gray-400">Marchand</span>
        <dd class="text-lg font-semibold"> Compagny name : {{ infos.companyName }}</dd>
        <dd class="text-lg font-semibold"> email : {{ infos.contactEmail }}</dd>
        <dd class="text-lg font-semibold"> phone : {{ infos.contactPhone }}</dd>
        <dd class="text-lg font-semibold"> confirmation url : {{ infos.confirmationRedirectUrl }}</dd>
        <dd class="text-lg font-semibold"> cancel url : {{ infos.cancellationRedirectUrl }}</dd>
        <dd class="text-lg font-semibold"> currency : {{ infos.currency }}</dd>
        <dd class="text-lg font-semibold">  token : {{ infos.clientToken }}</dd>
        <dd class="text-lg font-semibold"> secret : {{ infos.clientSecret }}</dd>
    </div>
  </div>
</template>
