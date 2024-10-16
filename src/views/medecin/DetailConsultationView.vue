<template>
  <div class="medecin-dashboard d-flex">
    <!-- Votre sidebar et en-tête ici -->
    <div class="main--content">
      <div class="header--wrapper">
        <!-- En-tête de votre dashboard ici -->
      </div>

      <div class="detail-section">
        <div class="section-container mb-5">
          <h1>Détail du dossier médical</h1>

          <!-- Vérifier si le dossier médical existe -->
          <div class="detail-content" v-if="consultation">
            <!-- Affichage des antécédents médicaux et des traitements -->
            <div class="info-consultation">
              <div>
                <p><strong>Date de la consultation</strong></p>
                <p>{{ consultation.date }}</p>
              </div>
              <div>
                <p><strong>ID du rendez-vous</strong></p>
                <p>{{ consultation.rendez_vous_id }}</p>
              </div>
              <div>
                <p><strong>Heure de début de la consultation</strong></p>
                <p>{{ consultation.heure_debut }}</p>
              </div>
              <div>
                <p><strong>Heure de fin de la consultation</strong></p>
                <p>{{ consultation.heure_fin }}</p>
              </div>
              <div>
                <p><strong>Type de consultation</strong></p>
                <p>{{ consultation.type_consultation }}</p>
              </div>
              <div>
                <p><strong>Diagnostique de la consultation</strong></p>
                <p>{{ consultation.diagnostic }}</p>
              </div>
              <div>
                <p><strong>Note lors de la consultation</strong></p>
                <p>{{ consultation.notes_medecin }}</p>
              </div>
              <div>
                <p><strong>Url de la consultation</strong></p>
                <p>{{ consultation.url_teleconsultation }}</p>
              </div>
            </div>
            <div>
              <!-- Passer l'ID du rendez-vous comme roomName -->
              <JitsiMeeting :roomName="consultation.rendez_vous_id" />
            </div>
          </div>

          <!-- Chargement en cours -->
          <div v-else>
            <p>Chargement des données...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { handleError, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
// import router from "@/router";
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
    handleError(error);
  }
};

// Appel à la fonction lors du montage du composant
onMounted(() => {
  fetchConsultation();
});

// const logout = () => {
//   localStorage.removeItem("token");
//   router.push({ name: "connexion" });
// };
</script>


<style scoped>
.main--content {
  position: sticky;
  top: 80px;
  left: 0;
  background: #fff;
  width: 100%;
  padding: 0.5rem 0;
}

.header--wrapper img {
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 50%;
}

.header--wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: #fff;
  border-radius: 10px;
  padding: 10px 2rem;
  margin-bottom: 1rem;
}

.user--info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user--info i {
  font-size: 1.5rem;
  cursor: pointer;
}

.user--info h4 {
  font-size: 1rem;
}

.search--box {
  background: none;
  border: 1px solid #e9ecef;
  border-radius: 5px;
  align-items: center;
  gap: 5px;
  padding: 4px 12px;
}

.search--box input {
  background: transparent;
  padding: 6px 15px;
  border: none;
  outline: none;
  /* color: #ADB5BD; */
  font-size: 16px;
}

.search--box i {
  color: #adb5bd;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.5s ease-out;
}

.search--box i:hover {
  transform: scale(1.2);
}
</style>
