<template>
  <div class="flex flex-col items-center mb-4">
    <div class="mb-6">
      <h1 class="text-3xl font-semibold">Tableau de bord</h1>
    </div>
    <div class="w-full mb-6">
      <div class="border border-gray-300 shadow">
        <h3 class="text-xl p-3">Argent Généré</h3>
        <div class="p-3">
          <canvas id="revenueChart" ref="revenueChart"></canvas>
        </div>
      </div>
    </div>
    <div class="w-full md:w-1/2">
      <div class="border border-gray-300 shadow">
        <h3 class="text-xl p-3">Transactions Réussies</h3>
        <div class="p-3">
          <canvas id="successfullTransactionsChart" ref="successfullTransactionsChart"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Chart } from 'chart.js';
import { BarController, CategoryScale, LinearScale, DoughnutController } from 'chart.js';
import { ArcElement, BarElement, LineElement } from 'chart.js';
import { Title, Tooltip, Legend } from 'chart.js';

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

onMounted(() => {
  new Chart(revenueChart.value.getContext('2d'), {
    type: 'bar',
    data: {
      labels: ['John Doe', 'Michel Berger', 'Amin Nairi', 'Adrien Morin'],
      datasets: [
        {
          label: 'Transactions généré',
          data: [2500, 1500, 3500, 1500],
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
          data: [3, 2],
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