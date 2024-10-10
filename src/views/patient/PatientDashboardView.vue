<template>
  <div class="d-flex">
    <SidebaPatient />
    <div class="section-content">
      <HeaderPatient />
      <div class="section-container">
        <div class="heading d-flex justify-content-between mb-3">
          <h1>Mes rendez-vous</h1>
          <router-link :to="{ name: 'ListeMedecin' }" class="btn-rdv">
            Prendre un rendez-vous
          </router-link>
        </div>
        <div class="rdv-section">
          <div class="rdv-heading row d-flex justify-content-around">
            <div
              class="active col-4 d-flex justify-content-center align-items-center p-2"
              @click="setActiveTab('upcoming')"
            >
              <h2 class="mb-0">À venir</h2>
            </div>
            <div
              class="col-4 d-flex justify-content-center align-items-center p-2"
              @click="setActiveTab('completed')"
            >
              <h2 class="mb-0">Complétés</h2>
            </div>
            <div
              class="col col-4 d-flex justify-content-center align-items-center p-2"
              @click="setActiveTab('cancelled')"
            >
              <h2>Annulés</h2>
            </div>
          </div>
          <div class="rendezvous">
            <div
              v-for="rdv in filteredRendezVous"
              :key="rdv.id"
              class="rdv-item mt-3"
            >
              <div class="d-flex align-items-center gap-5">
                <img src="../../../public/image/photo-profil.png" alt="" />
                <h3>{{ rdv.medecin_id }}</h3>
                <h3>{{ rdv.type_rendez_vous }}</h3>
                <h3>{{ new Date(rdv.date).toLocaleDateString() }}</h3>
                <h3>
                  {{ new Date(rdv.heure_debut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
                </h3>
              </div>
              <div>
                <router-link class="btn-detail" @click="showDetails(rdv)" to="">
                  Voir détails..
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal pour afficher les détails -->
      <div v-if="selectedRdv"
        class="modal right fade"
        id="detailsModal"
        tabindex="-1"
        aria-labelledby="detailsModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-1-4">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="detailsModalLabel">Rendez-vous</h5>
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
                  <img class="header-icon" src="../../../public/image/ant-design_user-outlined.svg" alt="" />
                  <label for="medecin" class="form-label">Médecin</label>
                  <input type="text" class="form-control" id="medecin" v-model="selectedRdv.medecin_id" readonly />
                </div>
                <div class="head-input mb-3">
                  <img class="header-icon" src="../../../public/image/carbon_time.svg" alt="" />
                  <label for="dateHeure" class="form-label">Date et Heure</label>
                  <input type="text" class="form-control" id="dateHeure" :value="formatDateTime(selectedRdv.date, selectedRdv.heure_debut)" readonly />
                </div>
                <div class="head-input mb-3">
                  <img class="header-icon" src="../../../public/image/fluent_location-48-regular.svg" alt="" />
                  <label for="localisation" class="form-label">Localisation</label>
                  <input type="text" class="form-control" id="localisation" :value="selectedRdv.lieu" readonly />
                </div>
              </div>
              <div class="d-flex align-items-center gap-3 mb-3">
                <label for="patient" class="form-label">Patient</label>
                <input type="text" class="form-control" id="patient" v-model="selectedRdv.patient_id" readonly />
              </div>
              <div class="d-flex align-items-center gap-3 mb-3">
                <label for="motif" class="form-label">Motif du rendez-vous</label>
                <input type="text" class="form-control" id="motif" v-model="selectedRdv.motif" readonly />
              </div>
              <div class="d-flex align-items-center gap-3 mb-3">
                <label for="status" class="form-label">Statut du rendez-vous</label>
                <select class="form-select" id="status" v-model="selectedRdv.status" readonly>
                  <option value="À venir">À venir</option>
                  <option value="Complété">Complété</option>
                  <option value="Annulé">Annulé</option>
                </select>
              </div>
              <div class="d-flex align-items-center gap-3 mb-3">
                <label class="form-label">Type de rendez-vous</label>
                <div>
                  <label class="me-3">
                    <input type="radio" name="typeRdv" value="Présentiel" v-model="selectedRdv.type_rendez_vous" />
                    Présentiel
                  </label>
                  <label>
                    <input type="radio" name="typeRdv" value="En ligne" v-model="selectedRdv.type_rendez_vous" />
                    En ligne
                  </label>
                </div>
              </div>
              <div class="d-flex align-items-center gap-3 mb-3">
                <label class="form-label">Consultation à distance</label>
                <div>
                  <label class="me-3">
                    <input type="checkbox" v-model="selectedRdv.consultationDistance" />
                    Oui
                  </label>
                  <label>
                    <input type="checkbox" v-model="selectedRdv.consultationDistance" />
                    Non
                  </label>
                </div>
              </div>
              <div class="d-flex align-items-center gap-3 mb-3">
                <label class="form-label">Emise de notifications</label>
                <div>
                  <label class="me-3">
                    <input type="checkbox" v-model="selectedRdv.notifications" />
                    Oui
                  </label>
                  <label>
                    <input type="checkbox" v-model="selectedRdv.notifications" />
                    Non
                  </label>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Annuler mon rendez-vous
              </button>
              <button type="button" class="btn btn-primary">Modifier mon rendez-vous</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"; // Ajout de computed
import { getRendezVousList } from "@/services/rendezvousService";
import SidebaPatient from "@/components/SidebaPatient.vue";
import HeaderPatient from "@/components/HeaderPatient.vue";
// import "@/assets/css/Patient/PatientDashboardView.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import bootstrapBundleMin from "bootstrap/dist/js/bootstrap.bundle.min.js";

const rendezVousList = ref([]);
const activeTab = ref('upcoming'); // Tab for upcoming, completed, or cancelled
const selectedRdv = ref(null); // Déclaration de selectedRdv

const fetchRendezVous = async () => {
  try {
    const allRendezVous = await getRendezVousList();
    console.log("Données récupérées:", allRendezVous); // Vérifie ce qui est retourné

    // Vérifie si allRendezVous est un tableau
    if (!Array.isArray(allRendezVous)) {
      throw new TypeError("Les données récupérées ne sont pas un tableau.");
    }

    const patientId = localStorage.getItem("patient_id"); // Récupérer l'ID du patient
    if (!patientId) {
      console.error("Aucun ID de patient trouvé dans le localStorage.");
      return; // Gérer le cas où l'ID du patient n'est pas disponible
    }

    // Filtrer les rendez-vous pour ne garder que ceux qui appartiennent au patient
    rendezVousList.value = allRendezVous.filter(rdv => rdv.patient_id === patientId);
  } catch (error) {
    console.error("Erreur lors de la récupération des rendez-vous:", error);
  }
};



const setActiveTab = (tab) => {
  activeTab.value = tab;
};

const filteredRendezVous = computed(() => {
  if (activeTab.value === 'upcoming') {
    return rendezVousList.value.filter(rdv => rdv.status === "À venir");
  } else if (activeTab.value === 'completed') {
    return rendezVousList.value.filter(rdv => rdv.status === "Complété");
  } else {
    return rendezVousList.value.filter(rdv => rdv.status === "Annulé");
  }
});

// Formatage de la date et de l'heure
const formatDateTime = (date, heure) => {
  const formattedDate = new Date(date).toLocaleDateString();
  const formattedTime = new Date(heure).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return `${formattedDate} à ${formattedTime}`;
};

const showDetails = (rdv) => {
  selectedRdv.value = rdv; // Récupération des détails du rendez-vous
  const modal = new bootstrapBundleMin.Modal(document.getElementById('detailsModal'));
  modal.show();
};

onMounted(fetchRendezVous); // Appel de la fonction pour charger les rendez-vous
</script>

<style scoped>
.section-content {
  width: 100%;
}

.section-container {
  padding: 0 48px;
}

.section-container .heading h1{
  font-family: 'Montserrat';
  font-size: 18px;
  color: #717171;
}

.section-container .heading .btn-rdv {
  color: white;
  text-decoration: none;
  background: #2980B9;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 16px;
}

.section-container .rdv-heading {
  border-bottom: 1px solid #717171;
  margin-bottom: 30px;
}

.section-container .rdv-heading .active{
  background: #2980B9;
  border-radius: 8px;
}

.section-container .rdv-heading h2 {
  font-size: 16px;
  font-family: 'Montserrat';
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

.rdv-section .rdv-item  .btn-detail{
  color: #2980B9;
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
  background-color: #2980B9; /* Couleur de fond du header */
  color: white; /* Couleur du texte dans le header */
}

.modal-header .btn-close

.btn-primary {
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