<template>
  <div class="sidebar">
      <div class="logo"></div>
      <ul class="menu">
        <li class="active">
          <router-link :to="{ name: 'Medecin' }" class="active" >
            <i class="far fa-calendar-check"></i>
            <span>Rendez-vous</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'DossierMédicalMedecin' }" >
            <i class="fas fa-folder-open"></i>
            <span>Dossiers Médicales</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ConsultationMedecin' }" >
            <i class="fas fa-stethoscope"></i>
            <span>Consultations</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'PlageHoraire' }" >
            <i class="fa-solid fa-clock"></i>
            <span>Plages Horaires</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ProfilMedecin' }" >
            <i class="fas fa-user"></i>
            <span>Profil</span>
          </router-link>
        </li>
        <li class="logout">
          <a href="#">
            <i class="fas fa-sign-out-alt"></i>
            <span @click="logout">Deconnexion</span>
          </a>
        </li>
      </ul>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';

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