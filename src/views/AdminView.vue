<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const merchants = ref([]);

const router = useRouter();

// Approve a merchant
const approve = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/admin/merchant/validate`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
    credentials: 'include',
  });

  if (response.ok) {
    getMerchants();
  } else {
    console.log('An error occurred while approving the merchant.');
  }
};

// Invalidate a merchant
const invalidate = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/admin/merchant/invalidate`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
    credentials: 'include',
  });

  if (response.ok) {
    // Refresh the merchant list after successful rejection
    getMerchants();
  } else {
    console.log('An error occurred while rejecting the merchant.');
  }
};

// Reject a merchant
const reject = async (id) => {
  const confirm = window.confirm('Ça dégage ?');

  if (confirm) {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/admin/merchant/reject`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
    credentials: 'include',
  });

  if (response.ok) {
    // Refresh the merchant list after successful rejection
    getMerchants();
  } else {
    console.log('An error occurred while rejecting the merchant.');
  }
  }
};

// Function to fetch merchants
const getMerchants = async () => {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/admin/merchants`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data.merchants[0]);
    merchants.value = data.merchants;
  } else if (response.status === 401) {
    console.log('You are not authorized.');
    router.push('/login');
  } else {
    console.log('An error occurred.');
  }
}

onMounted(getMerchants);
</script>

<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <h2 class="my-2 text-2xl">Page admin</h2>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400" v-if="merchants.length > 0">
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
        <tr v-for="merchant in merchants"
            v-bind:key="merchant"
            class="bg-white border-b dark:bg-gray-800
            dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <th scope="row" class="px-6 py-4 text-gray-300">
            {{ merchant.contactLastName }}
          </th>
          <td class="px-6 py-4">{{ merchant.contactFirstName }}</td>
          <td class="px-6 py-4 bg-green-200 dark:bg-green-700 dark:text-green-300" v-if="merchant.approved">Approuvé</td>
          <td class="px-6 py-4 bg-red-200 dark:bg-red-700 dark:text-red-300" v-else>En attente</td>
          <td class="px-6 py-4" v-if="!merchant.approved">
            <button class="px-4 py-2 font-semibold text-white bg-green-500 rounded hover:bg-green-700" @click="approve(merchant.id)">
              Approuver
            </button>
            <button class="px-4 py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-700" @click="reject(merchant.id)">
              Refuser
            </button>
          </td>
          <td class="px-6 py-4" v-else>
            <button class="px-4 py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-700" @click="invalidate(merchant.id)">
              Refuser
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      <p>Aucun marchand en attente d'approbation.</p>
      <p>Personne ne veut de votre site de toute façon.</p>
    </div>
  </div>
</template>
