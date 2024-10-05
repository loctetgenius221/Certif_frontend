<template>
  <div>
    <h1>Dashboard Patient</h1>
    <div>
      <button @click="logout">Se déconnecter</button>
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