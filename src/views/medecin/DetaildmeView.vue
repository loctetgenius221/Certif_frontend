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
        <h1>Détail du dossier médical</h1>

        <!-- Vérifier si le dossier médical existe -->
        <div class="detail-content" v-if="dossier">
          <!-- Affichage des antécédents médicaux et des traitements -->
          <div class="info-patient">
            <div>
              <h3>Antécédents médicaux</h3>
              <p>{{ dossier.antecedents_medicaux }}</p>
            </div>
            <div>
              <h3>Traitements actuels</h3>
              <p>{{ dossier.traitements }}</p>
            </div>
            <div>
              <h3>Interventions chirurgicales:</h3>
              <p>{{ dossier.intervention_chirurgicale }}</p>
            </div>
            <div>
              <h3>Notes et observations:</h3>
              <p>{{ dossier.notes_observations }}</p>
            </div>
            <div>
              <h3>Informations supplémentaires:</h3>
              <p>{{ dossier.info_sup }}</p>
            </div>
            
          </div>

          <!-- Informations générales sur le dossier médical -->
          <div class="info-general">
            <div class="d-flex flex-column align-items-center gap-3 mb-3">
              <img
                src="../../../public/image/photo-profil.png"
                alt="photo du patient"
              />
              <h3>Infos Générales</h3>
            </div>
            <div>
              <p><strong>Numéro DME:</strong> {{ dossier.numero_dme }}</p>
              <p>
                <strong>Date de création:</strong> {{ dossier.date_creation }}
              </p>
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
import "@/assets/css/Medecin/DetaildmeView.css";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getDossierMedical } from "@/services/dossiermedicalService"; // Assure-toi que cette fonction est bien définie dans ce fichier
import router from "@/router";

// Déclaration des variables réactives
const dossier = ref(null);
const patient = ref(null);
const route = useRoute();

// Fonction pour récupérer le dossier médical
const fetchDossierMedical = async () => {
  const dossierId = route.params.id; // Récupérer l'ID du dossier médical depuis l'URL
  try {
    // Appel de la fonction du service pour récupérer les données
    const response = await getDossierMedical(dossierId);
    dossier.value = response.data; // Assigner les données du dossier
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

<style>


</style>