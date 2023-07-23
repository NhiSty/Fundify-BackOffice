<script setup>
import { ref, onMounted } from 'vue';
// @todo Uncomment this when the 401 error is fixed.
// import { useRouter } from 'vue-router';

const marchands = ref([]);

// @todo Uncomment this when the 401 error is fixed.
// const router = useRouter();

onMounted(async () => {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/admin/merchants`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  console.log(response);

  if (response.ok) {
    const data = await response.json();
    marchands.value = data;
  } else if (response.status === 401) {
    console.log('You are not authorized.');
    // router.push('/login');
  } else {
    console.log('An error occurred.');
  }
});
</script>
<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <h2 class="my-2 text-2xl">Page admin</h2>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">Nom</th>
          <th scope="col" class="px-6 py-3">Prénom</th>
          <th scope="col" class="px-6 py-3">Status</th>
          <th scope="col" class="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="marchand in marchands"
            v-bind:key="marchand"
            class="bg-white border-b dark:bg-gray-800
            dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

          <th scope="row" class="px-6 py-4 text-gray-900 whitespace-nowrap">
            {{ marchand.lastname }}
          </th>
          <td class="px-6 py-4">{{ marchand.firstname }}</td>
          <td class="px-6 py-4">{{ marchand.approved }}</td>
          <td class="px-6 py-4">
            <a
              href="#"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >Modifier</a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
