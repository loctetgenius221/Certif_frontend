<template>
  <div class="medecin-dashboard d-flex">
    <div class="sidebar">
      <div class="logo"></div>
      <ul class="menu">
        <li class="active">
          <a class="active" href="#">
            <i class="far fa-calendar-check"></i>
            <!-- <img src="../../../public/image/CategoryBlanc.svg" alt=""> -->
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
      <div class="profil-section">
        <h1 class="mb-4">Profil</h1>
        <div class="profil-heading d-flex align-items-center gap-3 mb-4">
          <img
            src="../../../public/image/portrait-3d-female-doctor.jpg"
            alt=""
          />
          <h3>Marème Thiaw</h3>
          -
          <p class="m-0">Médecin</p>
        </div>

        <div class="form-content">
          <form @submit.prevent="updateProfile">
            <div class="d-flex flex-wrap gap-3">
              <div class="mb-3 col-3">
                <label for="prenom" class="form-label">Prénom:</label>
                <input
                  v-model="profil.prenom"
                  type="text"
                  class="form-control"
                  id="prenom"
                />
              </div>
              <div class="mb-3 col-3">
                <label for="nom" class="form-label">Nom:</label>
                <input
                  v-model="profil.nom"
                  type="text"
                  class="form-control"
                  id="nom"
                />
              </div>
              <div class="mb-3 col-3">
                <label for="telephone" class="form-label">Téléphone:</label>
                <input
                  v-model="profil.telephone"
                  type="tel"
                  class="form-control"
                  id="telephone"
                />
              </div>
              <div class="mb-3 col-3">
                <label for="email" class="form-label">Email:</label>
                <input
                  v-model="profil.email"
                  type="email"
                  class="form-control"
                  id="email"
                />
              </div>
              <div class="mb-3 col-3">
                <label for="password" class="form-label">Mot de passe:</label>
                <input
                  v-model="profil.password"
                  type="password"
                  class="form-control"
                  id="password"
                />
              </div>
            </div>

            <div class="mt-4 d-flex align-items-center gap-4">
              <button type="submit" class="btn btn-primary">Enregistrer</button>
              <router-link :to="{ name: 'Medecin' }">Annuler</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import "@/assets/css/Medecin/ProfilView.css";
import { onMounted, ref } from "vue";
import { getProfile } from "@/services/profileService";

// Initialiser les données du profil
const profil = ref({
  prenom: '',
  nom: '',
  telephone: '',
  email: '',
  password: '',
});

// Fonction pour récupérer le profil
const fetchProfile = async () => {
  const data = await getProfile();
  profil.value = data;
  console.log(profil.value)
};

// Fonction pour mettre à jour le profil
// const updateProfile = async () => {
//   try {
//     await updateProfil(profil.value);
//     alert("Profil mis à jour avec succès !");
//   } catch (error) {
//     alert("Erreur lors de la mise à jour du profil.");
//   }
// };

// Appel de notre fonction lors du montage du composant
onMounted(() => {
  fetchProfile();
});
</script>

<style scoped>
.profil-section {
  padding: 10px 32px;
}

.profil-section h1 {
  font-family: 'Montserrat';
  font-size: 18px;
}

.profil-section .form-content {
  box-shadow: 0 10px 13px #297fb915;
  padding: 30px;
  border-radius: 5px;
}

.profil-section .profil-heading {
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.20);
  border-radius: 8px;
  box-shadow: 0 6px 8px #297fb915;
  padding: 36px 50px;
}

.profil-section .profil-heading img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: -70px;
}
</style>