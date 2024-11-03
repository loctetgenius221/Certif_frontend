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
          <BtnRetour/>
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
            <!--* ----------------------------------------- -->
            <!--*       Formulaire d'ajout d'utilisateur    -->
            <!--* ----------------------------------------- -->

            <div
              v-show="activeTab === 'add-user'"
              class="tab-pane fade show active"
            >
              <div class="card custom-card">
                <div class="card-header gradient-header">
                  <h5 class="card-title mb-0">
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
                            :class="{ 'is-invalid': errors.prenom }"
                            id="prenom"
                            v-model="newUser.prenom"
                            required
                          />
                          <label for="prenom">Prénom</label>
                          <div class="invalid-feedback" v-if="errors.prenom">
                            {{ errors.prenom }}
                          </div>
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="form-floating custom-float">
                          <input
                            type="text"
                            class="form-control custom-input"
                            :class="{ 'is-invalid': errors.nom }"
                            id="nom"
                            v-model="newUser.nom"
                            required
                          />
                          <label for="nom">Nom</label>
                          <div class="invalid-feedback" v-if="errors.nom">
                            {{ errors.nom }}
                          </div>
                        </div>
                      </div>

                      <div class="col-12">
                        <div class="form-floating custom-float">
                          <input
                            type="email"
                            class="form-control custom-input"
                            :class="{ 'is-invalid': errors.email }"
                            id="email"
                            v-model="newUser.email"
                            required
                          />
                          <label for="email">Email</label>
                          <div class="invalid-feedback" v-if="errors.email">
                            {{ errors.email }}
                          </div>
                        </div>
                      </div>

                      <div class="col-12">
                        <div class="form-floating custom-float">
                          <input
                            type="tel"
                            class="form-control custom-input"
                            :class="{ 'is-invalid': errors.telephone }"
                            id="telephone"
                            v-model="newUser.telephone"
                            required
                          />
                          <label for="telephone">Téléphone</label>
                          <div class="invalid-feedback" v-if="errors.telephone">
                            {{ errors.telephone }}
                          </div>
                        </div>
                      </div>

                      <div class="col-12">
                        <div class="form-floating custom-float">
                          <select
                            class="form-select custom-select"
                            :class="{ 'is-invalid': errors.roleId }"
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
                              {{ role.role_name }}
                            </option>
                          </select>
                          <label for="role">Rôle</label>
                          <div class="invalid-feedback" v-if="errors.roleId">
                            {{ errors.roleId }}
                          </div>
                        </div>
                      </div>

                      <div class="col-12">
                        <button
                          type="submit"
                          class="btn custom-button btn-lg"
                          :disabled="!isFormValid || isSubmitting"
                        >
                          <span
                            v-if="isSubmitting"
                            class="spinner-border spinner-border-sm me-2"
                            role="status"
                          ></span>
                          <i v-else class="bi bi-plus-circle me-2"></i>
                          {{
                            isSubmitting
                              ? "Enregistrement..."
                              : "Ajouter l'utilisateur"
                          }}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <!--* --------------------------- -->
            <!--*      Gestion des rôles      -->
            <!--* --------------------------- -->

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
                              <h6 class="role-name mb-1">
                                {{ role.role_name }}
                              </h6>
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
                                  {{ permission.name }}
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
          <div class="toast-container position-fixed bottom-1 end-0 p-3">
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
import BtnRetour from "@/components/BtnRetour.vue";
import { ref, reactive, onMounted, computed, watch } from "vue";
import {
  getRolesAndPermissions,
  registerUsers,
} from "@/services/utilisateurService";
import Swal from "sweetalert2";

// États
const activeTab = ref("add-user");
const showToast = ref(false);
const toastMessage = ref("");
const toastType = ref("success");
const editingRole = ref(null);

const roles = ref([]);
const permissions = ref([]);

// Fonction pour récupérer les rôles et permissions
const fetchRolesAndPermissions = async () => {
  try {
    const data = await getRolesAndPermissions();
    roles.value = data.roles_and_permissions || [];
    permissions.value = data.All_permissions || [];
    console.log("Liste des rôles :", roles.value);
    console.log("Liste des permissions :", permissions.value);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des rôles et permissions :",
      error.message
    );
  }
};

// États du formulaire pour le nouvel utilisateur
const newUser = reactive({
  prenom: "",
  nom: "",
  email: "",
  telephone: "",
  roleId: "",
  password: ""
});

// Logique de génération automatique de mot de passe
const generateRandomPassword = (length = 10) => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};


// Watcher pour surveiller les changements de roleId
watch(
  () => newUser.roleId,
  (newRoleId) => {
    console.log("Role ID sélectionné :", newRoleId);
  }
);

// États du formulaire pour le nouveau rôle
const newRole = reactive({
  name: "",
  permissions: [],
});

// Méthode pour afficher les notifications
const showNotification = (message, type = "success") => {
  toastMessage.value = message;
  toastType.value = type;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

// État pour les erreurs de validation
const errors = ref({});

// Computed property pour la validation du formulaire
const isFormValid = computed(() => {
  return (
    newUser.prenom.trim() !== "" &&
    newUser.nom.trim() !== "" &&
    validateEmail(newUser.email) &&
    validatePhone(newUser.telephone) &&
    newUser.roleId !== ""
  );
});

// Fonctions de validation
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (telephone) => /^7[0678]\d{7}$/.test(telephone);

// Fonction de validation du formulaire
const validateForm = () => {
  const newErrors = {};

  if (!newUser.prenom.trim()) {
    newErrors.prenom = "Le prénom est requis";
  }

  if (!newUser.nom.trim()) {
    newErrors.nom = "Le nom est requis";
  }

  if (!newUser.email.trim() || !validateEmail(newUser.email)) {
    newErrors.email = "L'email est invalide";
  }

  if (!newUser.telephone.trim() || !validatePhone(newUser.telephone)) {
    newErrors.telephone = "Le numéro de téléphone est invalide";
  }

  if (!newUser.roleId) {
    newErrors.roleId = "Le rôle est requis";
  }

  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

// État de chargement
const isSubmitting = ref(false);

// Gestion de l'ajout d'utilisateur
const handleAddUser = async () => {
  if (!validateForm()) {
    console.log("les données :", newUser);
    return;
  }

  try {
    isSubmitting.value = true;
    newUser.password = generateRandomPassword();

    // Récupérer le rôle correspondant à roleId
    const role = roles.value.find(
      (role) => role.id === newUser.roleId
    )?.role_name;

    console.log("Le role de user:", role)
    if (!role) {
      throw new Error("Rôle non valide sélectionné.");
    }
    await registerUsers(role, newUser);

    await Swal.fire({
      title: "Succès!",
      text: "L'utilisateur a été créé avec succès.",
      icon: "success",
      confirmButtonText: "OK",
    });

    // Réinitialisation du formulaire
    Object.keys(newUser).forEach((key) => {
      newUser[key] = "";
    });
    errors.value = {};
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "Une erreur est survenue lors de l'inscription.";

    await Swal.fire({
      title: "Erreur!",
      text: errorMessage,
      icon: "error",
      confirmButtonText: "OK",
    });
  } finally {
    isSubmitting.value = false;
  }
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
    roles.value.push({
      id: roles.value.length + 1,
      name: newRole.name,
      permissions: [...newRole.permissions],
    });
    showNotification("Rôle ajouté avec succès");
  }

  cancelEdit();
};

// Exécution de fetchRolesAndPermissions lors du montage
onMounted(fetchRolesAndPermissions);
</script>

<style scoped>
.user-management {
  --primary-color: #319fe9;
  --primary-dark: #2980b9;
  --primary-light: #818cf8;
  --success-color: #059669;
  --danger-color: #dc2626;
  --bg-gradient: linear-gradient(
    135deg,
    var(--primary-color),
    var(--primary-dark)
  );
}

.header-section {
  /* background: var(--bg-gradient); */
  background: #fff;
  margin-top: -60px;
  position: relative;
  z-index: 10;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  color: #000;
}

.header-section h2 {
  font-size: 20px;
}

.header-section .bi-people-fill {
  color: #2980b9;
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
  transition: all 0.2s ease;
}

.custom-tab-link:hover {
  background-color: #f3f4f6;
  color: var(--primary-color);
}

.custom-tab-link.active {
  background: var(--bg-gradient);
  color: #fff;
  font-weight: bold;
}

.custom-card {
  border: none;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.custom-card h5.card-title {
  font-size: 18px;
}

.custom-card h5 .bi-person-plus {
  color: #2980b9;
}

.gradient-header {
  /* background: var(--bg-gradient); */
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
  background: #fff;
  border: none;
  color: black;
  font-size: 18px;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  transition: all 0.4s ease;
  border: 1px solid black;
}

.custom-button:hover {
  font-weight: 500;
  color: white;
  border: none;
  background: var(--bg-gradient);
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
  background-color: var(--success-color);
  color: white;
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
