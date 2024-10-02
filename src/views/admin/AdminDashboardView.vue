<template>
  <div class="admin-dashboard">
    <h1>Tableau de bord administrateur</h1>
    <p>Bienvenue, {{ authStore.user?.name }} !</p>

    <!-- Exemple de section pour l'administrateur -->
    <div class="admin-actions">
      <h2>Actions d'administration</h2>
      <ul>
        <li><router-link to="/users">Gérer les utilisateurs</router-link></li>
        <li><router-link to="/settings">Paramètres</router-link></li>
        <li><router-link to="/reports">Voir les rapports</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();
</script>

<style scoped>
.admin-dashboard {
  padding: 20px;
}

.admin-actions {
  margin-top: 20px;
}

.admin-actions ul {
  list-style: none;
  padding: 0;
}

.admin-actions li {
  margin-bottom: 10px;
}

.admin-actions a {
  color: #007bff;
  text-decoration: none;
}

.admin-actions a:hover {
  text-decoration: underline;
}
</style>
