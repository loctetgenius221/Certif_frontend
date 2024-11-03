<template>
  <div class="modal-overlay" :class="{ show: show }" @click="closeModal">
    <div class="side-modal" :class="{ show: show }" @click.stop>
      <!-- En-tête du modal -->
      <div class="modal-header border-bottom">
        <div class="d-flex align-items-center gap-3">
          <button class="btn-close" @click="closeModal"></button>
          <h5 class="modal-title mb-0">Détails de l'utilisateur</h5>
        </div>
        <div class="d-flex gap-2">
          <ul>
            <li>
              <button v-if="user.is_active" @click="blockUser(user)" class="btn btn-outline-danger btn-sm">
                Bloquer
              </button>
              <button v-else @click="unblockUser(user)" class="btn btn-outline-success btn-sm">Débloquer</button>
            </li>
          </ul>
        </div>
      </div>

      <!-- Corps du modal -->
      <div class="modal-body">
        <!-- Informations de base -->
        <div class="user-profile mb-4">
          <div class="text-center mb-3">
            <div class="avatar-large mx-auto">
              <img src="'../../../public/image/avatar.png'" alt="Avatar" />
            </div>
            <h4 class="mt-3 mb-1">{{ user.prenom }} {{ user.nom }}</h4>
            <span
              v-for="role in extractRolesAndPermissions(user).roles"
              :key="role"
              :class="getBadgeClass(role)"
            >
              {{ role }}
            </span>
          </div>
          <div class="text-center">
            <span
              :class="getStatusBadgeClass(userStatus)"
              style="font-size: 0.9rem"
            >
              {{ userStatus }}
            </span>
          </div>
        </div>

        <!-- Onglets d'information -->
        <ul class="nav nav-tabs nav-fill mb-3">
          <li class="nav-item" v-for="tab in detailTabs" :key="tab.id">
            <button
              class="nav-link"
              :class="{ active: activeTab === tab.id }"
              @click="activeTab = tab.id"
            >
              <i :class="tab.icon"></i> {{ tab.label }}
            </button>
          </li>
        </ul>

        <!-- Contenu des onglets -->
        <div class="tab-content">
          <!-- Informations personnelles -->
          <div v-show="activeTab === 'info'" class="tab-pane fade show active">
            <div class="info-list">
              <div class="info-item">
                <span class="info-label">
                  <i class="fas fa-envelope text-secondary"></i> Email
                </span>
                <span class="info-value">{{ user.email }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">
                  <i class="fas fa-phone text-secondary"></i> Téléphone
                </span>
                <span class="info-value">{{ user.telephone }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">
                  <i class="fas fa-map-marker-alt text-secondary"></i> Adresse
                </span>
                <span class="info-value">{{ user.adresse }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">
                  <i class="fas fa-map-marker-alt text-secondary"></i> Sexe
                </span>
                <span class="info-value">{{ user.sexe }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">
                  <i class="fas fa-map-marker-alt text-secondary"></i> Date de
                  Naissance
                </span>
                <span class="info-value">{{
                  formatDate(user.dateNaissance)
                }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">
                  <i class="fas fa-calendar text-secondary"></i> Date
                  d'inscription
                </span>
                <span class="info-value">{{
                  formatDate(user.date_inscription)
                }}</span>
              </div>
            </div>
          </div>

          <!-- Permissions -->
          <div
            v-show="activeTab === 'permissions'"
            class="tab-pane fade show active"
          >
            <div class="permissions-list">
              <div
                class="permission-group mb-4"
                v-for="group in extractRolesAndPermissions(user).permissions"
                :key="group.name"
              >
                <h6 class="permission-group-title">{{ group.name }}</h6>
                <div class="permission-items">
                  <div
                    class="permission-item"
                    v-for="perm in group.items"
                    :key="perm.id"
                  >
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <p class="permission-name mb-0">{{ perm.name }}</p>
                        <small class="text-secondary">{{
                          perm.description
                        }}</small>
                      </div>
                      <div class="form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          :checked="perm.granted"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { blockedUser, unblockedUser } from "@/services/utilisateurService";
import { ref, defineProps, defineEmits } from "vue";

defineProps({
  show: Boolean,
  user: {
    type: Object,
    required: true,
  },
  userStatus: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const activeTab = ref("info");

const detailTabs = [
  { id: "info", label: "Informations", icon: "fas fa-user" },
  { id: "permissions", label: "Permissions", icon: "fas fa-shield-alt" },
];

const closeModal = () => {
  emit("close");
};

// Fonction pour extraire les rôles et permissions
function extractRolesAndPermissions(user) {
  const rolesAndPermissions = user.roles_and_permissions;

  // Extraire les rôles
  const roles = rolesAndPermissions.map((role) => role.name);

  // Extraire les permissions
  // const permissions = rolesAndPermissions.flatMap((role) => role.permissions);
  const permissions = rolesAndPermissions.map((role) => ({
    name: role.name,
    items: role.permissions.map((perm) => ({
      id: perm,
      name: perm,
      description: perm, // vous devrez probablement récupérer une description réelle
      granted: true, // ou utiliser la valeur réelle
    })),
  }));

  return { roles, permissions };
}

// Convertion au format fr
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString("fr-FR", options);
}

const getBadgeClass = (role) => {
  const classes = {
    administrateur: "badge bg-warning",
    medecin: "badge bg-primary",
    patient: "badge bg-success",
    assistant: "badge bg-purple",
  };
  return classes[role] || "badge bg-secondary";
};

const getStatusBadgeClass = (userStatus) => {
  return userStatus == "Actif"
    ? "badge bg-success-light text-success"
    : "badge bg-danger-light text-danger";
};

// Bloquer un utilisateur
const blockUser = async (user) => {
  try {
    await blockedUser(user.id);
    user.is_active = false;
  } catch (error) {
    console.error("Erreur lors du blocage de l'utilisateur :", error);
  }
};

// Débloquer un utilisateur
const unblockUser = async (user) => {
  try {
    await unblockedUser(user.id);
    user.is_active = true;
  } catch (error) {
    console.error("Erreur lors du déblocage de l'utilisateur :", error);
  }
};

</script>

<style scoped>
ul {
  list-style: none;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
  z-index: 1050;
  opacity: 0;
  visibility: hidden;
  /* transition: opacity 0.1s ease, visibility 0.3s ease; */
  transition: all 0.3s ease;
}

.modal-overlay.show {
  opacity: 1;
  visibility: visible;
}

.side-modal {
  width: 35vw;
  background: white;
  height: 100vh;
  transform: translateX(100%);
  transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.side-modal.show {
  transform: translateX(0);
}

.modal-header {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-body {
  padding: 1rem;
  overflow-y: auto;
  height: calc(100vh - 70px);
}

.avatar-large {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #e9ecef;
  overflow: hidden;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-item {
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 0.5rem;
}

.info-label {
  display: block;
  color: #6c757d;
  margin-bottom: 0.5rem;
}

.info-value {
  font-weight: 500;
}

.permissions-list {
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  padding: 1rem;
}

.permission-group-title {
  color: #495057;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e9ecef;
}

.permission-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.permission-item {
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e9ecef;
}

.permission-name {
  font-weight: 500;
}

.activity-timeline {
  padding: 1rem;
}

.activity-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  position: relative;
}

.activity-item:not(:last-child):before {
  content: "";
  position: absolute;
  left: 15px;
  top: 30px;
  bottom: -20px;
  width: 2px;
  background-color: #e9ecef;
}

.activity-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.activity-content {
  flex: 1;
}

.nav-tabs .nav-link {
  border: none;
  color: #6c757d;
}

.nav-tabs .nav-link.active {
  color: #0d6efd;
  border-bottom: 2px solid #0d6efd;
}

.form-check-input:checked {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.bg-success-light {
  background-color: #d1fae5;
}

.bg-danger-light {
  background-color: #fee2e2;
}
</style>
