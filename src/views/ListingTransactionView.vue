<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import MerchantWaiting from '../components/MerchantWaiting.vue';

const allTransactions = ref([]);
const transactions = ref([]);

const store = useStore();

const router = useRouter();

const userId = computed(() => store.state.id);
const isAdmin = computed(() => store.state.isAdmin);
const isApproved = computed(() => store.state.isApproved);
let merchantId = computed(() => {
  if (store.getters.getSelectedMerchant) {
    console.log("Test1");
    return store.getters.getSelectedMerchant;
  } else {
    console.log("Test2");
    return store.state.id;
  }
});

// Function to fetch merchants
const getAllTransactions = async () => {
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

    allTransactions.value = data;
  } else if (response.status === 401) {
    console.error('You are not authorized.');
    router.push('/login');
  } else {
    console.error('An error occurred.');
  }
};

const getTransactions = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/transactions/merchant/${id}`, {
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
  } else {
    console.error('An error occurred.');
  }
};

const deleteTransaction = async (id) => {
  const confirm = window.confirm('Ça dégage ?');

  if (confirm) {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/transaction/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (response.ok) {
      getAllTransactions();
    } else {
      console.log('An error occurred while deleting the transaction.');
    }
  }
};

onMounted(async () => {
  if (isAdmin.value && store.getters.getSelectedMerchant === null) {
    await getAllTransactions();
  } else if (isApproved.value || store.getters.getSelectedMerchant) {
    await getTransactions(merchantId.value);
  } else if (userId.value === null) {
    router.push('/login');
  }
});
</script>

<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg" v-if="isAdmin || isApproved">
    <h2 class="my-2 text-2xl">Liste des transactions</h2>
    <div v-if="isAdmin && !store.getters.getSelectedMerchant">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400" v-if="allTransactions.length > 0">
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
        <tr v-for="transaction in allTransactions" v-bind:key="transaction" class="bg-white border-b dark:bg-gray-800
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
    <div v-else-if="isApproved || merchantId">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400" v-if="transactions.length > 0">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">Amount</th>
          <th scope="col" class="px-6 py-3">Status</th>
          <th scope="col" class="px-6 py-3">Devise</th>
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
  <div class="flex flex-col items-center mb-4" v-else>
    <MerchantWaiting />
  </div>
</template>
