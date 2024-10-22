<template>
  <div class="medecin-dashboard d-flex">
    <SidebarMedecin/>
    <div class="section-container">
      <HeaderPatient/>

      <div class="virtual-consultation-room">
        <h1>Salle de Consultation Virtuelle</h1>

        <div v-if="consultation" class="consultation-layout">
          <div class="consultation-info">
            <h2>Détails de la Consultation</h2>
            <div class="info-grid">
              <div class="info-item">
                <strong>Date :</strong>
                <span>{{ formatDate(consultation.date) }}</span>
              </div>
              <div class="info-item">
                <strong>ID du rendez-vous :</strong>
                <span>{{ consultation.rendez_vous_id }}</span>
              </div>
              <div class="info-item">
                <strong>Heure de début :</strong>
                <span>{{ consultation.heure_debut }}</span>
              </div>
              <div class="info-item">
                <strong>Heure de fin :</strong>
                <span>{{ consultation.heure_fin }}</span>
              </div>
              <div class="info-item">
                <strong>Type :</strong>
                <span>{{ consultation.type_consultation }}</span>
              </div>
            </div>
            <div class="info-item full-width">
              <strong>Diagnostic :</strong>
              <p>{{ consultation.diagnostic }}</p>
            </div>
            <div class="info-item full-width">
              <strong>Notes du médecin :</strong>
              <p>{{ consultation.notes_medecin }}</p>
            </div>
            <div class="info-item full-width">
              <strong>Url de la téléconsultation :</strong>
              <p>{{ consultation.url_teleconsultation }}</p>
            </div>
          </div>
          
          <div class="video-chat">
            <h2>Vidéo Consultation</h2>
            <JitsiMeeting :roomName="consultation.rendez_vous_id" />
          </div>
        </div>

        <div v-else class="loading">
          <p>Chargement de la consultation...</p>
          <div class="spinner"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SidebarMedecin from '@/components/SidebarMedecin.vue';
import HeaderPatient from '@/components/HeaderPatient.vue';
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getConsultation } from "@/services/consultationService";
import JitsiMeeting from "@/components/JitsiMeeting.vue";

const consultation = ref(null);
const route = useRoute();

const fetchConsultation = async () => {
  const consultationId = route.params.id;
  try {
    const response = await getConsultation(consultationId);
    consultation.value = response.data;
    console.log(consultation.value);
  } catch (error) {
    console.error("Erreur lors de la récupération de la consultation:", error);
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
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
.section-container {
  flex-grow: 1;
  padding: 20px;
  background-color: none;
}

.virtual-consultation-room {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 0 8px #297fb939;
}

h1 {
  color: #2c3e50;
  margin-bottom: 24px;
  text-align: center;
  font-size: 20px;
}

.consultation-layout {
  display: flex;
  gap: 24px;
}

.consultation-info {
  flex: 1;
  background-color: #f8fafc;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 4px #297fb939;
}

.video-chat {
  flex: 2;
  background-color: #f8fafc;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 4px #297fb939;
}

h2 {
  color: #2980b9;
  margin-bottom: 16px;
  font-size: 1rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.info-item {
  margin-bottom: 12px;
}

.info-item strong {
  display: block;
  color: #34495e;
  margin-bottom: 4px;
}

.info-item span, .info-item p {
  color: #7f8c8d;
}

.full-width {
  grid-column: 1 / -1;
}

.loading {
  text-align: center;
  padding: 40px;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #2980b9;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 20px auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .consultation-layout {
    flex-direction: column;
  }
}
</style>