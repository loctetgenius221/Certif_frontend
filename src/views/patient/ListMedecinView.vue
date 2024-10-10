<template>
  <div class="d-flex">
    <SidebaPatient />
    <div class="section-content">
      <HeaderPatient />
      <div class="section-container">
        <button @click="goBack" class="btn btn-retour">
          <i class="bi bi-arrow-left-short"></i>Retour
        </button>
        <h2>Services</h2>
        <div class="service-content mb-5">
          <div class="scroll-container">
            <button class="btn btn-danger me-2">Neurologie</button>
            <button class="btn btn-danger me-2">Psychiatrie</button>
            <button class="btn btn-danger me-2">Cardiologie</button>
            <button class="btn btn-danger me-2">Pneumologie</button>
            <button class="btn btn-danger me-2">Cardiologie</button>
            <button class="btn btn-danger me-2">Cardiologie</button>
            <button class="btn btn-danger me-2">Cardiologie</button>
            <button class="btn btn-danger me-2">Cardiologie</button>
            <button class="btn btn-danger me-2">Cardiologie</button>
            <button class="btn btn-danger me-2">Cardiologie</button>
            <button class="btn btn-danger me-2">Cardiologie</button>
            <button class="btn btn-danger me-2">Cardiologie</button>
          </div>
        </div>

        <h2>Médecins</h2>
        <div class="row">
          <div
            class="col-md-3 mb-4"
            v-for="(medecin, index) in medecins"
            :key="index"
          >
            <div class="card text-center">
              <div class="card-body">
                <img
                  :src="medecin.image"
                  class="img-fluid rounded-circle mb-2"
                  alt="Médecin"
                />
                <h5 class="card-title">{{ medecin.nom }}</h5>
                <p class="card-text">{{ medecin.specialite }}</p>
                <router-link :to="{ name: 'RdvForm' }">prendre rendez-vous</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import SidebaPatient from "@/components/SidebaPatient.vue";
import HeaderPatient from "@/components/HeaderPatient.vue";
// import "@/assets/css/Patient/ListMedecinView.css";

// Exemple de données des médecins
const medecins = [
  {
    nom: "Dr Marème Thiaw",
    specialite: "Spécialité 1",
    image: "https://via.placeholder.com/150",
  },
  {
    nom: "Dr Marème Thiaw",
    specialite: "Spécialité 2",
    image: "https://via.placeholder.com/150",
  },
  {
    nom: "Dr Marème Thiaw",
    specialite: "Spécialité 3",
    image: "https://via.placeholder.com/150",
  },
  {
    nom: "Dr Marème Thiaw",
    specialite: "Spécialité 4",
    image: "https://via.placeholder.com/150",
  },
  {
    nom: "Dr Marème Thiaw",
    specialite: "Spécialité 4",
    image: "https://via.placeholder.com/150",
  },
  // Ajouter d'autres médecins ici...
];
const router = useRouter();

const goBack = () => {
  router.go(-1);
};
</script>

<style scoped>
.card {
  border: 1px solid #2980B9;
  border-radius: 10px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
}

.img-fluid {
  width: 100px;
  height: 100px;
}
.img-fluid {
  width: 100px;
  height: 100px;
}

.section-container h2 {
  font-size: 18px;
  color: #717171;
}

.section-container .btn-danger {
  background: #F1948A;
  border: none;
  padding: 45px 77px;
  font-size: 18px;
  font-weight: bold;
}
.section-content {
  overflow-x: hidden;
}

/* Scroll */
.service-content {
  width: 100%; /* Prend la largeur disponible */
  overflow: hidden; /* Évite que le contenu dépasse la largeur de la page */
}

.scroll-container {
  display: flex;
  overflow-x: auto; /* Seul cette section défile horizontalement */
  white-space: nowrap; /* Garde les éléments sur une seule ligne */
  padding-bottom: 10px; /* Ajoute un peu d'espace en bas */
}

.scroll-container::-webkit-scrollbar {
  height: 6px; /* Hauteur de la barre de défilement */
}

.scroll-container::-webkit-scrollbar-thumb {
  background-color: #ccc; /* Couleur de la barre de défilement */
  border-radius: 10px; /* Coins arrondis */
}

.scroll-container::-webkit-scrollbar-track {
  background: transparent; /* Couleur du fond de la barre */
}

.btn-retour {
  padding: 0;
  text-decoration: underline;
  text-decoration-color: #2980b9;
}
</style>
