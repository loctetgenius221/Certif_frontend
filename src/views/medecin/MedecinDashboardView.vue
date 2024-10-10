<template>
  <div class="medecin-dashboard d-flex">
    <div class="sidebar">
      <div class="logo"></div>
      <ul class="menu">
        <li class="active">
          <a class="active" href="#">
            <i class="far fa-calendar-check"></i>
            <span><router-link :to="{ name: 'Medecin' }">Rendez-vous</router-link></span>
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fas fa-folder-open"></i>
            <span><router-link :to="{ name: 'DossierMédicalMedecin' }">Dossiers Médicales</router-link></span>
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fas fa-stethoscope"></i>
            <span><router-link :to="{ name: 'ConsultationMedecin' }">Consultations</router-link></span>
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fas fa-user"></i>
            <span><router-link :to="{ name: 'ProfilMedecin' }">Profil</router-link></span>
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
      <div class="rendezvous-section">
        <MonAgenda />
      </div>
    </div>
  </div>
</template>

<script setup>
import "@/assets/css/Dashboard/SidebarView.css";
// import "@/assets/css/Medecin/DashboardView.css";
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router'; 
import MonAgenda from "@/components/MonAgenda.vue";

const authStore = useAuthStore();
const router = useRouter();

const logout = async () => {
  try {
    await authStore.logout();
    router.push({ name: "Connexion" });
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
  }
};
</script>

<style scoped>
.rendezvous-section {
  padding: 10px 32px;
}

.rendezvous-section h1 {
  font-family: 'Montserrat';
  font-size: 18px;
}
</style>