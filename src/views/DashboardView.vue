<template>
  <div class="flex flex-col items-center mb-4" v-if="isApproved || store.state.selectedMerchant !== null">
    <div class="mb-6">
      <h1 class="text-3xl font-semibold">Tableau de bord</h1>
    </div>
    <div class="w-full mb-6">
      <div class="border border-gray-300 shadow">
        <h3 class="text-xl p-3">Argent généré par jour</h3>
        <div class="p-3">
          <canvas ref="revenueChart"></canvas>
        </div>
      </div>
    </div>
    <div class="w-full md:w-1/2">
      <div class="border border-gray-300 shadow">
        <h3 class="text-xl p-3">Transactions réussies</h3>
        <div class="p-3">
          <canvas ref="successfullTransactionsChart"></canvas>
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-col items-center mb-4" v-if="isAdmin && store.state.selectedMerchant === null">
    <div class="mb-6">
      <h1 class="text-3xl font-semibold">Tableau de bord</h1>
    </div>
    <div class="w-full mb-6">
      <div class="border border-gray-300 shadow">
        <h3 class="text-xl p-3">Nombre de marchands: {{ merchantCount }}</h3>
        <div class="p-3">
          <canvas ref="merchantChart"></canvas>
        </div>
      </div>
    </div>
    <div class="flex justify-around w-full mb-6">
      <div class="border border-gray-300 shadow">
        <h3 class="text-xl p-3">Transactions réussies</h3>
        <div class="p-3">
          <canvas ref="merchantValidationsChart"></canvas>
        </div>
      </div>
      <div class="border border-gray-300 shadow">
        <h3 class="text-xl p-3">Transactions échouées</h3>
        <div class="p-3">
          <canvas ref="transactionStatusChart"></canvas>
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-col items-center mb-4" v-else-if="isMerchant">
    <MerchantWaiting />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import {
  Chart, BarController, CategoryScale, LinearScale, DoughnutController, ArcElement, BarElement, LineElement, Title, Tooltip, Legend,
} from 'chart.js';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import MerchantWaiting from '../components/MerchantWaiting.vue';

const router = useRouter();
const store = useStore();
const isAdmin = computed(() => store.state.isAdmin);
const isMerchant = computed(() => store.state.isMerchant);
const isApproved = computed(() => store.state.isApproved);
let id;

if (store.getters.getSelectedMerchant !== null) {
  id = computed(() => store.getters.getSelectedMerchant);
} else {
  id = computed(() => store.state.id);
}

Chart.register(BarController, CategoryScale, LinearScale, DoughnutController, ArcElement, BarElement, LineElement, Title, Tooltip, Legend);

const revenueChart = ref(null);
const successfullTransactionsChart = ref(null);
const merchantChart = ref(null);
const merchantValidationsChart = ref(null);
const transactionStatusChart = ref(null);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const merchantCount = ref(0);
const merchantValidate = ref(0);
const merchantWaiting = ref(0);

function processDailyTotals(infos) {
  const dailyTotals = infos.reduce((totals, info) => {
    const date = new Date(info.createdAt).toISOString().split('T')[0];
    const newTotals = { ...totals };
    if (!newTotals[date]) newTotals[date] = 0;
    newTotals[date] += parseFloat(info.amount);
    return newTotals;
  }, {});

  const dailyTotalArray = Object.entries(dailyTotals);
  dailyTotalArray.sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime());

  const dates = dailyTotalArray.map((entry) => entry[0]);
  const totals = dailyTotalArray.map((entry) => entry[1]);

  return { dates, totals };
}

onMounted(async () => {
  if (id.value === null) {
    router.push('/login');
  } else if (isApproved.value || store.state.selectedMerchant !== null) {
    const request = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/merchant/${id.value}/transactions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const infos = await request.json();

    const successCount = infos.filter((info) => info.status === 'CONFIRMED').length;
    const failureCount = infos.filter((info) => info.status === 'PENDING').length;

    const { dates, totals } = processDailyTotals(infos);
    if (revenueChart.value && successfullTransactionsChart.value) {
      // eslint-disable-next-line
      new Chart(revenueChart.value, {
        type: 'bar',
        data: {
          labels: dates,
          datasets: [{
            label: 'Argent généré',
            data: totals,
            backgroundColor: '#6366F1',
            borderColor: '#6366F1',
            borderWidth: 1,
          }],
        },
        options: chartOptions,
      });

      // eslint-disable-next-line
      new Chart(successfullTransactionsChart.value, {
        type: 'doughnut',
        data: {
          labels: ['Transactions réussies', 'Transactions en attente'],
          datasets: [{
            label: 'Transactions',
            data: [successCount, failureCount],
            backgroundColor: ['#6366F1', '#F3F4F6'],
            borderColor: ['#6366F1', '#F3F4F6'],
            borderWidth: 1,
          }],
        },
        options: chartOptions,
      });
    }
  } else if (isAdmin.value && store.state.selectedMerchant === null) {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/admin/merchants`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const infos = await response.json();

    if (Array.isArray(infos.merchants)) {
      merchantCount.value = infos.merchants.length;
      merchantValidate.value = infos.merchants.filter((info) => info.approved === true).length;
      merchantWaiting.value = infos.merchants.filter((info) => info.approved === false).length;
    }

    const successCount = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
    const failureCount = Math.floor(Math.random() * (100 - 250 + 1)) + 250;

    if (merchantChart.value && merchantValidationsChart.value && transactionStatusChart.value) {
      // eslint-disable-next-line
      new Chart(merchantChart.value, {
        type: 'bar',
        data: {
          labels: ['2021-01-01', '2021-01-02', '2021-01-03', '2021-01-04', '2021-01-05'],
          datasets: [{
            label: 'Marchands inscrits',
            data: Array(5).fill().map(() => Math.floor(Math.random() * (20 - 1 + 1)) + 1),
            backgroundColor: '#6366F1',
            borderColor: '#6366F1',
            borderWidth: 1,
          }],
        },
        options: chartOptions,
      });

      // eslint-disable-next-line
      new Chart(merchantValidationsChart.value, {
        type: 'doughnut',
        data: {
          labels: ['Marchands validés', 'Marchands en attente'],
          datasets: [{
            label: 'Marchands',
            data: [merchantValidate.value, merchantWaiting.value],
            backgroundColor: ['#6366F1', '#F3F4F6'],
            borderColor: ['#6366F1', '#F3F4F6'],
            borderWidth: 1,
          }],
        },
        options: chartOptions,
      });

      // eslint-disable-next-line
      new Chart(transactionStatusChart.value, {
        type: 'doughnut',
        data: {
          labels: ['Transactions réussies', 'Transactions échoées'],
          datasets: [{
            label: 'Transactions',
            data: [successCount, failureCount],
            backgroundColor: ['#6366F1', '#F3F4F6'],
            borderColor: ['#6366F1', '#F3F4F6'],
            borderWidth: 1,
          }],
        },
        options: chartOptions,
      });
    }
  }
});
</script>

<style scoped>
.v-card {
  border-radius: 15px;
  transition: box-shadow .3s ease-in-out;
}
.v-card:hover {
  box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
}
h1 {
  color: #424242;
}
.headline {
  color: #424242;
  text-transform: uppercase;
  letter-spacing: .1em;
}
</style>
