<template>
  <div class="sidebar">
    <div class="logo"></div>
    <ul class="menu">
      <li :class="{ active: $route.name === 'AdminDashboard' }">
        <router-link class="link" :to="{ name: 'AdminDashboard' }">
          <i class="fa-solid fa-layer-group"></i>
          <span>Tableau de bord</span>
        </router-link>
      </li>
      <li :class="{ active: $route.name === 'Utilisateur' }">
        <router-link class="link" :to="{ name: 'Utilisateur' }">
          <i class="fa-solid fa-users"></i>
          <span>Utilisateurs</span>
        </router-link>
      </li>
      <li :class="{ active: $route.name === 'RendezvousAdmin' }">
        <router-link class="link" :to="{ name: 'RendezvousAdmin' }">
          <i class="far fa-calendar-check"></i>
          <span>Rendez vous</span>
        </router-link>
      </li>
      <li :class="{ active: $route.name === 'DossierMedicalAdmin' }">
        <router-link class="link" :to="{ name: 'DossierMedicalAdmin' }">
          <i class="fa-regular fa-folder-open"></i>
          <span>Dossier Medical</span>
        </router-link>
      </li>
      <li :class="{ active: $route.name === 'ArticleAdmin' }">
        <router-link class="link" :to="{ name: 'ArticleAdmin' }">
          <i class="fa-solid fa-newspaper"></i>
          <span>Article</span>
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
  color: #2980B9;
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
  color: #8A92A6;
  padding: 1rem;
  margin: 8px 0;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
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