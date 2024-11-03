<!-- Dashboard.vue -->
<template>
  <div class="dashboard bg-light">
    <div class="container-fluid px-4 py-5">
      <!-- En-tête du tableau de bord -->
      <div class="row mb-4 align-items-center">
        <div class="col">
          <h1 class="display-6 fw-bold text-primary">Tableau de Bord Médical</h1>
          <p class="text-muted">Vue d'ensemble de votre plateforme de télémédecine</p>
        </div>
        <div class="col-auto">
          <div class="btn-group" role="group">
            <button class="btn btn-outline-primary" @click="refreshDashboard">
              <i class="bi bi-arrow-clockwise me-2"></i>Actualiser
            </button>
          </div>
        </div>
      </div>

      <!-- Cartes de KPI -->
      <div class="row g-4 mb-5">
        <div class="col-md-3" v-for="(kpi, index) in kpis" :key="index">
          <div class="card border-0 shadow-sm h-100 hover-lift">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="text-muted small text-uppercase">{{ kpi.title }}</div>
                <i :class="['text-primary', kpi.icon, 'fs-4']"></i>
              </div>
              <div class="d-flex align-items-baseline">
                <h3 class="h4 mb-0 me-2">{{ kpi.value }}</h3>
                <span :class="[
                  'badge', 
                  kpi.trend > 0 ? 'bg-success-soft' : 'bg-danger-soft',
                  'text-' + (kpi.trend > 0 ? 'success' : 'danger')
                ]">
                  {{ kpi.trend > 0 ? '+' : '' }}{{ kpi.trend }}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Graphiques principaux -->
      <div class="row g-4 mb-5">
        <!-- Consultations en ligne -->
        <div class="col-lg-6">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-header bg-white border-0 pt-4 pb-0">
              <h5 class="card-title mb-0">Consultations en Ligne</h5>
            </div>
            <div class="card-body">
              <Line 
                :data="consultationsData" 
                :options="consultationsOptions" 
                class="chart-responsive"
              />
            </div>
          </div>
        </div>

        <!-- Distribution des Spécialités -->
        <div class="col-lg-6">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-header bg-white border-0 pt-4 pb-0">
              <h5 class="card-title mb-0">Distribution des Spécialités</h5>
            </div>
            <div class="card-body">
              <Pie 
                :data="specialitiesData" 
                :options="specialitiesOptions" 
                class="chart-responsive"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Statistiques Détaillées -->
      <div class="row g-4">
        <!-- Téléconsultations -->
        <div class="col-lg-4">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-header bg-white border-0 pt-4 pb-0">
              <h5 class="card-title mb-0">Téléconsultations</h5>
            </div>
            <div class="card-body">
              <Bar 
                :data="teleconsultationData" 
                :options="teleconsultationOptions" 
                class="chart-responsive"
              />
            </div>
          </div>
        </div>

        <!-- Patients par Pathologie -->
        <div class="col-lg-4">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-header bg-white border-0 pt-4 pb-0">
              <h5 class="card-title mb-0">Patients par Pathologie</h5>
            </div>
            <div class="card-body">
              <Pie 
                :data="pathologiesData" 
                :options="pathologiesOptions" 
                class="chart-responsive"
              />
            </div>
          </div>
        </div>

        <!-- Satisfaction Patients -->
        <div class="col-lg-4">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-header bg-white border-0 pt-4 pb-0">
              <h5 class="card-title mb-0">Satisfaction Patients</h5>
            </div>
            <div class="card-body">
              <Line 
                :data="satisfactionData" 
                :options="satisfactionOptions" 
                class="chart-responsive"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
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
    title: 'Patients Actifs',
    value: '1,578',
    trend: 15,
    icon: 'bi bi-people'
  },
  {
    title: 'Consultations',
    value: '254',
    trend: 22,
    icon: 'bi bi-camera-video'
  },
  {
    title: 'Temps Moyen Consultation',
    value: '22 min',
    trend: 5,
    icon: 'bi bi-stopwatch'
  },
  {
    title: 'Taux de Réponse',
    value: '95%',
    trend: 3,
    icon: 'bi bi-check-circle'
  }
])

// Données Graphiques
const consultationsData = {
  labels: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin'],
  datasets: [{
    label: 'Consultations',
    data: [65, 78, 90, 85, 95, 110],
    borderColor: '#6366f1',
    tension: 0.4
  }]
}

const consultationsOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
  }
}

const specialitiesData = {
  labels: ['Médecine Générale', 'Psychiatrie', 'Cardiologie', 'Pédiatrie'],
  datasets: [{
    data: [40, 20, 25, 15],
    backgroundColor: [
      '#6366f1', '#8b5cf6', '#d946ef', '#ec4899'
    ]
  }]
}

const specialitiesOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'right' }
  }
}

const teleconsultationData = {
  labels: ['En Attente', 'En Cours', 'Terminées'],
  datasets: [{
    label: 'Téléconsultations',
    data: [35, 45, 120],
    backgroundColor: ['#6366f1', '#8b5cf6', '#d946ef']
  }]
}

const teleconsultationOptions = {
  responsive: true,
  plugins: {
    legend: { display: false }
  }
}

const pathologiesData = {
  labels: ['Chroniques', 'Aigues', 'Suivi', 'Urgences'],
  datasets: [{
    data: [45, 25, 20, 10],
    backgroundColor: [
      '#6366f1', '#8b5cf6', '#d946ef', '#ec4899'
    ]
  }]
}

const pathologiesOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'right' }
  }
}

const satisfactionData = {
  labels: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin'],
  datasets: [{
    label: 'Satisfaction (%)',
    data: [85, 88, 87, 90, 89, 92],
    borderColor: '#6366f1',
    backgroundColor: 'rgba(99, 102, 241, 0.2)'
  }]
}

const satisfactionOptions = {
  responsive: true,
  plugins: {
    legend: { display: false }
  },
  scales: {
    y: {
      min: 0,
      max: 100
    }
  }
}

// Méthodes
const refreshDashboard = () => {
  // Logique de rafraîchissement des données
  console.log('Tableau de bord actualisé')
}

// Initialisation
onMounted(() => {
  // Chargement initial des données
})
</script>

<style scoped>
.dashboard {
  background-color: #f8f9fa;
}

.hover-lift {
  transition: transform 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-10px);
}

.chart-responsive {
  max-height: 300px;
}

.bg-success-soft {
  background-color: rgba(25, 135, 84, 0.1);
}

.bg-danger-soft {
  background-color: rgba(220, 53, 69, 0.1);
}
</style>