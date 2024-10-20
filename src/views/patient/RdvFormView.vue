<template>
  <div class="wrapper d-flex">
    <SidebaPatient />
    <div class="section-content">
      <HeaderPatient />
      <div class="section-container">
        <button @click="goBack" class="btn btn-retour">
          <i class="bi bi-arrow-left-short"></i>Retour
        </button>
        <h1>Prendre un rendez-vous</h1>
        <div class="info-medecin">
          <img
            :src="photoProfil ? photoProfil : '/image/icone-profil-defaut.png'"
            alt="Photo du médecin"
          />
          <div class="info-txt">
            <h2>Dr {{ prenom }} {{ nom }}</h2>
            <h4>{{ specialite }}</h4>
          </div>
        </div>

        <div class="form_section mb-5">
          <form @submit.prevent="planifierRendezVous">
            <div class="plage-horraire mb-4">
              <h2 class="mb-3">Sélectionner une plage horaire :</h2>
              <div
                v-if="plagesHoraires.length === 0"
                class="no-plage-disponible"
              >
                <p>Aucune plage horaire disponible pour cette date.</p>
              </div>
              <div v-else class="plage-items">
                <div
                  v-for="plage in plagesHoraires"
                  :key="plage.id"
                  class="plage"
                  @click="!plage.disabled && selectPlage(plage)"
                  :class="{ disabled: plage.disabled }"
                >
                  <h3>{{ plage.formattedTime }}</h3>
                </div>
              </div>
            </div>

            <div class="info-sup mb-5">
              <div class="d-flex flex-column mb-3">
                <label for="motif">Choisir un motif:</label>
                <select v-model="motif">
                  <option value="consultation">Consultation</option>
                  <option value="suivi">Suivi</option>
                </select>
              </div>
              <div class="d-flex flex-column mb-3">
                <label for="typeRendezVous"
                  >Choisir un type de rendez-vous:</label
                >
                <select v-model="typeRendezVous">
                  <option value="téléconsultation">En ligne</option>
                  <option value="présentiel">Présentiel</option>
                </select>
              </div>
            </div>
            <button class="btn" :disabled="!selectedPlage">
              Planifier mon rendez-vous
            </button>
            <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
            <p class="error-message" v-if="successMessage">
              {{ successMessage }}
            </p>
          </form>
          <div class="calendrier">
            <h2>Choisir une date :</h2>
            <CalendrierDisponibilite
              :medecin_id="medecinId"
              @plagesHoraires="updatePlagesHoraires"
            />
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
import { createRendezVous, updatePlageHoraireStatus } from "@/services/rendezvousService"; // Ajoutez ici l'importation de la nouvelle méthode
import Swal from 'sweetalert2'; // Importation de SweetAlert

const router = useRouter();
const route = useRoute();
const errorMessage = ref("");
const successMessage = ref("");

// Récupérer les informations du médecin depuis les paramètres de la route
const nom = route.query.nom || "Nom Inconnu";
const prenom = route.query.prenom || "Prénom Inconnu";
const specialite = route.query.specialite || "Spécialité Inconnue";
const photoProfil = route.query.photo_profil || "/image/portrait-3d-female-doctor.jpg";
const medecinId = ref(route.query.id || 1); // ID du médecin

// Champs du formulaire
const motif = ref("");
const typeRendezVous = ref("");
const plagesHoraires = ref([]);
const selectedPlage = ref(null); // Pour stocker la plage horaire sélectionnée

// Sélection d'une plage horaire
const selectPlage = (plage) => {
  if (!plage.disabled) {
    selectedPlage.value = plage;
    console.log("Plage horaire sélectionnée :", plage);
  }
};

// Mettre à jour les plages horaires en fonction de la date choisie
const updatePlagesHoraires = (plages) => {
  plagesHoraires.value = plages;
  const currentDate = new Date();
  plagesHoraires.value = plages.map(plage => {
    // Désactiver les plages horaires qui sont occupées ou dont la date est antérieure
    const plageDate = new Date(plage.date);
    plage.disabled = plage.status === "occupé" || plageDate < currentDate;
    return plage;
  });
};

// Fonction pour planifier un rendez-vous
const planifierRendezVous = async () => {
  errorMessage.value = "";
  successMessage.value = "";

  if (!selectedPlage.value) {
    errorMessage.value = "Veuillez sélectionner une plage horaire.";
    return;
  }

  // Préparer les données à envoyer au backend
  const rendezVousData = {
    plage_horaire_id: selectedPlage.value.id, // ID de la plage horaire
    date: selectedPlage.value.date, // Date de la réservation
    heure_debut: selectedPlage.value.heure_debut, // Heure de début formatée
    heure_fin: selectedPlage.value.heure_fin, // Heure de fin formatée
    type_rendez_vous: typeRendezVous.value, // Type de rendez-vous
    motif: motif.value, // Motif du rendez-vous
    medecin_id: route.query.id, // ID du médecin depuis les paramètres de la route
    patient_id: null, // À définir selon le rôle
    status: "à venir", // Statut par défaut
  };
  console.log("Données du formulaire: ", rendezVousData);

  // Déterminer l'ID du patient en fonction du rôle
  const patient = JSON.parse(localStorage.getItem("patient_id")); // Récupérer les infos de l'utilisateur depuis le localStorage
  console.log("Le user :", patient);
  rendezVousData.patient_id = patient; // Utiliser l'ID du patient

  // Vérification des champs requis
  if (
    !rendezVousData.date ||
    !rendezVousData.heure_debut ||
    !rendezVousData.heure_fin ||
    !rendezVousData.medecin_id ||
    !rendezVousData.patient_id
  ) {
    errorMessage.value = "Veuillez remplir tous les champs requis.";
    return;
  }

  // Afficher une boîte de confirmation
  const result = await Swal.fire({
    title: 'Confirmer le Rendez-vous',
    text: 'Êtes-vous sûr de vouloir confirmer ce rendez-vous ?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Oui, confirmer',
    cancelButtonText: 'Annuler',
  });

  if (result.isConfirmed) {
    try {
      const response = await createRendezVous(rendezVousData);
      console.log("Rendez-vous créé avec succès :", response);
      successMessage.value = "Rendez-vous créé avec succès !";

      // Mise à jour du statut de la plage horaire après la création du rendez-vous
      await updatePlageHoraireStatus(selectedPlage.value.id, "occupé"); // Mettre à jour le statut

      // Affiche un message de succès
      await Swal.fire({
        title: 'Rendez-vous confirmé !',
        text: 'Votre rendez-vous a été confirmé avec succès.',
        icon: 'success',
        confirmButtonText: 'Ok',
      });

      router.push("/Patient"); // Redirige vers la page des patients
    } catch (error) {
      console.error("Erreur lors de la création du rendez-vous :", error);

      // Affichage des erreurs détaillées à l'utilisateur
      if (error.response && error.response.data && error.response.data.errors) {
        errorMessage.value =
          "Erreur lors de la création du rendez-vous :\n" +
          Object.values(error.response.data.errors).flat().join("\n");
      } else {
        errorMessage.value =
          "Erreur lors de la création du rendez-vous. Veuillez réessayer.";
      }

      // Affiche un message d'erreur
      await Swal.fire({
        title: 'Erreur',
        text: errorMessage.value,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
}
.success {
  color: green;
}
.wrapper {
  width: 100%;
  padding: 0;
  margin: 0;
}

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
  width: auto;
  display: flex;
  gap: 25px;
}

.form_section form,
.form_section .calendrier {
  flex: 1;
  width: 50%;
  box-sizing: border-box;
}

.form_section .calendrier,
.form_section form .plage-horraire,
.form_section form .info-sup {
  box-shadow: 0 0 8px #297fb939;
  padding: 25px;
  border-radius: 8px;
}
.calendrier h2,
.form_section form .plage-horraire h2 {
  font-size: 18px;
  font-family: "Montserrat";
  color: #717171;
  margin-top: 10px;
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

.plage.disabled {
  background-color: #e0e0e0;
  color: #9e9e9e;
  cursor: not-allowed;
  border-color: #ccc;
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

.error-message {
  color: red;
}
</style>
