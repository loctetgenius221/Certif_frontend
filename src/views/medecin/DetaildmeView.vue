<template>
  <div class="medecin-dashboard d-flex">
    <div class="sidebar">
      <div class="logo"></div>
      <ul class="menu">
        <li class="active">
          <a class="active" href="#">
            <i class="far fa-calendar-check"></i>
            <span
              ><router-link :to="{ name: 'Medecin' }"
                >Rendez-vous</router-link
              ></span
            >
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fas fa-folder-open"></i>
            <span
              ><router-link :to="{ name: 'DossierMédicalMedecin' }"
                >Dossiers Médicales</router-link
              ></span
            >
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fas fa-stethoscope"></i>
            <span
              ><router-link :to="{ name: 'ConsultationMedecin' }"
                >Consultations</router-link
              ></span
            >
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fas fa-user"></i>
            <span
              ><router-link :to="{ name: 'ProfilMedecin' }"
                >Profil</router-link
              ></span
            >
          </a>
        </li>
        <li class="logout">
          <a href="#">
            <i class="fas fa-sign-out-alt"></i>
            <span @click="logout">Deconnexion</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="main--content">
      <div class="header--wrapper">
        <div class="header--title">
          <div class="search--box">
            <i class="fa-solid fa-search"></i>
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <div class="user--info">
          <i class="fas fa-bell"></i>
          <div class="d-flex align-items-center gap-2">
            <img
              src="../../../public/image/photo-profil.png"
              alt="photo de profil"
            />
            <div>
              <h4 class="m-0 p-0">Marème Thiaw</h4>
              <p class="m-0 p-0">Medecin</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Contenu ici -->
      <div class="detail-section">
        <!-- Vérifier si le dossier médical existe -->
        <div class="section-container mb-5" v-if="dossier">
          <h1>Détail du dossier médical</h1>
          <div class="dossier-content">
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
                <form action="" method="" enctype="multipart/form-data">
                  <div class="form-group">
                    <div class="drag-drop-area" id="drop-zone">
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
  </div>
</template>

<script setup>
// import "@/assets/css/Medecin/DetaildmeView.css";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getDossierMedical } from "@/services/dossiermedicalService"; // Assure-toi que cette fonction est bien définie dans ce fichier
import router from "@/router";

// Déclaration des variables réactives
const dossier = ref(null);
const documents = ref([]);
const patient = ref(null);
const route = useRoute();

// Fonction pour récupérer le dossier médical
const fetchDossierMedical = async () => {
  const dossierId = route.params.id; // Récupérer l'ID du dossier médical depuis l'URL
  try {
    // Appel de la fonction du service pour récupérer les données
    const response = await getDossierMedical(dossierId);
    dossier.value = response.data; // Assigner les données du dossier
    documents.value = dossier.value.documents;
    patient.value = response.data.patient; // Assigner les informations du patient
  } catch (error) {
    console.error("Erreur lors de la récupération du dossier médical:", error);
  }
};

// Appel de la fonction lors du montage du composant
onMounted(() => {
  fetchDossierMedical();
});

// Fonction de déconnexion
const logout = () => {
  localStorage.removeItem("token"); // Supprimer le token
  router.push({ name: "Connexion" }); // Redirection vers la page de connexion
};
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
