<template>
  <div class="d-flex">
    <SidebarAdmin />
    <div class="section-content">
      <HeaderPatient />
      <div class="section-container">
        <!-- Contenu -->
        <div class="dashboard-container p-4">
          <!-- En-tête -->
          <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 class="dashboard-title">Gestion des Utilisateurs</h1>
              <p class="text-secondary">
                Gérez tous vos utilisateurs en un seul endroit
              </p>
            </div>
            <router-link :to="{ name: 'GestionUser' }">
              <button class="btn btn-primary d-flex align-items-center gap-2">
                <i class="fas fa-user-plus"></i>
                Ajouter un utilisateur
              </button>
            </router-link>
          </div>

          <!-- Cartes de statistiques -->
          <div class="row g-4 mb-4">
            <div class="col-md-3" v-for="stat in stats" :key="stat.title">
              <div class="card stat-card">
                <div
                  class="card-body d-flex justify-content-between align-items-center"
                >
                  <div>
                    <p class="text-secondary mb-1">{{ stat.title }}</p>
                    <h3 class="stat-value mb-0">{{ stat.value }}</h3>
                  </div>
                  <i :class="stat.icon" :style="{ color: stat.color }"></i>
                </div>
              </div>
            </div>
          </div>

          <!-- Barre de recherche et filtres -->
          <div class="d-flex gap-3 mb-4">
            <div class="position-relative flex-grow-1">
              <i class="fas fa-search search-icon"></i>
              <input
                v-model="searchQuery"
                class="form-control search-input"
                placeholder="Rechercher un utilisateur..."
              />
            </div>
            <button
              class="btn btn-outline-secondary d-flex align-items-center gap-2"
            >
              <i class="fas fa-filter"></i>
              Filtres
            </button>
          </div>

          <!-- Onglets -->
          <ul class="nav nav-tabs mb-4">
            <li class="nav-item" v-for="tab in tabs" :key="tab.value">
              <button
                class="nav-link"
                :class="{ active: currentTab === tab.value }"
                @click="currentTab = tab.value"
              >
                {{ tab.label }}
              </button>
            </li>
          </ul>

          <!-- Liste des utilisateurs -->
          <div class="card">
            <div class="card-body">
              <h5 class="card-title mb-4">Liste des utilisateurs</h5>
              <div class="user-list">
                <div
                  v-for="user in filteredUsers"
                  :key="user.id"
                  class="user-item"
                >
                  <div class="d-flex align-items-center gap-3">
                    <div class="avatar">
                      <img
                        src="'../../../public/image/avatar.png'"
                        alt="Avatar"
                      />
                    </div>
                    <div>
                      <p class="user-name mb-0">{{ user.name }}</p>
                      <p class="user-email mb-0">{{ user.email }}</p>
                    </div>
                  </div>
                  <div class="d-flex align-items-center gap-3">
                    <span :class="getBadgeClass(user.type)">
                      {{ user.type }}
                    </span>
                    <span :class="getStatusBadgeClass(user.status)">
                      {{ user.status }}
                    </span>
                    <div>
                      <button
                        class="btn btn-link"
                        @click="openUserDetail(user)"
                      >
                        <i class="fas fa-eye"></i> Voir détails
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Fin Contenu -->
      </div>
    </div>
  </div>
  <!-- Modal DetailUser (affiché seulement si selectedUser n'est pas null) -->
  <DetailUtilisateur
    v-if="selectedUser"
    :show="isModalVisible"
    :user="selectedUser"
    @close="isModalVisible = false"
  />
</template>

<script setup>
import SidebarAdmin from "@/components/SidebarAdmin.vue";
import HeaderPatient from "@/components/HeaderPatient.vue";
import DetailUtilisateur from "@/components/DetailUtilisateur.vue";

import { ref, computed } from "vue";

// États
const searchQuery = ref("");
const currentTab = ref("all");

// Données statiques
const stats = [
  {
    title: "Total Utilisateurs",
    value: "1,234",
    icon: "fas fa-users fa-2x",
    color: "#3B82F6",
  },
  {
    title: "Médecins",
    value: "256",
    icon: "fas fa-user-md fa-2x",
    color: "#10B981",
  },
  {
    title: "Patients",
    value: "845",
    icon: "fas fa-hospital-user fa-2x",
    color: "#8B5CF6",
  },
  {
    title: "Assistants",
    value: "133",
    icon: "fas fa-user-nurse fa-2x",
    color: "#F59E0B",
  },
];

const tabs = [
  { label: "Tous", value: "all" },
  { label: "Médecins", value: "doctors" },
  { label: "Patients", value: "patients" },
  { label: "Assistants", value: "assistants" },
];

const users = ref([
  {
    id: 1,
    name: "Dr. Jean Dupont",
    email: "jean.dupont@example.com",
    type: "Médecin",
    status: "Actif",
  },
  {
    id: 2,
    name: "Marie Martin",
    email: "marie.martin@example.com",
    type: "Patient",
    status: "Actif",
  },
  {
    id: 3,
    name: "Sophie Dubois",
    email: "sophie.dubois@example.com",
    type: "Assistant",
    status: "Inactif",
  },
]);

// Computed
const filteredUsers = computed(() => {
  let filtered = users.value;

  if (searchQuery.value) {
    filtered = filtered.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  if (currentTab.value !== "all") {
    filtered = filtered.filter((user) => {
      const typeMap = {
        doctors: "Médecin",
        patients: "Patient",
        assistants: "Assistant",
      };
      return user.type === typeMap[currentTab.value];
    });
  }

  return filtered;
});

// Méthodes
const getBadgeClass = (type) => {
  const classes = {
    Médecin: "badge bg-primary",
    Patient: "badge bg-success",
    Assistant: "badge bg-purple",
  };
  return classes[type] || "badge bg-secondary";
};

const getStatusBadgeClass = (status) => {
  return status === "Actif"
    ? "badge bg-success-light text-success"
    : "badge bg-danger-light text-danger";
};

// Concernant le modal
const isModalVisible = ref(false);
const selectedUser = ref(null);

const openUserDetail = (user) => {
  selectedUser.value = user;
  isModalVisible.value = true;
};
</script>

<style scoped>
.dashboard-container {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.dashboard-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.stat-card {
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.stat-value {
  font-weight: bold;
  font-size: 1.5rem;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6c757d;
}

.search-input {
  padding-left: 2.5rem;
}

.user-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.user-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #dee2e6;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
}

.user-item:hover {
  background-color: #f8f9fa;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e9ecef;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-name {
  font-weight: 500;
}

.user-email {
  color: #6c757d;
  font-size: 0.875rem;
}

.badge {
  padding: 0.5rem 0.75rem;
  border-radius: 20px;
}

.bg-purple {
  background-color: #8b5cf6;
  color: white;
}

.bg-success-light {
  background-color: #d1fae5;
}

.bg-danger-light {
  background-color: #fee2e2;
}

.btn-link {
  text-decoration: none;
  color: #6c757d;
}

.btn-link:hover {
  color: #343a40;
}

.gap-2 {
  gap: 0.5rem;
}

.gap-3 {
  gap: 1rem;
}
</style>
