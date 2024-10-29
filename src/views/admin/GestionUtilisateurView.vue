<!-- UserManagement.vue -->
<template>
  <div class="d-flex">
    <SidebarAdmin />
    <div class="section-content">
      <HeaderPatient />
      <div class="section-container">
        <div class="container-fluid py-4 user-management">
          <!-- En-tête de la page -->
          <div class="header-section mb-4 p-4 rounded-3">
            <h2 class="text-dark mb-3">
              <i class="bi bi-people-fill me-2"></i>
              Gestion des Utilisateurs
            </h2>
            <p class="text-dark mb-0">
              Gérez vos utilisateurs et leurs accès en toute simplicité
            </p>
          </div>

          <!-- Navigation par onglets -->
          <ul class="nav custom-tabs mb-4" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link custom-tab-link"
                :class="{ active: activeTab === 'add-user' }"
                @click="activeTab = 'add-user'"
              >
                <i class="bi bi-person-plus me-2"></i>
                Ajouter Utilisateur
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link custom-tab-link"
                :class="{ active: activeTab === 'roles' }"
                @click="activeTab = 'roles'"
              >
                <i class="bi bi-shield me-2"></i>
                Gestion des Rôles
              </button>
            </li>
          </ul>

          <!-- Contenu des onglets -->
          <div class="tab-content">
            <!-- Formulaire d'ajout d'utilisateur -->
            <div
              v-show="activeTab === 'add-user'"
              class="tab-pane fade show active"
            >
              <div class="card custom-card">
                <div class="card-header gradient-header">
                  <h5 class="card-title text-dark mb-0">
                    <i class="bi bi-person-plus me-2"></i>
                    Nouvel Utilisateur
                  </h5>
                </div>
                <div class="card-body p-4">
                  <form
                    @submit.prevent="handleAddUser"
                    class="needs-validation"
                    novalidate
                  >
                    <div class="row g-4">
                      <div class="col-md-6">
                        <div class="form-floating custom-float">
                          <input
                            type="text"
                            class="form-control custom-input"
                            id="firstName"
                            v-model="newUser.firstName"
                            required
                          />
                          <label for="firstName">Prénom</label>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-floating custom-float">
                          <input
                            type="text"
                            class="form-control custom-input"
                            id="lastName"
                            v-model="newUser.lastName"
                            required
                          />
                          <label for="lastName">Nom</label>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="form-floating custom-float">
                          <input
                            type="email"
                            class="form-control custom-input"
                            id="email"
                            v-model="newUser.email"
                            required
                          />
                          <label for="email">Email</label>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="form-floating custom-float">
                          <select
                            class="form-select custom-select"
                            id="role"
                            v-model="newUser.roleId"
                            required
                          >
                            <option value="" disabled>
                              Sélectionner un rôle
                            </option>
                            <option
                              v-for="role in roles"
                              :key="role.id"
                              :value="role.id"
                            >
                              {{ role.name }}
                            </option>
                          </select>
                          <label for="role">Rôle</label>
                        </div>
                      </div>
                      <div class="col-12">
                        <button
                          type="submit"
                          class="btn custom-button btn-lg w-100"
                        >
                          <i class="bi bi-plus-circle me-2"></i>
                          Ajouter l'utilisateur
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <!-- Gestion des rôles -->
            <div
              v-show="activeTab === 'roles'"
              class="tab-pane fade show active"
            >
              <div class="card custom-card">
                <div class="card-header gradient-header">
                  <h5 class="card-title text-dark mb-0">
                    <i class="bi bi-shield me-2"></i>
                    Gestion des Rôles
                  </h5>
                </div>
                <div class="card-body p-4">
                  <!-- Liste des rôles existants -->
                  <div class="roles-list mb-4">
                    <h6 class="section-title mb-3">Rôles existants</h6>
                    <div class="row g-3">
                      <div
                        v-for="role in roles"
                        :key="role.id"
                        class="col-md-6"
                      >
                        <div class="role-card p-3 rounded-3">
                          <div
                            class="d-flex justify-content-between align-items-center"
                          >
                            <div>
                              <h6 class="role-name mb-1">{{ role.name }}</h6>
                              <div class="permission-badges">
                                <span
                                  v-for="(
                                    permission, idx
                                  ) in role.permissions.slice(0, 2)"
                                  :key="idx"
                                  class="badge rounded-pill me-1"
                                >
                                  {{ permission }}
                                </span>
                                <span
                                  v-if="role.permissions.length > 2"
                                  class="badge rounded-pill bg-light text-dark"
                                >
                                  +{{ role.permissions.length - 2 }}
                                </span>
                              </div>
                            </div>
                            <button
                              class="btn btn-light btn-sm edit-button"
                              @click="editRole(role)"
                            >
                              <i class="bi bi-pencil me-1"></i>
                              Modifier
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Formulaire d'ajout/modification de rôle -->
                  <div class="card custom-card-inner">
                    <div class="card-body">
                      <h6 class="section-title mb-3">
                        <i
                          class="bi"
                          :class="
                            editingRole ? 'bi-pencil-square' : 'bi-plus-circle'
                          "
                        ></i>
                        {{ editingRole ? "Modifier le rôle" : "Nouveau rôle" }}
                      </h6>
                      <form @submit.prevent="handleRoleSubmit">
                        <div class="mb-4">
                          <div class="form-floating custom-float">
                            <input
                              type="text"
                              class="form-control custom-input"
                              id="roleName"
                              v-model="newRole.name"
                              required
                            />
                            <label for="roleName">Nom du rôle</label>
                          </div>
                        </div>

                        <div class="permissions-section">
                          <label class="form-label d-block section-title"
                            >Permissions</label
                          >
                          <div class="row g-3">
                            <div
                              v-for="(permission, index) in permissions"
                              :key="index"
                              class="col-md-6"
                            >
                              <div class="permission-checkbox">
                                <input
                                  class="form-check-input custom-checkbox"
                                  type="checkbox"
                                  :id="'permission-' + index"
                                  v-model="newRole.permissions"
                                  :value="permission"
                                />
                                <label
                                  class="form-check-label ms-2"
                                  :for="'permission-' + index"
                                >
                                  {{ permission }}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="d-flex gap-2 mt-4">
                          <button type="submit" class="btn custom-button">
                            <i
                              class="bi"
                              :class="
                                editingRole
                                  ? 'bi-check-circle'
                                  : 'bi-plus-circle'
                              "
                            ></i>
                            {{ editingRole ? "Modifier" : "Ajouter" }} le rôle
                          </button>
                          <button
                            v-if="editingRole"
                            type="button"
                            class="btn btn-light"
                            @click="cancelEdit"
                          >
                            Annuler
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Toast de notification -->
          <div class="toast-container position-fixed bottom-0 end-0 p-3">
            <div
              class="toast custom-toast"
              :class="{
                show: showToast,
                'success-toast': toastType === 'success',
                'error-toast': toastType === 'error',
              }"
              role="alert"
            >
              <div class="toast-header">
                <i
                  class="bi me-2"
                  :class="
                    toastType === 'success'
                      ? 'bi-check-circle-fill text-success'
                      : 'bi-x-circle-fill text-danger'
                  "
                ></i>
                <strong class="me-auto">Notification</strong>
                <button
                  type="button"
                  class="btn-close"
                  @click="showToast = false"
                ></button>
              </div>
              <div class="toast-body">
                {{ toastMessage }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SidebarAdmin from "@/components/SidebarAdmin.vue";
import HeaderPatient from "@/components/HeaderPatient.vue";
import { ref, reactive } from "vue";

// États
const activeTab = ref("add-user");
const showToast = ref(false);
const toastMessage = ref("");
const toastType = ref("success");
const editingRole = ref(null);

// Données exemple
const roles = ref([
  { id: 1, name: "Admin", permissions: ["all"] },
  { id: 2, name: "Medecin", permissions: ["read", "write"] },
  { id: 3, name: "Patient", permissions: ["read"] },
  { id: 4, name: "Assistant", permissions: ["read"] },
]);

const permissions = [
  "Gérer les utilisateurs",
  "Gérer les rôles",
  "Voir les rapports",
  "Éditer les contenus",
  "Gérer les documents",
  "Accès aux statistiques",
];

// États du formulaire
const newUser = reactive({
  firstName: "",
  lastName: "",
  email: "",
  roleId: "",
});

const newRole = reactive({
  name: "",
  permissions: [],
});

// Méthodes
const showNotification = (message, type = "success") => {
  toastMessage.value = message;
  toastType.value = type;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

const handleAddUser = () => {
  // Validation basique
  if (
    !newUser.firstName ||
    !newUser.lastName ||
    !newUser.email ||
    !newUser.roleId
  ) {
    showNotification("Veuillez remplir tous les champs", "error");
    return;
  }

  // Simulation d'ajout
  console.log("Nouvel utilisateur:", newUser);
  showNotification("Utilisateur ajouté avec succès");

  // Réinitialisation du formulaire
  Object.keys(newUser).forEach((key) => (newUser[key] = ""));
};

const editRole = (role) => {
  editingRole.value = role.id;
  newRole.name = role.name;
  newRole.permissions = [...role.permissions];
};

const cancelEdit = () => {
  editingRole.value = null;
  newRole.name = "";
  newRole.permissions = [];
};

const handleRoleSubmit = () => {
  if (!newRole.name) {
    showNotification("Veuillez spécifier un nom de rôle", "error");
    return;
  }

  if (editingRole.value) {
    // Simulation de modification
    const index = roles.value.findIndex((r) => r.id === editingRole.value);
    if (index !== -1) {
      roles.value[index] = {
        ...roles.value[index],
        name: newRole.name,
        permissions: [...newRole.permissions],
      };
    }
    showNotification("Rôle modifié avec succès");
  } else {
    // Simulation d'ajout
    roles.value.push({
      id: roles.value.length + 1,
      name: newRole.name,
      permissions: [...newRole.permissions],
    });
    showNotification("Rôle ajouté avec succès");
  }

  cancelEdit();
};
</script>

<style scoped>
.user-management {
  /* --primary-color: #319fe9; */
  /* --primary-dark: #2980B9; */
  --primary-light: #818cf8;
  --success-color: #059669;
  --danger-color: #dc2626;
  /* --bg-gradient: linear-gradient(
    135deg,
    var(--primary-color),
    var(--primary-dark) 
  ); */
}

.header-section {
  background: var(--bg-gradient);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  color: #000;
}

.custom-tabs {
  border-bottom: none;
  gap: 0.5rem;
}

.custom-tab-link {
  color: #6b7280;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  transition: all 0.3s ease;
}

.custom-tab-link:hover {
  background-color: #f3f4f6;
  color: var(--primary-color);
}

.custom-tab-link.active {
  background: var(--bg-gradient);
  color: black;
}

.custom-card {
  border: none;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.gradient-header {
  background: var(--bg-gradient);
  padding: 1.5rem;
  border-bottom: none;
}

.custom-input,
.custom-select {
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem 0.75rem;
  transition: all 0.3s ease;
}

.custom-input:focus,
.custom-select:focus {
  border-color: var(--primary-light);
  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
}

.custom-button {
  background: var(--bg-gradient);
  border: none;
  color: black;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  border: 1px solid black;
}

.custom-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.role-card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.role-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.role-name {
  color: var(--primary-color);
}

.permission-badges .badge {
  background-color: var(--primary-light);
  color: black;
  font-weight: 500;
}

.custom-card-inner {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
}

.section-title {
  color: var(--primary-color);
  font-weight: 600;
}

.permission-checkbox {
  background: white;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.permission-checkbox:hover {
  border-color: var(--primary-light);
}

.custom-checkbox {
  width: 1.25rem;
  height: 1.25rem;
  border-color: var(--primary-light);
}

.custom-checkbox:checked {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.custom-toast {
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.success-toast {
  border-left: 4px solid var(--success-color);
}

.error-toast {
  border-left: 4px solid var(--danger-color);
}

/* Animations */
.tab-content {
  animation: fadeIn 0.3s ease-in-out;
}

.role-card,
.permission-checkbox {
  animation: slideIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
