<template>
  <div class="d-flex">
    <SidebaPatient />
    <div class="section-content">
      <HeaderPatient />
      <div class="section-container mb-5">
        <h1>Dossier Médical</h1>
        <div class="dossier-content" v-if="dossier">
          <div class="info-medeicale">
            <div class="mb-4" v-if="dossier.antecedents_medicaux">
              <h2>Antécédents médicaux</h2>
              <p>{{ dossier.antecedents_medicaux }}</p>
            </div>
            <div class="mb-4">
              <h2>Traitements médicaux</h2>
              <p>{{ dossier.traitements }}</p>
            </div>
            <div class="mb-4">
              <h2>Note d'observations</h2>
              <p>{{ dossier.notes_observations }}</p>
            </div>
            <div class="mb-4">
              <h2>Interventions chirurgicales</h2>
              <p>{{ dossier.intervention_chirurgicale }}</p>
            </div>
            <div class="mb-4">
              <h2>Informations supplémentaires</h2>
              <p>{{ dossier.info_sup }}</p>
            </div>
          </div>
          <div class="info-generale">
            <div class="d-flex flex-column align-items-center gap-3">
              <img
                src="../../../public/image/portrait-3d-female-doctor.jpg"
                alt="Photo de profil du patient"
              />
              <h3>Informations générales</h3>
            </div>
            <div>
              <p>Prénom: <strong>{{ patient.user.prenom }}</strong></p>
              <p>Nom: <strong>{{ patient.user.nom }}</strong></p>
              <p>Numéro de dossier: <strong>{{ dossier.numero_dme }}</strong></p>
              <p>Date de naissance: <strong>{{ patient.user.dateNaissance }}</strong></p>
              <p>Contact: <strong>{{ patient.user.telephone }}</strong></p>
              <p>Email: <strong>{{ patient.user.email }}</strong></p>
              <p>Adresse: <strong>{{ patient.user.adresse }}</strong></p>
              <p>Numéro patient: <strong>{{ patient.numero_patient }}</strong></p>
              <p>Contact d'urgence: <strong>{{ patient.numero_urgence }}</strong></p>
            </div>
          </div>
        </div>

        <!-- Documents Section -->
        <div class="document-content d-flex">
          <div class="document-contenu">
            <div class="d-flex align-items-center gap-2 mb-3">
              <i class="bi bi-file-earmark-text"></i>
              <h3 class="mb-0">Mes documents</h3>
            </div>
            <div v-if="documents.length">
              <div
                v-for="document in documents"
                :key="document.id"
                class="d-flex gap-2"
              >
                <i class="bi bi-file-earmark-text"></i>
                <p>
                  <a :href="document.file_path" target="_blank">
                    {{ document.type_document }} - {{ document.upload_date }}
                  </a>
                </p>
              </div>
            </div>
            <div v-else>
              <p>Aucun document disponible</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import SidebaPatient from "@/components/SidebaPatient.vue";
import HeaderPatient from "@/components/HeaderPatient.vue";
import { getDossierByPatient } from "@/services/dossiermedicalService";

const dossier = ref(null);
const documents = ref([]);
const patient = ref({});

const fetchDossierMedical = async () => {
  try {
    const patientId = localStorage.getItem("patient_id");
    const response = await getDossierByPatient(patientId);
    dossier.value = response.data;
    documents.value = dossier.value.documents; // Charger les documents associés
    patient.value = dossier.value.patient; // Informations générales du patient
  } catch (error) {
    console.error("Erreur lors de la récupération du dossier médical:", error);
  }
};

onMounted(fetchDossierMedical);
</script>

<style scoped>
.section-container h1 {
  font-family: "Montserrat";
  font-size: 18px;
  color: #717171;
  margin-bottom: 15px;
}

.section-container h2 {
  color: #000;
  font-size: 18px;
}

.dossier-content {
  display: flex;
  gap: 25px;
}

.dossier-content .info-medeicale {
  flex: 3;
  box-shadow: 0 0 8px #297fb921;
  padding: 25px;
  border-radius: 8px;
}
.dossier-content .info-generale {
  flex: 1;
  height: fit-content;
  box-shadow: 0 0 8px #297fb921;
  padding: 25px;
  border-radius: 8px;
}

.dossier-content .info-generale img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #2980b9;
}
.dossier-content .info-generale h3 {
  font-size: 18px;
}

.document-content {
  gap: 25px;
  margin-top: 25px;
}

.document-content .televerser-document {
  flex: 3;
  box-shadow: 0 0 8px #297fb921;
  padding: 25px;
  border-radius: 8px;
}

.document-content .televerser-document h4 {
  font-size: 18px;
  color: #2980b9;
}

.document-content .document-contenu {
  flex: 1;
  height: fit-content;
  box-shadow: 0 0 8px #297fb921;
  padding: 25px;
  border-radius: 8px;
}

/* Formulaire upload */
.upload-container {
  /* border: 2px solid red; */
  border-radius: 5px;
  background-color: none;
  border: 1px solid #bdbdbd;
}

.drag-drop-area {
  border: 2px dashed #cccccc;
  padding: 20px;
  text-align: center;
  background-color: #fff;
  cursor: pointer;
  position: relative;
}

.drag-drop-area:hover {
  background-color: #e9ecef;
}

.file-input {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.icon {
  font-size: 48px;
  color: #6c757d;
}

.browse-link {
  color: #007bff;
  text-decoration: none;
}

.browse-link:hover {
  text-decoration: underline;
}

.upload-container .btn {
  background: #2980b9;
  border: none;
  width: 100%;
  padding: 15px;
  font-weight: bold;
} 

/* document-contenu */
.document-contenu h3 {
  font-size: 18px;
}

/* Bouton retour */
.btn-retour {
  padding: 0;
  text-decoration: underline;
  text-decoration-color: #2980b9;
}
</style>
