<!-- UserManagement.vue -->
<template>
  <div class="container-fluid py-4">
    <!-- Navigation par onglets -->
    <ul class="nav nav-tabs" role="tablist">
      <li class="nav-item" role="presentation">
        <button 
          class="nav-link" 
          :class="{ active: activeTab === 'add-user' }"
          @click="activeTab = 'add-user'"
        >
          <i class="bi bi-person-plus me-2"></i>
          Ajouter Utilisateur
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button 
          class="nav-link" 
          :class="{ active: activeTab === 'roles' }"
          @click="activeTab = 'roles'"
        >
          <i class="bi bi-shield me-2"></i>
          Gestion des Rôles
        </button>
      </li>
    </ul>

    <!-- Contenu des onglets -->
    <div class="tab-content mt-4">
      <!-- Formulaire d'ajout d'utilisateur -->
      <div v-show="activeTab === 'add-user'" class="tab-pane fade show active">
        <div class="card">
          <div class="card-header bg-white">
            <h5 class="card-title mb-0">
              <i class="bi bi-person-plus me-2"></i>
              Nouvel Utilisateur
            </h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleAddUser" class="needs-validation" novalidate>
              <div class="row g-3">
                <div class="col-md-6">
                  <div class="form-floating">
                    <input
                      type="text"
                      class="form-control"
                      id="firstName"
                      v-model="newUser.firstName"
                      required
                    >
                    <label for="firstName">Prénom</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-floating">
                    <input
                      type="text"
                      class="form-control"
                      id="lastName"
                      v-model="newUser.lastName"
                      required
                    >
                    <label for="lastName">Nom</label>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-floating">
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      v-model="newUser.email"
                      required
                    >
                    <label for="email">Email</label>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-floating">
                    <select 
                      class="form-select" 
                      id="role"
                      v-model="newUser.roleId"
                      required
                    >
                      <option value="" disabled>Sélectionner un rôle</option>
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
                  <button type="submit" class="btn btn-primary w-100">
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
      <div v-show="activeTab === 'roles'" class="tab-pane fade show active">
        <div class="card">
          <div class="card-header bg-white">
            <h5 class="card-title mb-0">
              <i class="bi bi-shield me-2"></i>
              Gestion des Rôles
            </h5>
          </div>
          <div class="card-body">
            <!-- Liste des rôles existants -->
            <div class="mb-4">
              <h6 class="mb-3">Rôles existants</h6>
              <div class="list-group">
                <div 
                  v-for="role in roles" 
                  :key="role.id" 
                  class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                >
                  <div>
                    <h6 class="mb-0">{{ role.name }}</h6>
                    <small class="text-muted">
                      {{ role.permissions.length }} permissions
                    </small>
                  </div>
                  <button 
                    class="btn btn-outline-primary btn-sm"
                    @click="editRole(role)"
                  >
                    <i class="bi bi-pencil me-1"></i>
                    Modifier
                  </button>
                </div>
              </div>
            </div>

            <!-- Formulaire d'ajout/modification de rôle -->
            <div class="card">
              <div class="card-body">
                <h6 class="card-title mb-3">
                  <i class="bi bi-plus-circle me-2"></i>
                  {{ editingRole ? 'Modifier le rôle' : 'Nouveau rôle' }}
                </h6>
                <form @submit.prevent="handleRoleSubmit">
                  <div class="mb-3">
                    <label for="roleName" class="form-label">Nom du rôle</label>
                    <input
                      type="text"
                      class="form-control"
                      id="roleName"
                      v-model="newRole.name"
                      required
                    >
                  </div>
                  
                  <div class="mb-3">
                    <label class="form-label d-block">Permissions</label>
                    <div class="row g-3">
                      <div 
                        v-for="(permission, index) in permissions" 
                        :key="index"
                        class="col-md-6"
                      >
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            :id="'permission-' + index"
                            v-model="newRole.permissions"
                            :value="permission"
                          >
                          <label 
                            class="form-check-label" 
                            :for="'permission-' + index"
                          >
                            {{ permission }}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="d-flex gap-2">
                    <button type="submit" class="btn btn-primary">
                      <i class="bi" :class="editingRole ? 'bi-check-circle' : 'bi-plus-circle'"></i>
                      {{ editingRole ? 'Modifier' : 'Ajouter' }} le rôle
                    </button>
                    <button 
                      v-if="editingRole"
                      type="button" 
                      class="btn btn-outline-secondary"
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
    <div 
      class="toast-container position-fixed bottom-0 end-0 p-3"
      style="z-index: 1056"
    >
      <div 
        class="toast"
        :class="{ show: showToast }"
        role="alert"
      >
        <div class="toast-header">
          <i 
            class="bi me-2"
            :class="toastType === 'success' ? 'bi-check-circle-fill text-success' : 'bi-x-circle-fill text-danger'"
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
</template>

<script setup>
import { ref, reactive } from 'vue'

// États
const activeTab = ref('add-user')
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success')
const editingRole = ref(null)

// Données exemple
const roles = ref([
  { id: 1, name: 'Admin', permissions: ['all'] },
  { id: 2, name: 'Manager', permissions: ['read', 'write'] },
  { id: 3, name: 'User', permissions: ['read'] }
])

const permissions = [
  'Gérer les utilisateurs',
  'Gérer les rôles',
  'Voir les rapports',
  'Éditer les contenus',
  'Gérer les documents',
  'Accès aux statistiques'
]

// États du formulaire
const newUser = reactive({
  firstName: '',
  lastName: '',
  email: '',
  roleId: ''
})

const newRole = reactive({
  name: '',
  permissions: []
})

// Méthodes
const showNotification = (message, type = 'success') => {
  toastMessage.value = message
  toastType.value = type
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

const handleAddUser = () => {
  // Validation basique
  if (!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.roleId) {
    showNotification('Veuillez remplir tous les champs', 'error')
    return
  }
  
  // Simulation d'ajout
  console.log('Nouvel utilisateur:', newUser)
  showNotification('Utilisateur ajouté avec succès')
  
  // Réinitialisation du formulaire
  Object.keys(newUser).forEach(key => newUser[key] = '')
}

const editRole = (role) => {
  editingRole.value = role.id
  newRole.name = role.name
  newRole.permissions = [...role.permissions]
}

const cancelEdit = () => {
  editingRole.value = null
  newRole.name = ''
  newRole.permissions = []
}

const handleRoleSubmit = () => {
  if (!newRole.name) {
    showNotification('Veuillez spécifier un nom de rôle', 'error')
    return
  }

  if (editingRole.value) {
    // Simulation de modification
    const index = roles.value.findIndex(r => r.id === editingRole.value)
    if (index !== -1) {
      roles.value[index] = {
        ...roles.value[index],
        name: newRole.name,
        permissions: [...newRole.permissions]
      }
    }
    showNotification('Rôle modifié avec succès')
  } else {
    // Simulation d'ajout
    roles.value.push({
      id: roles.value.length + 1,
      name: newRole.name,
      permissions: [...newRole.permissions]
    })
    showNotification('Rôle ajouté avec succès')
  }

  cancelEdit()
}
</script>

<style scoped>
.tab-content {
  animation: fadeIn 0.3s ease-in-out;
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

.toast {
  transition: opacity 0.3s ease-in-out;
}

.toast.show {
  opacity: 1;
}
</style>