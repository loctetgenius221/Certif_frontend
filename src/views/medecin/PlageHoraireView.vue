<template>
  <div class="d-flex">
    <SidebarMedecin />
    <div class="section-content">
      <HeaderPatient />
      <div class="section-container">
        <button @click="goBack" class="btn btn-retour">
          <i class="bi bi-arrow-left-short"></i>Retour
        </button>
        <h1>Gestion des plages horaires</h1>

        <div class="form_section mb-5">
          <form @submit.prevent="ajouterPlageHoraire">
            <div class="plage-horaire mb-4">
              <h2 class="mb-3">Ajouter une nouvelle plage horaire :</h2>
              <div class="d-flex flex-column mb-3">
                <label for="date">Date :</label>
                <input
                  type="date"
                  v-model="nouvellePlage.date"
                  required
                  @change="chargerPlagesHoraires"
                />
                <span v-if="errors.date" class="text-danger">{{
                  errors.date
                }}</span>
              </div>
              <div class="d-flex flex-column mb-3">
                <label for="heure_debut">Heure de début :</label>
                <select v-model="nouvellePlage.heure_debut" required>
                  <option
                    v-for="heure in heuresDisponibles"
                    :key="heure"
                    :value="heure"
                  >
                    {{ heure }}
                  </option>
                </select>
                <span v-if="errors.heure_debut" class="text-danger">{{
                  errors.heure_debut
                }}</span>
              </div>
              <div class="d-flex flex-column mb-3">
                <label for="heure_fin">Heure de fin :</label>
                <select v-model="nouvellePlage.heure_fin" required>
                  <option
                    v-for="heure in heuresDisponibles"
                    :key="heure"
                    :value="heure"
                  >
                    {{ heure }}
                  </option>
                </select>
                <span v-if="errors.heure_fin" class="text-danger">{{
                  errors.heure_fin
                }}</span>
                <span v-if="errors.interval" class="text-danger">{{
                  errors.interval
                }}</span>
              </div>
              <div class="d-flex flex-column mb-3">
                <label for="recurrence">Récurrence :</label>
                <select v-model="nouvellePlage.recurrence">
                  <option value="unique">Unique</option>
                  <option value="quotidienne">Quotidienne</option>
                  <option value="hebdomadaire">Hebdomadaire</option>
                </select>
                <span v-if="errors.recurrence" class="text-danger">{{
                  errors.recurrence
                }}</span>
              </div>
            </div>
            <button class="btn" type="submit" :disabled="!formulaireValide">
              Ajouter la plage horaire
            </button>
          </form>

          <div class="calendrier">
            <h2>
              Plages horaires existantes pour le
              {{ formatDateFrench(nouvellePlage.date) }} :
            </h2>
            <div v-if="loading">Chargement...</div>
            <div v-else-if="error">{{ error }}</div>
            <div
              v-else-if="plagesHoraires.length === 0"
              class="no-plages-message"
            >
              Aucune plage horaire pour cette date.
            </div>
            <div v-else class="plages-list">
              <div
                v-for="plage in plagesHoraires"
                :key="plage.id"
                class="plage-item"
              >
                <p>{{ plage.heure_debut }} - {{ plage.heure_fin }}</p>
                <p>Récurrence : {{ plage.recurrence }}</p>
                <p>Statut : {{ plage.status }}</p>
                <button
                  @click="supprimerPlage(plage.id)"
                  class="btn btn-danger"
                >
                  Supprimer
                </button>
                <button
                  @click="modifierPlage(plage.id)"
                  class="btn btn-modifier "
                >
                  Modifier
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import SidebarMedecin from "@/components/SidebarMedecin.vue";
import HeaderPatient from "@/components/HeaderPatient.vue";
import {
  createPlageHoraire,
  deletePlageHoraire,
} from "@/services/plagesHoraireService";
import { getPlagesHorairesMedecin } from "@/services/rendezvousService";
import Swal from "sweetalert2";

const router = useRouter();

const nouvellePlage = ref({
  date: new Date().toISOString().split("T")[0],
  heure_debut: "",
  heure_fin: "",
  recurrence: "unique",
});

const plagesHoraires = ref([]);
const loading = ref(false);
const error = ref(null);

const heuresDisponibles = computed(() => {
  const heures = [];
  for (let i = 8; i <= 21; i++) {
    heures.push(`${i.toString().padStart(2, "0")}:00`);
    if (i !== 21) {
      heures.push(`${i.toString().padStart(2, "0")}:30`);
    }
  }
  return heures;
});

const errors = ref({
  date: "",
  heure_debut: "",
  heure_fin: "",
  interval: "",
  recurrence: "",
});

const resetErrors = () => {
  errors.value = {
    date: "",
    heure_debut: "",
    heure_fin: "",
    interval: "",
    recurrence: "",
  };
};

const validateForm = () => {
  resetErrors();
  let isValid = true;

  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);

  if (new Date(nouvellePlage.value.date) < tomorrow) {
    errors.value.date =
      "La date sélectionnée doit être au moins celle de demain.";
    isValid = false;
  }

  if (!nouvellePlage.value.heure_debut) {
    errors.value.heure_debut = "Veuillez sélectionner une heure de début.";
    isValid = false;
  }
  if (!nouvellePlage.value.heure_fin) {
    errors.value.heure_fin = "Veuillez sélectionner une heure de fin.";
    isValid = false;
  }
  if (nouvellePlage.value.heure_debut >= nouvellePlage.value.heure_fin) {
    errors.value.heure_fin = "L'heure de fin doit être après l'heure de début.";
    isValid = false;
  }

  const debut = new Date(`1970-01-01T${nouvellePlage.value.heure_debut}:00`);
  const fin = new Date(`1970-01-01T${nouvellePlage.value.heure_fin}:00`);
  const diffMinutes = (fin - debut) / (1000 * 60);
  if (diffMinutes > 30) {
    errors.value.interval = "L'intervalle ne doit pas dépasser 30 minutes.";
    isValid = false;
  }

  if (!nouvellePlage.value.recurrence) {
    errors.value.recurrence = "Veuillez sélectionner une récurrence.";
    isValid = false;
  }

  return isValid;
};

const formulaireValide = computed(() => {
  return validateForm();
});

const formatDateFrench = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("fr-FR", options);
};

const formatDateISO = (dateString) => {
  return new Date(dateString).toISOString().split("T")[0];
};

const chargerPlagesHoraires = async () => {
  loading.value = true;
  error.value = null;
  try {
    const medecinId = localStorage.getItem("medecin_id");
    const dateISO = nouvellePlage.value.date;
    const data = await getPlagesHorairesMedecin(medecinId, dateISO);
    plagesHoraires.value = data;
    console.log("Le médecin :", medecinId, "Date du :", dateISO, "Les plages de la date :", plagesHoraires.value);
  } catch (err) {
    error.value = "Erreur lors de la récupération des plages horaires";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const formatHeure = (heure) => {
  return heure.substring(0, 5);
};

const ajouterPlageHoraire = async () => {
  if (validateForm()) {
    try {
      const medecinId = localStorage.getItem("medecin_id");

      const heureDebutFormatted = formatHeure(nouvellePlage.value.heure_debut);
      const heureFinFormatted = formatHeure(nouvellePlage.value.heure_fin);
      const dateFormatted = formatDateISO(nouvellePlage.value.date);

      const plageHoraireToSend = {
        ...nouvellePlage.value,
        date: dateFormatted,
        heure_debut: heureDebutFormatted,
        heure_fin: heureFinFormatted,
        medecin_id: medecinId,
        status: "disponible",
      };

      console.log("Plage horaire à envoyer :", plageHoraireToSend);

      // Appel à l'API pour créer la plage horaire
      const response = await createPlageHoraire(plageHoraireToSend);
      console.log("Réponse de l'api :",response)

      // S'assurer que l'API a bien répondu avec un succès (par exemple, un status 200 ou 201)
      if (response.message === "Plage horaire créée avec succès") {
        // Si tout se passe bien, on affiche l'alerte de succès
        Swal.fire({
          icon: 'success',
          title: 'Plage horaire ajoutée',
          text: 'Votre plage horaire a été enregistrée avec succès !',
          confirmButtonText: 'OK',
        });

        // Recharge les plages horaires après ajout
        await chargerPlagesHoraires();

        // Réinitialiser les champs du formulaire
        nouvellePlage.value = {
          date: nouvellePlage.value.date,
          heure_debut: "",
          heure_fin: "",
          recurrence: "unique",
        };
      }
    } catch (err) {
      // Si une erreur 409 (conflit) survient
      if (err.response && err.response.status === 409) {
        Swal.fire({
          icon: 'warning',
          title: 'Conflit de plage horaire',
          text: err.response.data.message || 'Une plage horaire en conflit existe déjà. Veuillez choisir un autre horaire.',
          confirmButtonText: 'OK',
        });
        console.log("Erreur de conflit :", err.response.data.message);
      } else {
        // Pour toutes les autres erreurs
        error.value = "Erreur lors de l'ajout de la plage horaire";
        console.error(err);

        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: "Une erreur est survenue lors de l'enregistrement de la plage horaire. Veuillez réessayer.",
          confirmButtonText: 'OK',
        });
      }
    }
  }
};


const supprimerPlage = async (id) => {
  console.log("ID de la plage à supprimer :", id); // Ajoutez ce log pour déboguer

  try {
    // Affiche un SweetAlert pour la confirmation de la suppression
    const result = await Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette action est irréversible. Voulez-vous vraiment supprimer cette plage horaire ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
      reverseButtons: true
    });

    // Si l'utilisateur confirme la suppression
    if (result.isConfirmed) {
      await deletePlageHoraire(id);
      await chargerPlagesHoraires();

      // Affiche une alerte de succès après la suppression
      Swal.fire({
        icon: 'success',
        title: 'Supprimé !',
        text: 'La plage horaire a été supprimée avec succès.',
        confirmButtonText: 'OK'
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // Si l'utilisateur annule la suppression, affiche un message d'annulation
      Swal.fire({
        icon: 'info',
        title: 'Annulé',
        text: 'La suppression de la plage horaire a été annulée.',
        confirmButtonText: 'OK'
      });
    }
  } catch (err) {
    // En cas d'erreur lors de la suppression
    error.value = "Erreur lors de la suppression de la plage horaire";
    console.error(err);

    // Affiche une alerte d'erreur
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: "Une erreur est survenue lors de la suppression de la plage horaire. Veuillez réessayer.",
      confirmButtonText: 'OK'
    });
  }
};


const goBack = () => {
  router.go(-1);
};

onMounted(() => {
  chargerPlagesHoraires();
});

watch(() => nouvellePlage.value.date, chargerPlagesHoraires);
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
  margin: 0;
}
.info-medecin .info-txt h4 {
  font-size: 18px;
  color: black;
  opacity: 0.8;
  margin: 0;
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
.form_section form .plage-horaire {
  box-shadow: 0 0 8px #297fb939;
  padding: 25px;
  border-radius: 8px;
}
.calendrier h2,
.form_section form .plage-horaire h2 {
  font-size: 18px;
  font-family: "Montserrat";
  color: #717171;
  margin-top: 10px;
}
.form_section form label {
  font-weight: 500;
  font-size: 18px;
  color: #717171;
  margin-bottom: 5px;
}
.form_section form input,
.form_section form select {
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
.plages-list {
  margin-top: 20px;
  height: 645px;
  overflow: scroll;
  scroll-behavior: smooth;
}
.plage-item {
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
}
.plage-item h3 {
  margin: 0 0 10px 0;
  color: #2980b9;
}
.plage-item p {
  margin: 5px 0;
}
.btn-danger {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  margin-right: 10px;
}
.btn-modifier {
  background-color: #49b2f9;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}
</style>
