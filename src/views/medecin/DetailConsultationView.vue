<template>
  <div class="consultation-page bg-gray-50 min-h-screen">
    <SidebarMedecin />
    
    <div class="main-content">
      <HeaderPatient />
      
      <div class="container-fluid py-6 px-4">
        <div class="max-w-7xl mx-auto">
          <!-- <nav aria-label="breadcrumb" class="mb-4">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="#" class="text-primary">Accueil</a></li>
              <li class="breadcrumb-item"><a href="#" class="text-primary">Consultations</a></li>
              <li class="breadcrumb-item active" aria-current="page">Détail</li>
            </ol>
          </nav> -->

          <div v-if="consultation" class="consultation-content">
            <div class="row g-4">
              <!-- En-tête de consultation -->
              <div class="col-12">
                <div class="consultation-header bg-white rounded-xl shadow-sm p-4 mb-4">
                  <div class="d-flex align-items-center justify-content-between flex-wrap gap-3">
                    <div>
                      <h1 class="h3 mb-0 text-gray-900 d-flex align-items-center gap-2">
                        <span class="badge" :class="getStatusClass">{{ getStatusText }}</span>
                        Consultation du {{ formatDate(consultation.date) }}
                      </h1>
                      <p class="text-muted mb-0 mt-1">ID: #{{ consultation.rendez_vous_id }}</p>
                    </div>
                    <ConsultationStatusBadge
                      :consultation-date="consultation.date"
                      :start-time="consultation.heure_debut"
                      :end-time="consultation.heure_fin"
                      class="consultation-badge"
                    />
                  </div>
                </div>
              </div>

              <!-- Informations détaillées -->
              <div class="col-12 col-lg-4">
                <div class="bg-white rounded-xl shadow-sm h-100">
                  <div class="p-4">
                    <h2 class="h5 mb-4 pb-2 border-bottom">Informations de la consultation</h2>
                    
                    <div class="info-grid">
                      <div class="info-item">
                        <i class="bi bi-calendar3 text-primary"></i>
                        <div>
                          <label>Date</label>
                          <p>{{ formatDate(consultation.date) }}</p>
                        </div>
                      </div>
                      
                      <div class="info-item">
                        <i class="bi bi-clock text-primary"></i>
                        <div>
                          <label>Horaires</label>
                          <p>{{ consultation.heure_debut }} - {{ consultation.heure_fin }}</p>
                        </div>
                      </div>
                      
                      <div class="info-item">
                        <i class="bi bi-camera-video text-primary"></i>
                        <div>
                          <label>Type</label>
                          <p class="capitalize">{{ consultation.type_consultation }}</p>
                        </div>
                      </div>
                    </div>

                    <div class="medical-info mt-4 pt-3 border-top" 
                         v-if="consultation.diagnostic || consultation.notes_medecin">
                      <h3 class="h6 mb-3">Informations médicales</h3>
                      
                      <div v-if="consultation.diagnostic" class="mb-3">
                        <label class="text-muted small">Diagnostic</label>
                        <p class="diagnosis-text">{{ consultation.diagnostic }}</p>
                      </div>
                      
                      <div v-if="consultation.notes_medecin">
                        <label class="text-muted small">Notes du médecin</label>
                        <p class="notes-text">{{ consultation.notes_medecin }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Zone de téléconsultation -->
              <div class="col-12 col-lg-8">
                <div class="bg-white rounded-xl shadow-sm h-100">
                  <div v-if="consultation.type_consultation === 'téléconsultation'"
                       class="teleconsultation-container h-100">
                    <JitsiMeeting
                      :consultation-id="route.params.id"
                      :room-url="consultation.url_teleconsultation"
                      :consultation-date="consultation.date"
                      :start-time="consultation.heure_debut"
                      :end-time="consultation.heure_fin"
                      :patient-name="consultation.rendez_vous.patient?.user.nom"
                      :doctor-name="consultation.rendez_vous.medecin?.user.nom"
                      :is-doctor="userRole === 'medecin'"
                      class="h-100"
                    />
                  </div>
                  
                  <div v-else class="p-5 text-center">
                    <div class="consultation-type-indicator">
                      <i class="bi bi-person-workspace text-primary display-4"></i>
                      <h3 class="mt-4 mb-2">Consultation en présentiel</h3>
                      <p class="text-muted">
                        Cette consultation se déroulera en personne au cabinet médical.
                        <br>Veuillez vous présenter à l'heure indiquée.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- État de chargement -->
          <div v-else class="loading-state">
            <div class="spinner-grow text-primary" role="status">
              <span class="visually-hidden">Chargement...</span>
            </div>
            <p class="mt-3 text-muted">Chargement des informations...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import { getConsultation } from '@/services/consultationService';
import SidebarMedecin from '@/components/SidebarMedecin.vue';
import HeaderPatient from '@/components/HeaderPatient.vue';
import JitsiMeeting from '@/components/JitsiMeeting.vue';
import ConsultationStatusBadge from '@/components/ConsultationStatusBadge.vue';

const consultation = ref(null);
const route = useRoute();
const auth = useAuthStore();

const userRole = computed(() => auth.user?.role);

const getStatusClass = computed(() => {
  const now = new Date();
  const consultDate = new Date(consultation.value?.date);
  
  if (now < consultDate) return 'bg-warning-subtle text-warning';
  if (now > consultDate) return 'bg-success-subtle text-success';
  return 'bg-primary-subtle text-primary';
});

const getStatusText = computed(() => {
  const now = new Date();
  const consultDate = new Date(consultation.value?.date);
  
  if (now < consultDate) return 'À venir';
  if (now > consultDate) return 'Terminée';
  return 'En cours';
});

const fetchConsultation = async () => {
  try {
    const response = await getConsultation(route.params.id);
    consultation.value = response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de la consultation:", error);
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

onMounted(() => {
  fetchConsultation();
});
</script>

<style scoped>
.consultation-page {
  display: flex;
}

.main-content {
  flex: 1;
  min-height: 100vh;
}

.consultation-content {
  animation: fadeIn 0.3s ease-in-out;
}

.consultation-header {
  border-left: 4px solid var(--bs-primary);
}

.info-grid {
  display: grid;
  gap: 1.5rem;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.info-item i {
  font-size: 1.25rem;
  margin-top: 0.2rem;
}

.info-item label {
  color: var(--bs-gray-600);
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
  display: block;
}

.info-item p {
  margin: 0;
  font-weight: 500;
}

.medical-info label {
  display: block;
  margin-bottom: 0.5rem;
}

.diagnosis-text, .notes-text {
  background-color: var(--bs-gray-100);
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
}

.consultation-type-indicator {
  padding: 2rem;
}

.consultation-type-indicator i {
  font-size: 3rem;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.teleconsultation-container {
  min-height: 500px;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsive adjustments */
@media (max-width: 991.98px) {
  .consultation-header {
    text-align: center;
  }
  
  .consultation-header .d-flex {
    justify-content: center !important;
  }
  
  .consultation-badge {
    margin-top: 1rem;
  }
}

@media (max-width: 767.98px) {
  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style>