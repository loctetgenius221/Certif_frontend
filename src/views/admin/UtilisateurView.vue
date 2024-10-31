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
                    <h3 class="stat-value mb-0">
                      {{ formatNumber(stat.value) }}
                    </h3>
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
            <div class="d-flex align-items-center gap-2">
              <button
                class="btn btn-outline-secondary"
                :class="{ active: currentStatusFilter === 'all' }"
                @click="currentStatusFilter = 'all'"
              >
                Tous
              </button>
              <button
                class="btn btn-outline-secondary"
                :class="{ active: currentStatusFilter === 'Actif' }"
                @click="currentStatusFilter = 'Actif'"
              >
                Actifs
              </button>
              <button
                class="btn btn-outline-secondary"
                :class="{ active: currentStatusFilter === 'Inactif' }"
                @click="currentStatusFilter = 'Inactif'"
              >
                Inactifs
              </button>
            </div>
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
                      <p class="user-name mb-0">
                        {{ user.prenom }} {{ user.nom }}
                      </p>
                      <p class="user-email mb-0">{{ user.email }}</p>
                    </div>
                  </div>
                  <div class="d-flex align-items-center gap-3">
                    <div class="user-roles mb-0">
                      <span
                        v-for="role in extractRolesAndPermissions(user).roles"
                        :key="role"
                        :class="getRoleBadgeClass(role)"
                      >
                        {{ role }}
                      </span>
                    </div>
                    <span :class="getStatusBadgeClass(getUserStatus(user))">
                      {{ getUserStatus(user) }}
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
import { getUserStatistics } from "@/services/utilisateurService";

import { ref, computed, onMounted } from "vue";

// États
const searchQuery = ref("");
const currentTab = ref("all");
const currentStatusFilter = ref("all");
const users = ref([]);

// État réactif pour les statistiques
const stats = ref([
  {
    title: "Total Utilisateurs",
    value: 0,
    icon: "fas fa-users fa-2x",
    color: "#3B82F6",
  },
  {
    title: "Médecins",
    value: 0,
    icon: "fas fa-user-md fa-2x",
    color: "#10B981",
  },
  {
    title: "Patients",
    value: 0,
    icon: "fas fa-hospital-user fa-2x",
    color: "#8B5CF6",
  },
  {
    title: "Assistants",
    value: 0,
    icon: "fas fa-user-nurse fa-2x",
    color: "#F59E0B",
  },
]);

// Fonction pour formater les nombres
const formatNumber = (number) => {
  return new Intl.NumberFormat("fr-FR").format(number);
};

// Fonction pour charger les statistiques
const loadStatistics = async () => {
  try {
    const data = await getUserStatistics();

    // Mise à jour des valeurs
    stats.value = stats.value.map((stat) => {
      if (stat.title === "Total Utilisateurs") {
        stat.value = data.total_users;
      } else if (stat.title === "Médecins") {
        stat.value = data.docteurs;
      } else if (stat.title === "Patients") {
        stat.value = data.patients;
      } else if (stat.title === "Assistants") {
        stat.value = data.assistants;
      }
      return stat;
    });
  } catch (error) {
    console.error("Erreur lors du chargement des statistiques:", error);
    // Gérer l'erreur (afficher une notification, etc.)
  }
};

const tabs = [
  { label: "Tous", value: "all" },
  { label: "Médecins", value: "medecin" },
  { label: "Patients", value: "patient" },
  { label: "Assistants", value: "assistant" },
];

const loadUsers = async () => {
  const allUsers = await getUserStatistics();
  users.value = allUsers.users;
  console.log("infos :", users.value);
  return users;
};

// Fonction pour extraire les rôles et permissions
function extractRolesAndPermissions(user) {
  const rolesAndPermissions = user.roles_and_permissions;

  // Extraire les rôles
  const roles = rolesAndPermissions.map((role) => role.name);

  // Extraire les permissions
  const permissions = rolesAndPermissions.flatMap((role) => role.permissions);

  return { roles, permissions };
}

// Computed
const filteredUsers = computed(() => {
  let filtered = users.value;

  if (searchQuery.value) {
    filtered = filtered.filter(
      (user) =>
        user.nom.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        user.prenom.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  if (currentTab.value !== "all") {
    filtered = filtered.filter((user) => {
      const typeMap = {
        medecin: "medecin",
        patient: "patient",
        assistant: "assistant",
      };
      return user.roles_and_permissions.some(
        (role) => role.name === typeMap[currentTab.value]
      );
    });
  }

  if (currentStatusFilter.value !== "all") {
    filtered = filtered.filter(
      (user) => getUserStatus(user) === currentStatusFilter.value
    );
  }

  return filtered;
});

const getUserStatus = (user) => {
  // Logique pour déterminer le statut de l'utilisateur
  if (
    user.derniereLigneConnexion &&
    Date.now() - new Date(user.derniereLigneConnexion).getTime() <
      30 * 24 * 60 * 60 * 1000
  ) {
    return "Actif";
  } else {
    return "Inactif";
  }
};

const getRoleBadgeClass = (role) => {
  switch (role) {
    case "administrateur":
      return "badge bg-warning";
    case "medecin":
      return "badge bg-primary";
    case "patient":
      return "badge bg-success";
    case "assistant":
      return "badge bg-purple";
    default:
      return "badge bg-secondary";
  }
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

  console.log("User :", selectedUser.value);
};

// Chargement initial des données
onMounted(() => {
  loadStatistics();
  loadUsers();
});
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

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-value {
  font-weight: 600;
  font-size: 1.75rem;
}

.stat-card {
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease-in-out;
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

.bg-primary {
  background: #10B981;
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
