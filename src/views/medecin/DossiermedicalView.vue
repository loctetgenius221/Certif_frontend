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
      <div class="dme-section">
        <div
          class="dme-heading d-flex align-items-center justify-content-between mb-3"
        >
          <h1>Liste des dossiers médicaux</h1>
          <div class="filtre">
            <form class="d-flex" role="search">
              <input
                class="form-control me-2"
                type="search"
                placeholder="dme,nom,prénom,date"
                aria-label="Search"
              />
            </form>
          </div>
        </div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Photo</th>
              <th scope="col">N°DME</th>
              <th scope="col">Prénom</th>
              <th scope="col">Nom</th>
              <th scope="col">Date de création</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="dossier in dossiers" :key="dossier.id">
              <td>
                <img src="../../../public/image/photo-profil.png" alt="" />
              </td>
              <td>{{ dossier.numero_dme }}</td>
              <td>{{ dossier.prenom   }}</td>
              <td>{{ dossier.patient.numero_patient }}</td>
              <td>{{ dossier.date_creation }}</td>
              <td>
                <router-link class="btn-detail" :to="{ name: 'Détail-DME', params: { id: dossier.id } }">Voir plus...</router-link>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
      </div>
    </div>
  </div>
</template>

<script setup>
import "@/assets/css/Medecin/DossiermedicalView.css";
import { ref, onMounted } from "vue"; // Importer ref et onMounted
import { getDossierMedicalList } from "@/services/dossiermedicalService"; // Importer votre fonction API

const dossiers = ref([]); // Déclaration de la variable réactive pour les dossiers

// Fonction pour récupérer la liste des dossiers médicaux
const fetchDossiers = async () => {
  const data = await getDossierMedicalList(); // Appeler la fonction API
  dossiers.value = data.data; // Mettre à jour la valeur réactive
};

// Appeler la fonction fetchDossiers lors du montage du composant
onMounted(() => {
  fetchDossiers();
});
</script>
