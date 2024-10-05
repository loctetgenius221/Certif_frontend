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
import {handleError, onMounted, ref} from "vue"
import { useRoute } from "vue-router";
import router from "@/router";
import { getConsultation } from "@/services/consultationService";


const consultation = ref([null]);
const rendezvous = ref([null]);
const route = useRoute()

const fetchConsultation = async () => {

  const consultationId = route.params.id;
  try {
    const response = await getConsultation(consultationId);
    consultation.value = response.data;
    rendezvous.value = response.data.rendezvous;
    console.log(consultation.value)
  } catch (error) {
    handleError(error)
  }
}

// Appel à la fonction lors du montage du composant
onMounted (() => {
  fetchConsultation();
});

const logout = () => {
  localStorage.removeItem("token");
  router.push({ name: "connexion" });
}
</script>