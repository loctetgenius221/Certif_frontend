<template>
  <div>
    <div class="sidebar">
      <div class="logo"></div>
      <ul class="menu">
        <li class="active">
          <a class="active" href="#">
            <i class="far fa-calendar-check"></i>
            <span><router-link :to="{ name: 'Patient' }">Rendezvous</router-link></span>
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fas fa-folder-open"></i>
            <span><router-link :to="{ name: 'DossierPatient' }">DossiersMédicales</router-link></span>
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fas fa-user"></i>
            <span><router-link :to="{ name: 'ProfilPatient' }">Profil</router-link></span>
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
  </div>
</template>

<script setup>
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router'; 

const authStore = useAuthStore();
const router = useRouter();

const logout = async () => {
  try {
    // Appel à la fonction de déconnexion dans le store Pinia
    await authStore.logout();
    // Rediriger vers la page de connexion après la déconnexion
    router.push({ name: "Connexion" });
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
  }
};
</script>