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
                <input type="date" v-model="nouvellePlage.date" required @change="chargerPlagesHoraires" />
              </div>
              <div class="d-flex flex-column mb-3">
                <label for="heure_debut">Heure de début :</label>
                <select v-model="nouvellePlage.heure_debut" required>
                  <option v-for="heure in heuresDisponibles" :key="heure" :value="heure">{{ heure }}</option>
                </select>
              </div>
              <div class="d-flex flex-column mb-3">
                <label for="heure_fin">Heure de fin :</label>
                <select v-model="nouvellePlage.heure_fin" required>
                  <option v-for="heure in heuresDisponibles" :key="heure" :value="heure">{{ heure }}</option>
                </select>
              </div>
              <div class="d-flex flex-column mb-3">
                <label for="recurrence">Récurrence :</label>
                <select v-model="nouvellePlage.recurrence">
                  <option value="unique">Unique</option>
                  <option value="quotidienne">Quotidienne</option>
                  <option value="hebdomadaire">Hebdomadaire</option>
                </select>
              </div>
            </div>
            <button class="btn" type="submit" :disabled="!formulaireValide">Ajouter la plage horaire</button>
          </form>
          
          <div class="calendrier">
            <h2>Plages horaires existantes pour le {{ formatDate(nouvellePlage.date) }} :</h2>
            <div v-if="loading">Chargement...</div>
            <div v-else-if="error">{{ error }}</div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import SidebarMedecin from "@/components/SidebarMedecin.vue";
import HeaderPatient from "@/components/HeaderPatient.vue";
import { getPlagesHoraires } from '@/services/plagesHoraireService';

const router = useRouter();

const nouvellePlage = ref({
  date: new Date().toISOString().split('T')[0],
  heure_debut: '',
  heure_fin: '',
  recurrence: 'unique'
});

const plagesHoraires = ref([]);
const loading = ref(false);
const error = ref(null);

const heuresDisponibles = computed(() => {
  const heures = [];
  for (let i = 8; i <= 21; i++) {
    heures.push(`${i.toString().padStart(2, '0')}:00`);
    if (i !== 21) {
      heures.push(`${i.toString().padStart(2, '0')}:30`);
    }
  }
  return heures;
});

const formulaireValide = computed(() => {
  return nouvellePlage.value.date &&
         nouvellePlage.value.heure_debut &&
         nouvellePlage.value.heure_fin &&
         nouvellePlage.value.heure_debut < nouvellePlage.value.heure_fin;
});

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
};

const chargerPlagesHoraires = async () => {
  loading.value = true;
  error.value = null;
  try {
    const medecinId = 2; // À remplacer par l'ID du médecin connecté
    const data = await getPlagesHoraires(medecinId, nouvellePlage.value.date);
    plagesHoraires.value = data;
  } catch (err) {
    error.value = "Erreur lors de la récupération des plages horaires";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const ajouterPlageHoraire = async () => {
  if (formulaireValide.value) {
    try {
      // Ici, vous devriez appeler votre service pour ajouter la plage horaire
      console.log('Nouvelle plage horaire :', nouvellePlage.value);
      // Après l'ajout, rechargez les plages horaires
      await chargerPlagesHoraires();
      // Réinitialisez le formulaire
      nouvellePlage.value = {
        date: nouvellePlage.value.date,
        heure_debut: '',
        heure_fin: '',
        recurrence: 'unique'
      };
    } catch (err) {
      error.value = "Erreur lors de l'ajout de la plage horaire";
      console.error(err);
    }
  }
};

const supprimerPlage = async (id) => {
  try {
    // Ici, vous devriez appeler votre service pour supprimer la plage horaire
    console.log('Suppression de la plage horaire avec l\'id :', id);
    // Après la suppression, rechargez les plages horaires
    await chargerPlagesHoraires();
  } catch (err) {
    error.value = "Erreur lors de la suppression de la plage horaire";
    console.error(err);
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
.form_section form, .form_section .calendrier {
  flex: 1;
  width: 50%;
  box-sizing: border-box;
}
.form_section .calendrier, .form_section form .plage-horaire {
  box-shadow: 0 0 8px #297fb939;
  padding: 25px;
  border-radius: 8px;
}
.calendrier h2, .form_section form .plage-horaire h2 {
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
.form_section form input, .form_section form select {
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
}
</style>