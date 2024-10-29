<template>
  <div>
    <div class="sidebar">
      <div class="logo"></div>
      <ul class="menu">
        <li :class="{ active: $route.name === 'Patient' }">
          <router-link class="link" :to="{ name: 'Patient' }">
            <i class="far fa-calendar-check"></i>
            <span>Rendezvous</span>
          </router-link>
        </li>
        <li :class="{ active: $route.name === 'DossierPatient' }">
          <router-link class="link" :to="{ name: 'DossierPatient' }">
            <i class="fas fa-folder-open"></i>
            <span>DossiersMédicales</span>
          </router-link>
        </li>
        <li :class="{ active: $route.name === 'ConsultationPatient' }">
          <router-link class="link" :to="{ name: 'ConsultationPatient' }">
            <i class="fas fa-stethoscope"></i>
            <span>Consultations</span>
          </router-link>
        </li>
        <li :class="{ active: $route.name === 'ProfilPatient' }">
          <router-link class="link" :to="{ name: 'ProfilPatient' }">
            <i class="fas fa-user"></i>
            <span>Profil</span>
          </router-link>
        </li>
        <li class="logout">
          <router-link class="link" to="#" @click="logout">
            <i class="fas fa-sign-out-alt"></i>
            <span>Deconnexion</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";

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

<style scoped>
.sidebar {
  position: sticky;
  top: 0;
  left: 0;
  bottom: 0;
  width: 110px;
  height: 100vh;
  padding: 0 1.7rem;
  color: #fff;
  overflow: hidden;
  transition: all 0.5s linear;
  background: #fff;
  box-shadow: 0px 10px 25px #297fb918;
  z-index: 5;
}

.sidebar:hover {
  width: 260px;
  transition: 0.5s;
}

.logo {
  color: #2980b9;
  height: 80px;
  padding: 16px;
}

.menu {
  height: 88%;
  position: relative;
  list-style: none;
  padding: 0;
}

.menu li {
  color: #8a92a6;
  padding: 1rem;
  margin: 8px 0;
  border-radius: 8px;
  transition: all 0.5 ease-in-out;
}

.menu li.active,
.menu li:hover {
  color: #fff;
  background: #2980B9;
}
.menu .link {
  color: inherit;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.menu .link span {
  overflow: hidden;
}

.menu .link i {
  font-size: 1.2rem;
}

.logout {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
