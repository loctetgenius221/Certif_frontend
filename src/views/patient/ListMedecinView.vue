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
import "@/assets/css/Patient/ListMedecinView.css";

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
.btn-retour {
  padding: 0;
  text-decoration: underline;
  text-decoration-color: #2980b9;
}
</style>
