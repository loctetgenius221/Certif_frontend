<template>
  <div class="d-flex">
    <SidebaPatient />
    <div class="section-content">
      <HeaderPatient />
      <div class="section-container">
        <button @click="goBack" class="btn btn-retour"><i class="bi bi-arrow-left-short"></i>Retour</button>
        <h1>Prendre un rendez-vous</h1>
        <div class="info-medecin">
          <img :src="photoProfil ? photoProfil : '/image/icone-profil-defaut.png'" alt="Photo du médecin" />
          <div class="info-txt">
            <h2>Dr {{ prenom }} {{ nom }}</h2>
            <h4>{{ specialite }}</h4>
          </div>
        </div>

        <div class="form_section mb-5">
          <form @submit.prevent="planifierRendezVous">
            <div class="plage-horraire mb-4">
              <h2 class="mb-3">Sélectionner une plage horaire :</h2>
              <div class="plage-items">
                <div v-for="plage in plagesHoraires" :key="plage.id" class="plage" @click="selectPlage(plage)">
                  <h3>{{ plage.heure_debut }} - {{ plage.heure_fin }}</h3>
                </div>
              </div>
            </div>
            <div class="info-sup mb-5">
              <div class="d-flex flex-column mb-3">
                <label for="motif">Choisir un motif:</label>
                <input type="text" placeholder="Motif du rendez-vous" />
              </div>
              <div class="d-flex flex-column mb-3">
                <label for="motif">Choisir un type de rendez-vous:</label>
                <select name="" id="">
                  <option value="">En ligne</option>
                  <option value="">Présentiel</option>
                </select>
              </div>
            </div>
            <button class="btn">Planifier mon rendez-vous</button>
          </form>
          <div class="calendrier">
            <h2>Choisir une date :</h2>
            <CalendrierDisponibilite :medecin_id="medecinId" @plagesHoraires="updatePlagesHoraires" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import SidebaPatient from "@/components/SidebaPatient.vue";
import HeaderPatient from "@/components/HeaderPatient.vue";
import CalendrierDisponibilite from "@/components/CalendrierDisponibilite.vue";
const router = useRouter();
const route = useRoute();

// Récupérer les informations du médecin depuis les paramètres de la route
const nom = route.query.nom || 'Nom Inconnu';
const prenom = route.query.prenom || 'Prénom Inconnu';
const specialite = route.query.specialite || 'Spécialité Inconnue';
const photoProfil = route.query.photo_profil || '../../../public/image/portrait-3d-female-doctor.jpg';
const medecinId = ref(route.query.medecin_id || 1);  // ID du médecin

// Champs du formulaire
const motif = ref('');
const typeRendezVous = ref('');
const plagesHoraires = ref([]);


// Sélection d'une plage horaire
const selectPlage = (plage) => {
  console.log("Plage horaire sélectionnée :", plage);
};

// Mettre à jour les plages horaires en fonction de la date choisie
const updatePlagesHoraires = (plages) => {
  plagesHoraires.value = plages;
};

// Planifier le rendez-vous
const planifierRendezVous = () => {
  // Logique pour planifier le rendez-vous ici
  console.log("Motif :", motif.value);
  console.log("Type de rendez-vous :", typeRendezVous.value);
};

const goBack = () => {
  router.go(-1);
};
</script>

<style scoped>

.section-container h1 {
  font-size: 18px;
  font-family: "Montserrat";
  color: #717171;
  margin-top: 10px;
}

.info-medecin {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 25px;
  border: 1px solid #2980b9;
  box-shadow: 0 0 8px #297fb97a;
  border-radius: 8px;
  padding: 35px 65px;
  margin-bottom: 25px;
}

.info-medecin img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.info-medecin .info-txt h2 {
  font-size: 20px;
  color: black;
  margin: none;
}

.info-medecin .info-txt h4 {
  font-size: 18px;
  color: black;
  opacity: 0.8;
  margin: none;
}

.form_section {
  display: flex;
  gap: 25px;
}

.form_section form,
.form_section .calendrier {
  flex: 1;
}

.form_section .calendrier,
.form_section form .plage-horraire,
.form_section form .info-sup {
  box-shadow: 0 0 8px #297fb939;
  padding: 25px;
  border-radius: 8px;
}

.form_section form .plage-items {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.form_section form .plage {
  padding: 16px 30px;
  border: 1px solid #717171;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s all ease;
}

.form_section form .plage:hover {
  background: #2980b9;
  color: white;
  border: none;
}

.form_section form .plage h3 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 0;
}

.form_section form .info-sup label {
  font-weight: 500;
  font-size: 18px;
  color: #717171;
  margin-bottom: 5px;
}

.form_section form .info-sup input,
.form_section form .info-sup select {
  padding: 15px 24px;
  border-radius: 4px;
  border: 1px solid #717171;
  outline-color: #2980b9;
  background: none;
}

.form_section form .btn {
  background: #2980b9;
  color: white;
  font-weight: bold;
  padding: 10px 15px;
}

.btn-retour {
  padding: 0;
  text-decoration: underline;
  text-decoration-color: #2980b9;
}
</style>
