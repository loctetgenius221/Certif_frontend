<template>
  <div class="d-flex">
    <SidebarAdmin />
    <div class="section-content">
      <HeaderPatient />
      <div class="section-container">
          <!-- En-tête -->
          <div class="row mb-4">
            <div class="col">
              <h2 class="h4">Gestion des Dossiers Médicaux Électroniques</h2>
            </div>
          </div>

          <!-- Navigation -->
          <div class="row mb-4">
            <div class="col">
              <ul class="nav nav-tabs">
                <li class="nav-item">
                  <a
                    class="nav-link"
                    :class="{ active: currentTab === 'liste' }"
                    @click="currentTab = 'liste'"
                    href="#"
                  >
                    Liste des dossiers
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    :class="{ active: currentTab === 'modeles' }"
                    @click="currentTab = 'modeles'"
                    href="#"
                  >
                    Modèles de documents
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    :class="{ active: currentTab === 'archive' }"
                    @click="currentTab = 'archive'"
                    href="#"
                  >
                    Archives
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    :class="{ active: currentTab === 'permissions' }"
                    @click="currentTab = 'permissions'"
                    href="#"
                  >
                    Permissions
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <!-- Contenu principal -->
          <div class="row">
            <!-- Section Liste des dossiers -->
            <div v-if="currentTab === 'liste'" class="col-12">
              <div class="card">
                <div class="card-header bg-light">
                  <div class="row align-items-center">
                    <div class="col">
                      <input
                        v-model="searchQuery"
                        type="search"
                        class="form-control"
                        placeholder="Rechercher un dossier..."
                        @input="searchDossiers"
                      />
                    </div>
                    <div class="col-auto">
                      <button class="btn btn-primary">Nouveau dossier</button>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <div v-if="loading" class="text-center">
                    <div class="spinner-border" role="status">
                      <span class="visually-hidden">Chargement...</span>
                    </div>
                  </div>
                  <div v-else-if="error" class="alert alert-danger">
                    {{ error }}
                  </div>
                  <div v-else class="table-responsive">
                    <table class="table table-hover">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Patient</th>
                          <th>Date de création</th>
                          <th>Statut</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="dossier in searchDossiers()"
                          :key="dossier.id"
                          @click="selectDossier(dossier)"
                          :class="{
                            'table-active': selectedDossier?.id === dossier.id,
                          }"
                        >
                          <td>{{ dossier.id }}</td>
                          <td>{{ dossier.patient }}</td>
                          <td>{{ dossier.dateCreation }}</td>
                          <td>
                            <span
                              class="badge"
                              :class="
                                dossier.statut === 'actif'
                                  ? 'bg-success'
                                  : 'bg-secondary'
                              "
                            >
                              {{ dossier.statut }}
                            </span>
                          </td>
                          <td>
                            <div class="btn-group">
                              <button class="btn btn-sm btn-outline-primary">
                                Voir
                              </button>
                              <button class="btn btn-sm btn-outline-secondary">
                                Éditer
                              </button>
                              <button class="btn btn-sm btn-outline-danger">
                                Archiver
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <!-- Section Modèles de documents -->
            <div v-if="currentTab === 'modeles'" class="col-12">
              <div class="card">
                <div class="card-header">
                  <h5 class="card-title mb-0">Modèles de documents</h5>
                </div>
                <div class="card-body">
                  <div class="row mb-3">
                    <div class="col">
                      <button class="btn btn-primary" @click="ajouterModele">
                        Nouveau modèle
                      </button>
                    </div>
                  </div>
                  <div class="list-group">
                    <a
                      href="#"
                      class="list-group-item list-group-item-action"
                      v-for="modele in modelesDocs"
                      :key="modele.id"
                    >
                      <div class="d-flex w-100 justify-content-between">
                        <h6 class="mb-1">{{ modele.nom }}</h6>
                        <small>{{ modele.dateCreation }}</small>
                      </div>
                      <p class="mb-1">{{ modele.description }}</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Section Permissions -->
            <div v-if="currentTab === 'permissions'" class="col-12">
              <div class="card">
                <div class="card-header">
                  <h5 class="card-title mb-0">Gestion des permissions</h5>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>Rôle</th>
                          <th>Lecture</th>
                          <th>Écriture</th>
                          <th>Modification</th>
                          <th>Suppression</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="perm in permissions" :key="perm.role">
                          <td>{{ perm.role }}</td>
                          <td>
                            <input
                              type="checkbox"
                              class="form-check-input"
                              v-model="perm.lecture"
                              @change="updatePermissions"
                            />
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              class="form-check-input"
                              v-model="perm.ecriture"
                              @change="updatePermissions"
                            />
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              class="form-check-input"
                              v-model="perm.modification"
                              @change="updatePermissions"
                            />
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              class="form-check-input"
                              v-model="perm.suppression"
                              @change="updatePermissions"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
import SidebarAdmin from "@/components/SidebarAdmin.vue";
import HeaderPatient from "@/components/HeaderPatient.vue";
import { ref, onMounted } from "vue";
import { getDossierMedicalList } from "@/services/dossiermedicalService";

// États réactifs
const dossiers = ref([]);
const selectedDossier = ref(null);
const searchQuery = ref("");
const currentTab = ref("liste"); // liste, modeles, archive, permissions
const modelesDocs = ref([]);
const permissions = ref([]);
const loading = ref(false);
const error = ref(null);

// Fonctions de gestion des dossiers
const fetchDossiers = async () => {
  loading.value = true;
  try {
    // Simulation d'appel API
    const response = await getDossierMedicalList();
    dossiers.value = await response.data;
    console.log("Response api dossier médical :",dossiers.value)
  } catch (e) {
    error.value = "Erreur lors du chargement des dossiers";
  } finally {
    loading.value = false;
  }
};

const selectDossier = (dossier) => {
  selectedDossier.value = dossier;
};

const searchDossiers = () => {
  return dossiers.value;
  
  // .filter((dossier) =>
  //   dossier.patient.toLowerCase().includes(searchQuery.value.toLowerCase())
  // );
};

// Gestion des modèles
const ajouterModele = () => {
  // Logique d'ajout de modèle
};

// Gestion des permissions
const updatePermissions = () => {
  // Logique de mise à jour des permissions
};

// Appel initial
onMounted(() => {
  fetchDossiers();
});
</script>


<style scoped>
.nav-tabs .nav-link {
  cursor: pointer;
}

.table tr {
  cursor: pointer;
}

.card {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.table-responsive {
  min-height: 400px;
}
</style>
