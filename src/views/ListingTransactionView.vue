<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const transactions = ref([]);

const router = useRouter();

// Function to fetch merchants
const getTransactions = async () => {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/admin/transactions`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data);

    transactions.value = data;
  } else if (response.status === 401) {
    console.error('You are not authorized.');
    router.push('/login');
  } else {
    console.error('An error occurred.');
  }
};

const deleteTransaction = async (id) => {
  const confirm = window.confirm('Voulez-vous supprimer cette transaction ?');

  if (confirm) {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/transaction/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (response.ok) {
      getTransactions();
    } else {
      console.log('An error occurred while deleting the transaction.');
    }
  }
};

onMounted(async () => {
  await getTransactions();
});
</script>

<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <h2 class="my-2 text-2xl">Liste des transactions</h2>
    <div>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400" v-if="transactions.length > 0">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">Amount</th>
          <th scope="col" class="px-6 py-3">Status</th>
          <th scope="col" class="px-6 py-3">Devise</th>
          <th scope="col" class="px-6 py-3">Marchand</th>
          <th scope="col" class="px-6 py-3">Utilisateur</th>
          <th scope="col" class="px-6 py-3">Action</th>

        </tr>
        </thead>
        <tbody>
        <tr v-for="transaction in transactions" v-bind:key="transaction" class="bg-white border-b dark:bg-gray-800
            dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td class="px-6 py-4">{{ transaction.amount }}</td>
          <td class="px-6 py-4">{{ transaction.status }}</td>
          <td class="px-6 py-4">{{ transaction.currency }}</td>
          <td class="px-6 py-4">{{ transaction.merchantId }}</td>
          <td class="px-6 py-4">{{ transaction.userId }}</td>
          <td class="px-6 py-4">
            <button class="px-4 py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-700"
                    @click="deleteTransaction(transaction.id)">
              Supprimer
            </button>
          </td>
        </tr>
        </tbody>
      </table>
      <div v-else>
        <p>Vous n'avez aucune transaction.</p>
      </div>
    </div>
  </div>
</template>
