<template>
  <div>
    <!-- Bouton burger qui apparaît uniquement sur mobile -->
    <button
      @click="toggleSidebar"
      class="burger-btn"
      :class="{ active: isSidebarOpen }"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <!-- Sidebar avec classe conditionnelle pour l'état ouvert/fermé -->
    <div class="sidebar" :class="{ open: isSidebarOpen }">
      <div class="logo"></div>
      <ul class="menu">
        <li :class="{ active: $route.name === 'Medecin' }">
          <router-link class="link" :to="{ name: 'Medecin' }">
            <i class="far fa-calendar-check"></i>
            <span>Rendez-vous</span>
          </router-link>
        </li>
        <li :class="{ active: $route.name === 'DossierMédicalMedecin' }">
          <router-link class="link" :to="{ name: 'DossierMédicalMedecin' }">
            <i class="fas fa-folder-open"></i>
            <span>Dossiers Médicales</span>
          </router-link>
        </li>
        <li :class="{ active: $route.name === 'ConsultationMedecin' }">
          <router-link class="link" :to="{ name: 'ConsultationMedecin' }">
            <i class="fas fa-stethoscope"></i>
            <span>Consultations</span>
          </router-link>
        </li>
        <li :class="{ active: $route.name === 'PlageHoraire' }">
          <router-link class="link" :to="{ name: 'PlageHoraire' }">
            <i class="fa-solid fa-clock"></i>
            <span>Plages Horaires</span>
          </router-link>
        </li>
        <li :class="{ active: $route.name === 'ProfilMedecin' }">
          <router-link class="link" :to="{ name: 'ProfilMedecin' }">
            <i class="fas fa-user"></i>
            <span>Profil</span>
          </router-link>
        </li>
        <li class="logout">
          <router-link class="link" to="#">
            <i class="fas fa-sign-out-alt"></i>
            <span @click="logout">Deconnexion</span>
          </router-link>
        </li>
      </ul>
    </div>
    <!-- Overlay pour fermer le menu en cliquant à l'extérieur sur mobile -->
    <div
      v-if="isSidebarOpen"
      class="sidebar-overlay"
      @click="toggleSidebar"
    ></div>
  </div>
</template>

<script setup>
import { ref } from "vue"; 
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";
const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

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
  transition: all 0.2s ease-in-out;
}

.menu li.active,
.menu li:hover {
  color: #fff;
  background: #2980b9;
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


/* Styles pour le responsive */
@media (max-width: 768px) {
  .sidebar {
    width: 260px;
    transform: translateX(-100%);
    position: fixed;
  }

  /* .sidebar:hover {
    transition: 0.5s;
  } */

  .sidebar.open {
    transform: translateX(0);
  }

  /* Ne pas afficher l'effet hover sur mobile */
  .sidebar:hover {
    width: 260px;
  }
}

/* Styles pour le bouton burger */
.burger-btn {
  display: none;
  position: fixed;
  top: 0rem;
  left: 1rem;
  z-index: 60;
  background: none;
  border: none;
  cursor: pointer;
  padding: 15px;
  background: #2980b9;
  margin-left: -16px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.192);
}

.burger-btn span {
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px 0;
  background: #fff;
  transition: all 0.3s ease;
}

/* Animation du burger quand active */
.burger-btn.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.burger-btn.active span:nth-child(2) {
  opacity: 0;
}

.burger-btn.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

/* Overlay pour fermer le menu */
.sidebar-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 40;
}

@media (max-width: 768px) {
  .burger-btn {
    display: block;
  }

  .sidebar-overlay {
    display: block;
  }
}
</style>
