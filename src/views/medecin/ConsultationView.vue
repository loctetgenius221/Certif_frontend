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
      <div class="consultation-section">
        <div
          class="dme-heading d-flex align-items-center justify-content-between mb-3"
        >
          <h1>Historique des consultations</h1>
          <div class="filtre">
            <form class="d-flex" role="search">
              <input
                class="form-control me-2"
                type="search"
                placeholder="date de la consultation..."
                aria-label="Search"
              />
            </form>
          </div>
        </div>
        <table class="table">
          <tbody>
            <tr v-for="consultation in consultations" :key="consultation.id">
              <th scope="row">1</th>
              <td>{{ consultation.date }}</td>
              <td>{{ consultation.type_consultation }}</td>
              <td>
                <router-link class="btn-detail" :to="{ name: 'Detail-consultation', params: { id: consultation.id } }">Voir plus...</router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
// import "@/assets/css/Medecin/ConsultationView.css";
import {ref, onMounted} from "vue"
import { getConsultationList } from "@/services/consultationService";

const consultations = ref([]);

const fetchConsultations = async () => {
  const data = await getConsultationList();
  consultations.value = data.data;
};

// Appel à la fonction fetchConsultations lors du montage du composant
onMounted(() => {
  fetchConsultations();
})
</script>

<style scoped>
.main--content {
  position: sticky;
  top: 80px;
  left: 0;
  background: #fff;
  width: 100%;
  padding: 0.5rem 0;
}

.header--wrapper img {
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 50%;
}

.header--wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: #fff;
  border-radius: 10px;
  padding: 10px 2rem;
  margin-bottom: 1rem;
}

.user--info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user--info i {
  font-size: 1.5rem;
  cursor: pointer;
}

.user--info h4 {
  font-size: 1rem;
}

.search--box {
  background: none;
  border: 1px solid #e9ecef;
  border-radius: 5px;
  align-items: center;
  gap: 5px;
  padding: 4px 12px;
}

.search--box input {
  background: transparent;
  padding: 6px 15px;
  border: none;
  outline: none;
  /* color: #ADB5BD; */
  font-size: 16px;
}

.search--box i {
  color: #adb5bd;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.5s ease-out;
}

.search--box i:hover {
  transform: scale(1.2);
}

.consultation-section {
  padding: 10px 32px;
}

.consultation-section h1 {
  font-family: 'Montserrat';
  font-size: 18px;
}
</style>