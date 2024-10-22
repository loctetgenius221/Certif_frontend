<template>
  <div class="medecin-dashboard d-flex">
    <SidebarMedecin/>
    <div class="section-container">
      <HeaderPatient />

      <div class="content-wrapper d-flex">
        <!-- Section des rendez-vous du médecin -->
        <div class="rendezvous-section me-4">
          <div class="heading d-flex justify-content-between mb-3">
            <h1>Mes rendez-vous</h1>
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
                    <h3 v-if="rdv.patient">
                      {{ rdv.patient.prenom }} {{ rdv.patient.nom }}
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

        <!-- Calendrier des rendez-vous -->
        <div class="calendar-section">
          <MonAgenda />
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
import SidebarMedecin from "@/components/SidebarMedecin.vue";
import MonAgenda from "@/components/MonAgenda.vue";
import HeaderPatient from "@/components/HeaderPatient.vue";
import { ref, onMounted, computed } from "vue";
import { getRendezVousMedecin } from "@/services/rendezvousService";
import { Modal } from "bootstrap";

const rendezVous = ref([]);
const selectedRdv = ref(null);
const selectedFilter = ref("à venir");


const fetchRendezVous = async () => {
  const medecinId = localStorage.getItem("medecin_id");
  if (!medecinId) {
    console.error("Aucun ID de médecin trouvé dans le localStorage.");
    return;
  }
  try {
    const response = await getRendezVousMedecin(medecinId);
    if (response.data && Array.isArray(response.data)) {
      rendezVous.value = response.data;
    } else {
      console.error("Données de rendez-vous invalides:", response.data);
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des rendez-vous du médecin:",
      error
    );
  }
};

const filteredRendezVous = computed(() => {
  return rendezVous.value.filter((rdv) => rdv.status === selectedFilter.value);
});

//
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
.main--content {
  position: sticky;
  top: 80px;
  left: 0;
  background: #fff;
  width: 100%;
  padding: 0.5rem 1rem;
}

/* .sidebar {
  position: ;
  top: 0;
  left: 0;
  bottom: 0;
  width: 110px;
  height: 100vh;
  padding: 0 1.7rem;
  color: #fff;
  overflow: hidden;
  transition: all 0.5s linear;
  background: #fff;
  box-shadow: 0px 10px 25px #297fb918;
  z-index: 5;
} */

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
.content-wrapper {
  display: flex;
  gap: 20px;
}

.rendezvous-section {
  width: 40%;
}

.rendezvous-section .heading h1 {
  font-size: 18px;
  color: #717171;
}

.calendar-section {
  width: 60%;
}

/*  */
/* barre de navigation */
.filter-bar {
  margin-bottom: 20px;
}

.filter-bar .nav-tabs .nav-link {
  cursor: pointer;
  padding: 8px 55px;
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
  padding: 8px 55px;
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
  font-size: 16px;
}

.rdv-section .rdv-item .btn-detail {
  color: #2980b9;
  text-decoration: none;
  font-weight: bold;
}

/* Modal */
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
  z-index: 100;
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
</style>
