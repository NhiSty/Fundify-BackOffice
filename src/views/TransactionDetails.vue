<script setup>
import {
  computed, onBeforeMount, ref,
} from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import TransactionStatusChip from '../components/TransactionStatusChip.vue';
import OperationStatusChip from "../components/OperationStatusChip.vue";
import CustomDialog from "../components/CustomDialog.vue";

const transactionDetails = ref({});

const store = useStore();
const route = useRoute();
const isAdmin = computed(() => store.state.isAdmin);
const merchantId = computed(() => store.state.merchantId);

const getTransactionDetailsByMerchant = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/api/merchants/${merchantId.value}/transaction/${route.params.id}`,
    {
      method: 'GET',
      credentials: 'include',
    },
  );
  if (response.ok) {
    const data = await response.json();
    // eslint-disable-next-line prefer-destructuring
    transactionDetails.value = data[0];
  } else {
    console.error('An error occurred.');
  }
};

const getTransactionDetailsByAdmin = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/api/transaction/${route.params.id}`,
    {
      method: 'GET',
      credentials: 'include',
    },
  );
  if (response.ok) {
    const data = await response.json();
    // eslint-disable-next-line prefer-destructuring
    transactionDetails.value = data[0];
  } else {
    console.error('An error occurred.');
  }
};

onBeforeMount(async () => {
  if (isAdmin.value) {
    await getTransactionDetailsByAdmin();
  } else {
    await getTransactionDetailsByMerchant();
  }
});

const shortId = (id) => id.substring(0, 8);

</script>

<template>
  <v-card elevation="4" variant="elevated">
    <v-card-title>
      <h1 class="text-2xl font-bold">Transaction #{{ transactionDetails.transactionId }}</h1>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row no-gutters>
          <v-col
              cols="12"
              sm="6"
          >
            <v-card-subtitle>
              <p class="text-xl font-bold">Montant: {{ transactionDetails.amount }} {{ transactionDetails.currency }}</p>
              <p class="text-xl font-bold">Montant remboursable: {{ transactionDetails.refundAmountAvailable }} {{ transactionDetails.currency }}</p>
              <p class="text-xl font-bold">Statut: <TransactionStatusChip :transaction-status="transactionDetails.status" /></p>
              <CustomDialog />
            </v-card-subtitle>
          </v-col>

          <v-col
              cols="12"
              sm="6"
          >
            <div>
              <h3 class="text-xl font-bold">Historique de la transaction</h3>
              <v-table
                  fixed-header
                  height="270px"
                  class="pa-2 ma-2"
                  style="margin-bottom: 20px; border: 1px solid #dadada; border-radius: 10px" >
                <thead style=" z-index: 1100;">
                <tr>
                  <th class="text-left">
                    Statut
                  </th>
                  <th class="text-left">
                    Date
                  </th>
                </tr>
                </thead>
                <tbody
                    style="overflow: scroll"
                >
                <tr
                    v-for="item in transactionDetails.statusHist"
                    :key="item.status"
                >
                  <td><TransactionStatusChip :transaction-status="item.status" /></td>
                  <td>{{ new Date(item.date).toDateString() }}</td>
                </tr>
                </tbody>
              </v-table>
            </div>
          </v-col>

        </v-row>
      </v-container>

      <div class="pt-4">
        <h3>Opération de la transaction</h3>
        <v-table
            fixed-header
            class="pa-2 ma-2"
            height="300px"
            style="margin-bottom: 20px; overflow: scroll; border: 1px solid #dadada; border-radius: 10px; z-index: 1000"
        >
          <thead style=" z-index: 1100;">
          <tr>
            <th class="text-left">
              Id
            </th>
            <th class="text-left">
              Type
            </th>
            <th class="text-left">
              Montant
            </th>
            <th class="text-left">
              Statut
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="item in transactionDetails.operations"
              :key="item.id"
          >
            <td>{{ shortId(item.operationId) }}</td>
            <td>{{ item.type === 'capture' ? 'Règlement' : 'Remboursement' }}</td>
            <td>{{ item.amount }}</td>
            <td><OperationStatusChip :operation-status="item.status" /></td>
          </tr>
          </tbody>
        </v-table>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
