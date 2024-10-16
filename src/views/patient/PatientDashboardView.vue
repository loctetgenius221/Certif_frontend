<template>
  <div class="d-flex">
    <SidebaPatient />
    <div class="section-content">
      <HeaderPatient />
      <div class="section-container">
        <div class="heading d-flex justify-content-between mb-3">
          <h1>Mes rendez-vous</h1>
          <router-link class="btn-rdv" :to="{ name: 'ListeMedecin' }">
            Prendre rendez-vous
          </router-link>
        </div>

        <!-- Barre de filtres pour les statuts des rendez-vous -->
        <div class="filter-bar mb-4">
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <button
                class="nav-link"
                :class="{ active: selectedFilter === 'à venir' }"
                @click="selectedFilter = 'à venir'"
              >
                À venir
              </button>
            </li>
            <li class="nav-item">
              <button
                class="nav-link"
                :class="{ active: selectedFilter === 'terminé' }"
                @click="selectedFilter = 'terminé'"
              >
                Terminé
              </button>
            </li>
            <li class="nav-item">
              <button
                class="nav-link"
                :class="{ active: selectedFilter === 'annulé' }"
                @click="selectedFilter = 'annulé'"
              >
                Annulé
              </button>
            </li>
          </ul>
        </div>

        <div class="rdv-section">
          <div class="rendezvous">
            <div v-if="filteredRendezVous.length === 0">
              <p>Aucun rendez-vous trouvé pour ce statut.</p>
            </div>
            <div v-else>
              <div
                v-for="rdv in filteredRendezVous"
                :key="rdv.id"
                class="rdv-item mt-3"
              >
                <div class="d-flex align-items-center gap-5">
                  <h3 v-if="rdv.medecin">
                    Dr {{ rdv.medecin.prenom }} {{ rdv.medecin.nom }}
                  </h3>
                  <h3>{{ rdv.type_rendez_vous }}</h3>
                  <h3>{{ new Date(rdv.date).toLocaleDateString() }}</h3>
                  <h3>{{ rdv.heure_debut }}</h3>
                </div>
                <div>
                  <router-link
                    class="btn-detail"
                    @click="showDetails(rdv)"
                    to=""
                  >
                    Voir détails..
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal pour afficher les détails -->
    <div
      v-if="selectedRdv"
      class="modal right fade"
      id="detailsModal"
      tabindex="-1"
      aria-labelledby="detailsModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-1-4">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="detailsModalLabel">
              Détails du Rendez-vous
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="d-flex gap-2 mb-4">
              <div class="head-input mb-3">
                <img
                  class="header-icon"
                  src="../../../public/image/ant-design_user-outlined.svg"
                  alt=""
                />
                <label for="medecin" class="form-label">Médecin</label>
                <input
                  type="text"
                  class="form-control"
                  id="medecin"
                  :value="
                    'Dr ' +
                    selectedRdv.medecin.prenom +
                    ' ' +
                    selectedRdv.medecin.nom
                  "
                  readonly
                />
              </div>
              <div class="head-input mb-3">
                <img
                  class="header-icon"
                  src="../../../public/image/carbon_time.svg"
                  alt=""
                />
                <label for="dateHeure" class="form-label">Date et Heure</label>
                <input
                  type="text"
                  class="form-control"
                  id="dateHeure"
                  :value="
                    formatDateTime(selectedRdv.date, selectedRdv.heure_debut)
                  "
                  readonly
                />
              </div>
              <div class="head-input mb-3">
                <img
                  class="header-icon"
                  src="../../../public/image/fluent_location-48-regular.svg"
                  alt=""
                />
                <label for="localisation" class="form-label"
                  >Localisation</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="localisation"
                  :value="selectedRdv.lieu"
                  readonly
                />
              </div>
            </div>

            <div class="d-flex align-items-center gap-3 mb-3">
              <label for="patient" class="form-label">Patient</label>
              <input
                type="text"
                class="form-control"
                id="patient"
                :value="
                  selectedRdv.patient.prenom + ' ' + selectedRdv.patient.nom
                "
                readonly
              />
            </div>

            <div class="d-flex align-items-center gap-3 mb-3">
              <label for="motif" class="form-label">Motif du rendez-vous</label>
              <input
                type="text"
                class="form-control"
                id="motif"
                v-model="selectedRdv.motif"
                readonly
              />
            </div>

            <div class="d-flex align-items-center gap-3 mb-3">
              <label for="status" class="form-label"
                >Statut du rendez-vous</label
              >
              <div class="status-buttons">
                <span
                  :class="[
                    'status-btn',
                    { active: selectedRdv.status === 'à venir' },
                  ]"
                >
                  À venir
                </span>
                <span
                  :class="[
                    'status-btn',
                    { active: selectedRdv.status === 'terminé' },
                  ]"
                >
                  Terminé
                </span>
                <span
                  :class="[
                    'status-btn',
                    { active: selectedRdv.status === 'annulé' },
                  ]"
                >
                  Annulé
                </span>
              </div>
            </div>

            <div class="d-flex align-items-center gap-3 mb-3">
              <label class="form-label">Type de rendez-vous</label>
              <div class="typeRdv-btn">
                <span class="me-3">
                  {{
                    selectedRdv.type_rendez_vous === "Présentiel"
                      ? "Présentiel"
                      : "En ligne"
                  }}
                </span>
              </div>
            </div>

            <div class="d-flex align-items-center gap-3 mb-3">
              <label class="form-label">Consultation à distance</label>
              <div>
                <span class="me-3">
                  {{ selectedRdv.consultationDistance ? "Oui" : "Non" }}
                </span>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { getRendezVousPatient } from "@/services/rendezvousService";
import SidebaPatient from "@/components/SidebaPatient.vue";
import HeaderPatient from "@/components/HeaderPatient.vue";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import bootstrapBundleMin from "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Modal } from "bootstrap";

const rendezVous = ref([]);
const selectedRdv = ref(null);
const selectedFilter = ref("à venir");

const fetchRendezVous = async () => {
  const patientId = localStorage.getItem("patient_id");
  if (!patientId) {
    console.error("Aucun ID de patient trouvé dans le localStorage.");
    return;
  }
  try {
    const response = await getRendezVousPatient(patientId);
    if (response.data && Array.isArray(response.data)) {
      rendezVous.value = response.data; // Assurez-vous que ceci est bien rempli
      console.log("Rendez-vous stockés dans ref:", rendezVous.value);
    } else {
      console.error("Données de rendez-vous invalides:", response.data);
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des rendez-vous du patient:",
      error
    );
  }
};

// Filtrer les rendez-vous selon le statut sélectionné
const filteredRendezVous = computed(() => {
  return rendezVous.value.filter((rdv) => rdv.status == selectedFilter.value);
});

const formatDateTime = (date, heure) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const formattedDate = new Date(date).toLocaleDateString("fr-FR", options);
  return `${formattedDate} à ${heure}`;
};
const showDetails = (rdv) => {
  selectedRdv.value = { ...rdv }; // Copie les détails du rendez-vous dans `selectedRdv`
  const modalElement = document.getElementById("detailsModal");
  if (modalElement) {
    const modalInstance = new Modal(modalElement);
    modalInstance.show();
  }
};
onMounted(() => {
  fetchRendezVous();
});
</script>

<style scoped>
.section-content {
  width: 100%;
}

.section-container {
  padding: 0 48px;
}

.section-container .heading h1 {
  font-family: "Montserrat";
  font-size: 18px;
  color: #717171;
}

.section-container .heading .btn-rdv {
  color: white;
  text-decoration: none;
  background: #2980b9;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 16px;
}
/* Modal personnalisé pour qu'il glisse de droite à gauche */
.modal.right .modal-dialog {
  position: fixed;
  right: 0;
  top: 0;
  margin: 0;
  width: 35%; /* Largeur de 1/4 de l'écran */
  height: 100%;
  transition: transform 0.3s ease-in-out;
}

.modal.right .modal-content {
  height: 100%;
  border: 0;
  border-radius: 0;
}

.modal.right.fade .modal-dialog {
  transform: translateX(100%);
}

.modal.right.fade.show .modal-dialog {
  transform: translateX(0);
}

.modal-1-4 {
  max-width: 35vw; /* Largeur du modal à 1/4 de l'écran */
}

.modal-header {
  border-radius: 0;
  background-color: #2980b9; /* Couleur de fond du header */
  color: white; /* Couleur du texte dans le header */
}

.modal-header .btn-close .btn-primary {
  background-color: #007bff; /* Couleur de fond du bouton primaire */
}

.btn-secondary {
  background-color: #6c757d; /* Couleur de fond du bouton secondaire */
}

.modal-body .header-icon {
  width: 24px;
  height: 24px;
}

.modal-body .head-input {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* barre de navigation */
.filter-bar {
  margin-bottom: 20px;
} /* Modal personnalisé pour qu'il glisse de droite à gauche */
.modal.right .modal-dialog {
  position: fixed;
  right: 0;
  top: 0;
  margin: 0;
  width: 35%; /* Largeur de 1/4 de l'écran */
  height: 100%;
  transition: transform 0.3s ease-in-out;
}

.modal.right .modal-content {
  height: 100%;
  border: 0;
  border-radius: 0;
}

.modal.right.fade .modal-dialog {
  transform: translateX(100%);
}

.modal.right.fade.show .modal-dialog {
  transform: translateX(0);
}

.modal-1-4 {
  max-width: 35vw; /* Largeur du modal à 1/4 de l'écran */
}

.modal-header {
  border-radius: 0;
  background-color: #2980b9; /* Couleur de fond du header */
  color: white; /* Couleur du texte dans le header */
}

.modal-header .btn-close .btn-primary {
  background-color: #007bff; /* Couleur de fond du bouton primaire */
}

.btn-secondary {
  background-color: #6c757d; /* Couleur de fond du bouton secondaire */
}

.modal-body .header-icon {
  width: 24px;
  height: 24px;
}

.modal-body .head-input {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* barre de navigation */
.filter-bar {
  margin-bottom: 20px;
}

.filter-bar .nav-tabs .nav-link {
  cursor: pointer;
  padding: 8px 85px;
  color: black;
}
/* Modal personnalisé pour qu'il glisse de droite à gauche */
.modal.right .modal-dialog {
  position: fixed;
  right: 0;
  top: 0;
  margin: 0;
  width: 35%; /* Largeur de 1/4 de l'écran */
  height: 100%;
  transition: transform 0.3s ease-in-out;
}

.modal.right .modal-content {
  height: 100%;
  border: 0;
  border-radius: 0;
}

.modal.right.fade .modal-dialog {
  transform: translateX(100%);
}

.modal.right.fade.show .modal-dialog {
  transform: translateX(0);
}

.modal-1-4 {
  max-width: 35vw; /* Largeur du modal à 1/4 de l'écran */
}

.modal-header {
  border-radius: 0;
  background-color: #2980b9; /* Couleur de fond du header */
  color: white; /* Couleur du texte dans le header */
}

.modal-header .btn-close .btn-primary {
  background-color: #007bff; /* Couleur de fond du bouton primaire */
}

.btn-secondary {
  background-color: #6c757d; /* Couleur de fond du bouton secondaire */
}

.modal-body .header-icon {
  width: 24px;
  height: 24px;
}

.modal-body .head-input {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* barre de navigation */
.filter-bar {
  margin-bottom: 20px;
}

.filter-bar .nav-tabs .nav-link {
  cursor: pointer;
  padding: 8px 85px;
  color: black;
}

.filter-bar .nav-tabs .nav-link.active {
  background-color: #2980b9;
  color: white;
}
.filter-bar .nav-tabs .nav-link.active {
  background-color: #2980b9;
  color: white;
}

.filter-bar .nav-tabs .nav-link {
  cursor: pointer;
  padding: 8px 85px;
  color: black;
}

.filter-bar .nav-tabs .nav-link.active {
  background-color: #2980b9;
  color: white;
}
.section-container .rdv-heading {
  border-bottom: 1px solid #2980b9;
  margin-bottom: 30px;
}

.section-container .rdv-heading .active {
  background: #2980b9;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.section-container .rdv-heading h2 {
  font-size: 16px;
  font-family: "Montserrat";
  cursor: pointer;
}

.rdv-section .rendezvous .rdv-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-shadow: 0 0 6px #297fb938;
  border-radius: 8px;
  padding: 18px 30px;
}

.rdv-section .rdv-item img {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 50%;
}

.rdv-section .rdv-item h3 {
  margin: 0;
  font-size: 18px;
}

.rdv-section .rdv-item .btn-detail {
  color: #2980b9;
  text-decoration: none;
  font-weight: bold;
}

/* Modal personnalisé pour qu'il glisse de droite à gauche */
.modal.right .modal-dialog {
  position: fixed;
  right: 0;
  top: 0;
  margin: 0;
  width: 35%; /* Largeur de 1/4 de l'écran */
  height: 100%;
  transition: transform 0.3s ease-in-out;
}

.modal.right .modal-content {
  height: 100%;
  border: 0;
  border-radius: 0;
}

.modal.right.fade .modal-dialog {
  transform: translateX(100%);
}

.modal.right.fade.show .modal-dialog {
  transform: translateX(0);
}

.modal-1-4 {
  max-width: 35vw; /* Largeur du modal à 1/4 de l'écran */
}

.modal-header {
  border-radius: 0;
  background-color: #2980b9; /* Couleur de fond du header */
  color: white; /* Couleur du texte dans le header */
}

.modal-header .btn-close .btn-primary {
  background-color: #007bff; /* Couleur de fond du bouton primaire */
}

.btn-secondary {
  background-color: #6c757d; /* Couleur de fond du bouton secondaire */
}

.modal-body .header-icon {
  width: 24px;
  height: 24px;
}

.modal-body .head-input {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-body .status-buttons .status-btn {
  padding: 12px 19px;
  border-radius: 4px;
  font-weight: 500;
}

.modal-body .typeRdv-btn {
  padding: 10px 17px;
  background: #2980b9;
  border-radius: 4px;
  color: white;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* barre de navigation */
.filter-bar {
  margin-bottom: 20px;
}

.filter-bar .nav-tabs .nav-link {
  cursor: pointer;
  padding: 8px 85px;
  color: black;
}

.filter-bar .nav-tabs .nav-link.active {
  background-color: #2980b9;
  color: white;
}
</style>
