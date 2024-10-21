<template>
  <div class="medecin-dashboard d-flex">
    <SidebarMedecin />
    <div class="section-content">
      <HeaderPatient />

      <div class="profil-section">
        <h1>Mon Profil Professionnel</h1>
        <div v-if="loading" class="loading-spinner">
          <div class="spinner"></div>
        </div>
        <div v-else-if="error" class="error-message">
          {{ error }}
        </div>
        <div v-else class="profil-content">
          <div class="profil-header">
            <div class="photo-profil">
              <img :src="profil.photo_profil || '../../../public/image/default-avatar.png'" :alt="profil.prenom + ' ' + profil.nom" />
              <button class="btn-change-photo">Changer la photo</button>
            </div>
            <div class="info-principale">
              <h2>{{ profil.prenom }} {{ profil.nom }}</h2>
              <p>Médecin - {{ profil.service?.nom || 'Service non spécifié' }}</p>
              <p>Licence n° {{ profil.numeroLicence }}</p>
            </div>
          </div>

          <form @submit.prevent="updateProfile" class="profil-form">
            <div class="form-section">
              <h3>Informations Personnelles</h3>
              <div class="form-grid">
                <div class="form-group">
                  <label for="prenom">Prénom</label>
                  <input v-model="profil.prenom" type="text" id="prenom" required />
                </div>
                <div class="form-group">
                  <label for="nom">Nom</label>
                  <input v-model="profil.nom" type="text" id="nom" required />
                </div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <input v-model="profil.email" type="email" id="email" required />
                </div>
                <div class="form-group">
                  <label for="telephone">Téléphone</label>
                  <input v-model="profil.telephone" type="tel" id="telephone" required />
                </div>
                <div class="form-group">
                  <label for="dateNaissance">Date de Naissance</label>
                  <input v-model="profil.dateNaissance" type="date" id="dateNaissance" required />
                </div>
                <div class="form-group">
                  <label for="sexe">Sexe</label>
                  <select v-model="profil.sexe" id="sexe" required>
                    <option value="masculin">Masculin</option>
                    <option value="féminin">Féminin</option>
                  </select>
                </div>
                <div class="form-group full-width">
                  <label for="adresse">Adresse</label>
                  <input v-model="profil.adresse" type="text" id="adresse" required />
                </div>
              </div>
            </div>

            <div class="form-section">
              <h3>Informations Professionnelles</h3>
              <div class="form-grid">
                <div class="form-group">
                  <label for="numeroLicence">Numéro de Licence</label>
                  <input v-model="profil.numeroLicence" type="text" id="numeroLicence" required />
                </div>
                <div class="form-group">
                  <label for="annee_experience">Années d'expérience</label>
                  <input v-model="profil.annee_experience" type="number" id="annee_experience" required />
                </div>
                <div class="form-group">
                  <label for="hopital_affiliation">Hôpital d'affiliation</label>
                  <input v-model="profil.hopital_affiliation" type="text" id="hopital_affiliation" required />
                </div>
                <div class="form-group">
                  <label for="service">Service</label>
                  <select v-model="profil.service_id" id="service" required>
                    <option value="">Sélectionnez un service</option>
                    <!-- Ajoutez ici les options de service -->
                  </select>
                </div>
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn-primary">Enregistrer les modifications</button>
              <router-link :to="{ name: 'Medecin' }" class="btn-secondary">Annuler</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SidebarMedecin from "@/components/SidebarMedecin.vue";
import HeaderPatient from "@/components/HeaderPatient.vue";
import { getProfile, updateProfile } from "@/services/profileService";

const profil = ref({});
const loading = ref(true);
const error = ref(null);

const fetchProfile = async () => {
  try {
    loading.value = true;
    const data = await getProfile();
    profil.value = { ...data.user, ...data.medecin };
    console.log(profil.value);
  } catch (err) {
    error.value = "Erreur lors du chargement du profil";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// const updateProfiles = async () => {
//   try {
//     loading.value = true;
//     await updateProfile(profil.value);
//     alert("Profil mis à jour avec succès !");
//   } catch (err) {
//     error.value = "Erreur lors de la mise à jour du profil";
//     console.error(err);
//   } finally {
//     loading.value = false;
//   }
// };

onMounted(fetchProfile);
</script>

<style scoped>
.profil-section {
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 0 4px #297fb939;
}

h1, h2, h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.profil-content {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.profil-header {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}

.photo-profil {
  position: relative;
  margin-right: 2rem;
}

.photo-profil img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
}

.btn-change-photo {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.8rem;
}

.info-principale h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.info-principale p {
  color: #7f8c8d;
  margin-bottom: 0.25rem;
}

.form-section {
  margin-bottom: 2rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

label {
  margin-bottom: 0.5rem;
  color: #34495e;
}

input, select {
  padding: 0.5rem;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  font-size: 1rem;
}

.form-actions {
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
}

.btn-primary, .btn-secondary {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-primary:hover {
  background-color: #2980b9;
}

.btn-secondary {
  background-color: #ecf0f1;
  color: #2c3e50;
  text-decoration: none;
}

.btn-secondary:hover {
  background-color: #bdc3c7;
}

.loading-spinner, .error-message {
  text-align: center;
  padding: 2rem;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>