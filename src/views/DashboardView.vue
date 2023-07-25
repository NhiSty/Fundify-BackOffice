<template>
  <div class="flex flex-col items-center mb-4">
    <div class="mb-6">
      <h1 class="text-3xl font-semibold">Tableau de bord</h1>
    </div>
    <div class="w-full mb-6">
      <div class="border border-gray-300 shadow">
        <h3 class="text-xl p-3">Argent généré par jour</h3>
        <div class="p-3">
          <canvas id="revenueChart" ref="revenueChart"></canvas>
        </div>
      </div>
    </div>
    <div class="w-full md:w-1/2">
      <div class="border border-gray-300 shadow">
        <h3 class="text-xl p-3">Transactions réussies</h3>
        <div class="p-3">
          <canvas id="successfullTransactionsChart" ref="successfullTransactionsChart"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { Chart } from 'chart.js';
import { BarController, CategoryScale, LinearScale, DoughnutController } from 'chart.js';
import { ArcElement, BarElement, LineElement } from 'chart.js';
import { Title, Tooltip, Legend } from 'chart.js';
import { useStore } from 'vuex';

const store = useStore();

const id = computed(() => store.state.id);

console.log(id.value);

const request = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/merchant/${id.value}/transactions`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});

const infos = await request.json();

Chart.register(BarController, CategoryScale, LinearScale, DoughnutController, ArcElement, BarElement, LineElement, Title, Tooltip, Legend);

const revenueChart = ref(null);
const successfullTransactionsChart = ref(null);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

// Compute the number of successful and failed transactions
const successCount = infos.filter(info => info.status === 'CONFIRMED').length;
const failureCount = infos.filter(info => info.status === 'PENDING').length;

const dailyTotals = infos.reduce((totals, info) => {
  const date = new Date(info.createdAt).toISOString().split('T')[0];
  if (!totals[date]) totals[date] = 0;
  totals[date] += parseFloat(info.amount);
  return totals;
}, {});

const dailyTotalArray = Object.entries(dailyTotals);

dailyTotalArray.sort((a, b) => new Date(a[0]) - new Date(b[0]));

const dates = dailyTotalArray.map(entry => entry[0]);
const totals = dailyTotalArray.map(entry => entry[1]);

onMounted(() => {
  new Chart(revenueChart.value.getContext('2d'), {
    type: 'bar',
    data: {
      labels: dates,  // utiliser les dates extraites
      datasets: [
        {
          label: 'Transactions généré',
          data: totals,  // utiliser les totaux extraits
          backgroundColor: '#00C853',
          borderColor: '#00C853',
          borderWidth: 1,
        },
      ],
    },
    options: chartOptions,
  });


  new Chart(successfullTransactionsChart.value.getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: ['Réussies', 'Echouées'],
      datasets: [
        {
          label: 'Transactions',
          data: [successCount, failureCount],
          backgroundColor: ['#00C853', '#FF1744'],
          hoverOffset: 4,
        },
      ],
    },
  });
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