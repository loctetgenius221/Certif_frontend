<template>
  <div class="medecin-dashboard d-flex">
    <SidebarMedecin />
    <div class="section-content">
      <HeaderPatient />

      <!-- Contenu ici -->
      <div class="detail-section">
        <!-- Vérifier si le dossier médical existe -->
        <div class="section-container mb-5" v-if="dossier">
          <h1>Détail du dossier médical</h1>
          <div class="dossier-content">
            <div class="info-medeicale">
              <div class="mb-4">
                <div class="d-flex align-items-center justify-content-between">
                  <h2>Antécédents médicaux</h2>
                  <button
                    class="btn btn-primary btn-sm"
                    @click="openModal('antecedent')"
                  >
                    <i class="bi bi-plus-lg"></i> Ajouter
                  </button>
                </div>
                <div  v-if="dossier.antecedents_medicaux">
                  <ul>
                    <li
                      v-for="(
                        antecedent, index
                      ) in dossier.antecedents_medicaux"
                      :key="index"
                    >
                      {{ antecedent }}
                    </li>
                  </ul>
                </div>
              </div>
              <div class="mb-4">
                <div class="d-flex align-items-center justify-content-between">
                  <h2>Traitements médicaux</h2>
                  <button
                    class="btn btn-primary btn-sm"
                    @click="openModal('traitement')"
                  >
                    <i class="bi bi-plus-lg"></i> Ajouter
                  </button>
                </div>
                <div v-if="dossier.traitements && dossier.traitements.length">
                  <div
                    v-for="traitement in dossier.traitements"
                    :key="traitement.id"
                    class="traitement-item"
                  >
                    <p><strong>Médicament :</strong> {{ traitement.nom }}</p>
                    <p><strong>Dosage :</strong> {{ traitement.dosage }}</p>
                    <p>
                      <strong>Date début :</strong> {{ traitement.date_debut }}
                    </p>
                    <p><strong>Date fin :</strong> {{ traitement.date_fin }}</p>
                    <p>
                      <strong>Prescripteur :</strong>
                      {{ traitement.prescripteur }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="mb-4">
                <div class="d-flex align-items-center justify-content-between">
                  <h2>Note d'observations</h2>
                  <button
                    class="btn btn-primary btn-sm"
                    @click="openModal('note_observation')"
                  >
                    <i class="bi bi-plus-lg"></i> Ajouter
                  </button>
                </div>
                <div
                  v-if="
                    dossier.notes_observations &&
                    dossier.notes_observations.length
                  "
                >
                  <ul>
                    <li
                      v-for="(note, index) in dossier.notes_observations"
                      :key="index"
                    >
                      {{ note }}
                    </li>
                  </ul>
                </div>
              </div>

              <div class="mb-4">
                <div class="d-flex align-items-center justify-content-between">
                  <h2>Interventions chirurgicales</h2>
                  <button
                    class="btn btn-primary btn-sm"
                    @click="openModal('intervention')"
                  >
                    <i class="bi bi-plus-lg"></i> Ajouter
                  </button>
                </div>
                <div
                  v-if="
                    dossier.intervention_chirurgicale &&
                    dossier.intervention_chirurgicale.length
                  "
                >
                  <ul>
                    <li
                      v-for="(
                        intervention, index
                      ) in dossier.intervention_chirurgicale"
                      :key="index"
                    >
                      {{ intervention }}
                    </li>
                  </ul>
                </div>
              </div>

              <div class="mb-4">
                <div class="d-flex align-items-center justify-content-between">
                  <h2>Informations supplémentaires</h2>
                  <button
                    class="btn btn-primary btn-sm"
                    @click="openModal('information_sup')"
                  >
                    <i class="bi bi-plus-lg"></i> Ajouter
                  </button>
                </div>
                <div v-if="dossier.info_sup && dossier.info_sup.length">
                  <ul>
                    <li v-for="(info, index) in dossier.info_sup" :key="index">
                      {{ info }}
                    </li>
                  </ul>
                </div>
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
                <p>
                  Prénom: <strong>{{ patient.user.prenom }}</strong>
                </p>
                <p>
                  Nom: <strong>{{ patient.user.nom }}</strong>
                </p>
                <p>
                  Numéro de dossier: <strong>{{ dossier.numero_dme }}</strong>
                </p>
                <p>
                  Date de naissance:
                  <strong>{{ patient.user.dateNaissance }}</strong>
                </p>
                <p>
                  Contact: <strong>{{ patient.user.telephone }}</strong>
                </p>
                <p>
                  Email: <strong>{{ patient.user.email }}</strong>
                </p>
                <p>
                  Adresse: <strong>{{ patient.user.adresse }}</strong>
                </p>
                <p>
                  Numéro patient: <strong>{{ patient.numero_patient }}</strong>
                </p>
                <p>
                  Contact d'urgence:
                  <strong>{{ patient.numero_urgence }}</strong>
                </p>
              </div>
            </div>
          </div>
          <div>
            <!-- Documents Section -->
            <div class="document-content d-flex mb-5">
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
                        {{ document.type_document }} -
                        {{ document.upload_date }}
                      </a>
                    </p>
                  </div>
                </div>
                <div v-else>
                  <p>Aucun document disponible</p>
                </div>
              </div>
            </div>
            <div class="televerser-document">
              <h4 class="">Téléverser un document</h4>
              <div class="upload-container p-3">
                <form
                  @submit.prevent="handleFileUpload"
                  enctype="multipart/form-data"
                >
                  <div class="form-group mb-3">
                    <label for="type_document">Type de document :</label>
                    <input
                      type="text"
                      id="type_document"
                      v-model="type_document"
                      class="form-control"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <div
                      class="drag-drop-area"
                      id="drop-zone"
                      :class="{ 'border-success': isFileValid }"
                    >
                      <div class="icon">
                        <i class="bi bi-file-earmark"></i>
                      </div>
                      <p>Drag n Drop here</p>
                      <p>Or <span class="browse-link">Browse</span></p>
                      <input
                        type="file"
                        name="file"
                        id="file-upload"
                        class="file-input"
                        @change="onFileChange"
                        required
                      />
                    </div>
                  </div>
                  <button type="submit" class="btn btn-secondary mt-3">
                    Téléverser maintenant
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <!-- Chargement en cours -->
        <div v-else>
          <p>Chargement des données...</p>
        </div>
      </div>
    </div>
    <!-- Modal pour ajouter des informations -->
    <div
      class="modal fade"
      id="infoModal"
      tabindex="-1"
      aria-labelledby="infoModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-end">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="infoModalLabel">
              Ajouter {{ modalType }}
            </h5>
            <button
              type="button"
              class="btn-close"
              @click="closeModal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitForm">
              <div v-if="modalType === 'antecedent'">
                <div class="mb-3">
                  <label for="antecedent" class="form-label">Antécédent</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="newAntecedent"
                    required
                  />
                </div>
              </div>
              <div v-if="modalType === 'traitement'">
                <div class="mb-3">
                  <label for="medicament" class="form-label">Médicament</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="newTraitement.nom"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="dosage" class="form-label">Dosage</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="newTraitement.dosage"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="date_debut" class="form-label"
                    >Date de début</label
                  >
                  <input
                    type="date"
                    class="form-control"
                    v-model="newTraitement.date_debut"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="date_fin" class="form-label">Date de fin</label>
                  <input
                    type="date"
                    class="form-control"
                    v-model="newTraitement.date_fin"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="prescripteur" class="form-label"
                    >Prescripteur</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="newTraitement.prescripteur"
                    required
                  />
                </div>
              </div>
              <div v-if="modalType === 'note_observation'">
                <div class="mb-3">
                  <label for="note" class="form-label"
                    >Note d'observation</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="newNote"
                    required
                  />
                </div>
              </div>
              <div v-if="modalType === 'intervention'">
                <div class="mb-3">
                  <label for="note" class="form-label"
                    >Intervention chirurgicale :</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="newInterventation"
                    required
                  />
                </div>
              </div>
              <div v-if="modalType === 'information_sup'">
                <div class="mb-3">
                  <label for="note" class="form-label"
                    >Information supplementaire :</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="newInfosup"
                    required
                  />
                </div>
              </div>
              <button type="submit" class="btn btn-primary">Ajouter</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SidebarMedecin from "@/components/SidebarMedecin.vue";
import HeaderPatient from "@/components/HeaderPatient.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Swal from "sweetalert2"; // Importation de SweetAlert2
import {
  getDossierMedical,
  uploadDocumentByMedecin,
} from "@/services/dossiermedicalService";
import { updateDossierMedical } from "@/services/dossiermedicalService";
import bootstrapBundleMin from "bootstrap/dist/js/bootstrap.bundle.min";

// Déclaration des variables réactives
const dossier = ref(null);
const documents = ref([]);
const patient = ref(null);
const route = useRoute();
const file = ref(null);
const type_document = ref("");
const dossier_medical_id = ref(null);
const isFileValid = ref(false);
const modalType = ref(""); // Type de modal
const newAntecedent = ref(""); // Variable pour un nouvel antécédent
const newTraitement = ref({
  nom: "",
  dosage: "",
  date_debut: "",
  date_fin: "",
  prescripteur: "",
}); // Objet pour un nouveau traitement
const newNote = ref("");
const newInterventation = ref("");
const newInfosup = ref("");

// Fonction pour récupérer le dossier médical
const fetchDossierMedical = async () => {
  const dossierId = route.params.id;
  dossier_medical_id.value = dossierId;
  try {
    const response = await getDossierMedical(dossierId);
    dossier.value = response.data;
    documents.value = dossier.value.documents;
    patient.value = response.data.patient;
  } catch (error) {
    console.error("Erreur lors de la récupération du dossier médical:", error);
  }
};

// Ouvrir le modal
const openModal = (type) => {
  modalType.value = type;
  newAntecedent.value = ""; // Réinitialiser
  newTraitement.value = {
    nom: "",
    dosage: "",
    date_debut: "",
    date_fin: "",
    prescripteur: "",
  }; //
  newNote.value = "";
  newInterventation.value = "";
  newInfosup.value = "";
  const modal = new bootstrapBundleMin.Modal(
    document.getElementById("infoModal")
  );
  modal.show();
};

// Fermer le modal
const closeModal = () => {
  const modal = new bootstrapBundleMin.Modal(
    document.getElementById("infoModal")
  );
  modal.hide();
};

const submitForm = async () => {
  try {
    // Récupérer l'ancien dossier médical
    const oldData = await getDossierMedical(dossier_medical_id.value);
    let data = {};

    if (modalType.value === "antecedent") {
      // Vérifier si les données existantes sont une chaîne JSON ou un tableau
      let antecedents = [];
      try {
        antecedents = typeof oldData.data.antecedents_medicaux === 'string' 
          ? JSON.parse(oldData.data.antecedents_medicaux)
          : oldData.data.antecedents_medicaux || [];
      } catch (e) {
        antecedents = oldData.data.antecedents_medicaux 
          ? [oldData.data.antecedents_medicaux] 
          : [];
      }
      data = { 
        antecedents_medicaux: JSON.stringify([...antecedents, newAntecedent.value])
      };
    }
    else if (modalType.value === "traitement") {
      let traitements = [];
      try {
        traitements = typeof oldData.data.traitements === 'string'
          ? JSON.parse(oldData.data.traitements)
          : oldData.data.traitements || [];
      } catch (e) {
        traitements = oldData.data.traitements 
          ? [oldData.data.traitements] 
          : [];
      }
      data = { 
        traitements: JSON.stringify([...traitements, { ...newTraitement.value }])
      };
    }
    else if (modalType.value === "note_observation") {
      let notes = [];
      try {
        notes = typeof oldData.data.notes_observations === 'string'
          ? JSON.parse(oldData.data.notes_observations)
          : oldData.data.notes_observations || [];
      } catch (e) {
        notes = oldData.data.notes_observations 
          ? [oldData.data.notes_observations] 
          : [];
      }
      data = { 
        notes_observations: JSON.stringify([...notes, newNote.value])
      };
    }
    else if (modalType.value === "intervention") {
      let interventions = [];
      try {
        interventions = typeof oldData.data.intervention_chirurgicale === 'string'
          ? JSON.parse(oldData.data.intervention_chirurgicale)
          : oldData.data.intervention_chirurgicale || [];
      } catch (e) {
        interventions = oldData.data.intervention_chirurgicale 
          ? [oldData.data.intervention_chirurgicale] 
          : [];
      }
      data = { 
        intervention_chirurgicale: JSON.stringify([...interventions, newInterventation.value])
      };
    }
    else if (modalType.value === "information_sup") {
      let infos = [];
      try {
        infos = typeof oldData.data.info_sup === 'string'
          ? JSON.parse(oldData.data.info_sup)
          : oldData.data.info_sup || [];
      } catch (e) {
        infos = oldData.data.info_sup 
          ? [oldData.data.info_sup] 
          : [];
      }
      data = { 
        info_sup: JSON.stringify([...infos, newInfosup.value])
      };
    }

    await updateDossierMedical(dossier_medical_id.value, data);
    Swal.fire("Succès", "Mise à jour effectuée avec succès !", "success");

    closeModal();
    fetchDossierMedical();
  } catch (error) {
    console.error("Erreur lors de l'ajout:", error);
    Swal.fire("Erreur", "Une erreur est survenue lors de l'ajout.", "error");
  }
};
//
// Fonction pour gérer le changement de fichier
const onFileChange = (event) => {
  file.value = event.target.files[0];
  // Vérification si un fichier est sélectionné
  if (file.value) {
    isFileValid.value = true; // Si fichier sélectionné, rendre la validation vraie
  }
};

// Fonction pour gérer l'upload du fichier
const handleFileUpload = async () => {
  try {
    if (!file.value || !type_document.value) {
      alert(
        "Veuillez sélectionner un fichier et renseigner le type de document."
      );
      return;
    }

    // Appel du service pour l'upload du document
    const response = await uploadDocumentByMedecin(
      dossier_medical_id.value,
      type_document.value,
      file.value
    );
    console.log("Document ajouté avec succès:", response);

    // Affichage d'une alerte SweetAlert pour succès
    Swal.fire({
      icon: "success",
      title: "Succès",
      text: "Document téléversé avec succès !",
    });

    // Réinitialisation des champs après succès
    file.value = null;
    type_document.value = "";
    isFileValid.value = false; // Réinitialiser l'état de validation du fichier
    fetchDossierMedical();

  } catch (error) {
    console.error("Erreur lors de l'ajout du document:", error);
    alert("Erreur lors du téléversement du document.");
  }
};

// Appel de la fonction lors du montage du composant
onMounted(() => {
  fetchDossierMedical();
});
</script>

<style scoped>
.modal-dialog-end {
  transform: translateX(100%);
  transition: transform 0.3s ease;
}
.traitement-item {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}
ul {
  padding-left: 20px;
}
ul li {
  list-style-type: disc;
}
.border-success {
  border: 2px solid green;
}
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

/* ****************************** */
/*                                */
/* ****************************** */
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

.televerser-document h4 {
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

.document-content {
  gap: 25px;
  margin-top: 25px;
}

.televerser-document {
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

/* *************************** */
/*                             */
/* *************************** */

.detail-section h1 {
  font-family: "Montserrat";
  font-size: 18px;
}

.detail-section .detail-content {
  width: 100%;
  display: flex;
  gap: 2%;
}

.detail-section .detail-content .info-patient {
  flex-basis: 65%;
  box-shadow: 0 5px 13px #297fb918;
  padding: 24px;
}

.detail-section .detail-content .info-general {
  flex-basis: 35%;
  box-shadow: 0 5px 13px #297fb918;
  padding: 24px;
}

.detail-section .info-general img {
  width: 120px;
  height: 120px;
  object-fit: cover;
}

.detail-section .info-general h3 {
  font-size: 22px;
  font-family: "Montserrat";
}

.detail-section .info-general p {
  font-size: 18px;
}
</style>
