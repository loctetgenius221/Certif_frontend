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
  transition: all 0.5 ease-in-out;
}

.menu li:hover,.menu a:hover,
.active {
  color: #fff;
  background: #2980B9;
}

.menu a.active {
  color: white;
}

.menu a {
  color: inherit;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.menu a span {
  overflow: hidden;
}

.menu a i {
  font-size: 1.2rem;
}

.logout {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

</style>