<!-- Dashboard.vue -->
<template>
  <div class="dashboard p-4">
    <!-- KPIs Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5 d-flex justify-content-between">
      <div v-for="(kpi, index) in kpis" :key="index" 
           class="bg-white rounded-lg shadow p-4">
        <div class="flex items-center justify-between">
          <h3 class="text-gray-500 text-sm">{{ kpi.title }}</h3>
          <span class="text-gray-400">
            <i :class="kpi.icon"></i>
          </span>
        </div>
        <div class="mt-2">
          <span class="text-2xl font-bold">{{ kpi.value }}</span>
          <span :class="['text-sm ml-2', kpi.trend > 0 ? 'text-green-500' : 'text-red-500']">
            {{ kpi.trend }}%
          </span>
        </div>
      </div>
    </div>

    <!-- Graphiques principaux -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 d-flex flex-wrap">
      <!-- Consultations Graph -->
      <div class="bg-white rounded-lg shadow p-4">
        <h3 class="text-lg font-semibold mb-4">Évolution des consultations</h3>
        <Line :data="consultationsData" :options="consultationsOptions" />
      </div>

      <!-- Distribution par spécialité -->
      <div class="bg-white rounded-lg shadow p-4">
        <h3 class="text-lg font-semibold mb-4">Distribution par spécialité</h3>
        <Pie :data="specialitiesData" :options="specialitiesOptions" />
      </div>
    </div>

    <!-- Statistiques détaillées -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 d-flex">
      <!-- Revenus mensuels -->
      <div class="bg-white rounded-lg shadow p-4">
        <h3 class="text-lg font-semibold mb-4">Revenus mensuels</h3>
        <Bar :data="revenueData" :options="revenueOptions" />
      </div>

      <!-- Satisfaction patients -->
      <div class="bg-white rounded-lg shadow p-4">
        <h3 class="text-lg font-semibold mb-4">Satisfaction patients</h3>
        <Line :data="satisfactionData" :options="satisfactionOptions" />
      </div>

      <!-- Activité DME -->
      <div class="bg-white rounded-lg shadow p-4">
        <h3 class="text-lg font-semibold mb-4">Activité DME</h3>
        <Bar :data="dmeData" :options="dmeOptions" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend 
} from 'chart.js'
import { Line, Pie, Bar } from 'vue-chartjs'

// Enregistrement des composants Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

// Données KPI
const kpis = ref([
  {
    title: 'Total Utilisateurs',
    value: '1,234',
    trend: 12,
    icon: 'fas fa-users'
  },
  {
    title: 'Consultations du jour',
    value: '48',
    trend: 8,
    icon: 'fas fa-stethoscope'
  },
  {
    title: 'Revenus du mois',
    value: '2.4M FCFA',
    trend: 15,
    icon: 'fas fa-chart-line'
  },
  {
    title: 'Nouveaux patients',
    value: '156',
    trend: -5,
    icon: 'fas fa-user-plus'
  }
])

// Données pour les graphiques
const consultationsData = {
  labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
  datasets: [{
    label: 'Consultations',
    data: [65, 78, 90, 85, 95, 110],
    borderColor: '#6366f1',
    tension: 0.1
  }]
}

const consultationsOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Évolution des consultations'
    }
  }
}

const specialitiesData = {
  labels: ['Généraliste', 'Cardiologue', 'Pédiatre', 'Autres'],
  datasets: [{
    data: [40, 20, 15, 25],
    backgroundColor: [
      '#6366f1',
      '#8b5cf6',
      '#d946ef',
      '#ec4899'
    ]
  }]
}

const specialitiesOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right'
    }
  }
}

const revenueData = {
  labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
  datasets: [{
    label: 'Revenus (M FCFA)',
    data: [2.1, 1.8, 2.4, 2.2, 2.6, 2.4],
    backgroundColor: '#6366f1'
  }]
}

const revenueOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    }
  }
}

const satisfactionData = {
  labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
  datasets: [{
    label: 'Satisfaction (%)',
    data: [85, 88, 87, 90, 89, 92],
    borderColor: '#6366f1',
    fill: true,
    backgroundColor: 'rgba(99, 102, 241, 0.1)'
  }]
}

const satisfactionOptions = {
  responsive: true,
  scales: {
    y: {
      min: 0,
      max: 100
    }
  }
}

const dmeData = {
  labels: ['Créés', 'Mis à jour', 'Consultés'],
  datasets: [{
    label: 'Activité DME',
    data: [125, 254, 478],
    backgroundColor: '#6366f1'
  }]
}

const dmeOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    }
  }
}
</script>

<style scoped>
.dashboard {
  background-color: #f3f4f6;
  min-height: 100vh;
}
</style>