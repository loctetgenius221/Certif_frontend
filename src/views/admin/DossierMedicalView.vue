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
        <nav class="tabs-navigation mb-4 mt-4">
          <div
            class="nav nav-tabs border-0 d-flex justify-content-start"
            role="tablist"
          >
            <div
              v-for="(tab, index) in tabs"
              :key="index"
              class="nav-item position-relative mx-2"
            >
              <button
                class="nav-link position-relative border-0 rounded-0 py-2 px-4 text-capitalize"
                :class="{
                  'active-tab': currentTab === tab.id,
                  'inactive-tab': currentTab !== tab.id,
                }"
                @click="currentTab = tab.id"
                role="tab"
              >
                <div class="d-flex align-items-center">
                  <i :class="tab.icon" class="me-2"></i>
                  {{ tab.name }}

                  <!-- Indicateur d'état pour certains tabs -->
                  <span
                    v-if="tab.badge"
                    class="badge bg-primary rounded-circle ms-2 d-flex align-items-center justify-content-center"
                    style="width: 20px; height: 20px; font-size: 0.7rem"
                  >
                    {{ tab.badge }}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </nav>

        <!-- Contenu principal -->
        <div class="row">
          <!-- Section Liste des dossiers -->
          <div v-if="currentTab === 'liste'" class="col-12 p-4 bg-light">
            <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
              <div class="card-header p-4 bg-white border-bottom">
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
                        v-for="dossier in filteredDossiers"
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
import { ref, onMounted, computed, defineExpose } from "vue";
import { getDossierMedicalList } from "@/services/dossiermedicalService";

// États réactifs
const dossiers = ref([]);
const selectedDossier = ref(null);
const searchQuery = ref("");
const currentTab = ref("liste");
const permissions = ref([
  { 
    role: 'Administrateur', 
    lecture: true, 
    ecriture: true, 
    modification: true, 
    suppression: true 
  },
  { 
    role: 'Médecin', 
    lecture: true, 
    ecriture: true, 
    modification: true, 
    suppression: false 
  },
  { 
    role: 'Infirmier', 
    lecture: true, 
    ecriture: true, 
    modification: false, 
    suppression: false 
  }
]);
const loading = ref(false);
const error = ref(null);

const tabs = [
  { id: "liste", name: "Liste des dossiers", icon: "bi bi-clipboard-check" },
  { id: "archive", name: "Archives", icon: "bi bi-archive" },
  { id: "permissions", name: "Permissions", icon: "bi bi-person-gear" },
];

// Fonctions de gestion des dossiers
const fetchDossiers = async () => {
  loading.value = true;
  try {
    const response = await getDossierMedicalList();
    dossiers.value = response.data.map(dossier => ({
      ...dossier,
      dateCreation: new Date(dossier.created_at).toLocaleDateString(),
      statut: new Date(dossier.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) ? 'actif' : 'archivé',
      patient: `${dossier.patient.numero_patient} - ${dossier.patient.user.prenom} ${dossier.patient.user.nom}`,
      details: {
        antecedents: dossier.antecedents_medicaux || '[]',
        infoSup: dossier.info_sup || '[]',
        interventions: dossier.intervention_chirurgicale,
        traitements: dossier.traitements,
        notes: dossier.notes_observations
      }
    }));
  } catch (e) {
    error.value = "Erreur lors du chargement des dossiers";
    console.error(e);
  } finally {
    loading.value = false;
  }
};

// Recherche et filtrage des dossiers
const filteredDossiers = computed(() => {
  return dossiers.value.filter(dossier => 
    dossier.patient.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    dossier.numero_dme.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Sélection d'un dossier
const selectDossier = (dossier) => {
  selectedDossier.value = dossier;
};

// Mise à jour des permissions
const updatePermissions = () => {
  // Logique de mise à jour des permissions côté backend
  console.log('Permissions mises à jour:', permissions.value);
};

// Archivage d'un dossier
const archiverDossier = (dossier) => {
  // Logique d'archivage (à implémenter côté backend)
  dossier.statut = 'archivé';
};

// Initialisation
onMounted(() => {
  fetchDossiers();
});

// Exportation pour utilisation dans le template
defineExpose({
  dossiers,
  selectedDossier,
  filteredDossiers,
  selectDossier,
  archiverDossier
});
</script>

<style scoped>
.nav-tabs {
  background-color: transparent;
}

.nav-link {
  font-size: 18px;
  color: #6c757d;
  background-color: transparent;
  border: none;
  transition: all 0.3s ease;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
}

.active-tab {
  color: #007bff !important;
  background-color: rgba(0, 123, 255, 0.1) !important;
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(0, 123, 255, 0.1);
  transform: translateY(-3px);
}

.inactive-tab {
  opacity: 0.7;
}

.inactive-tab:hover {
  background-color: rgba(0, 0, 0, 0.05);
  opacity: 1;
  transform: translateY(-2px);
}

.nav-link i {
  margin-right: 8px;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.active-tab i {
  opacity: 1;
  color: #007bff;
}

.badge {
  font-size: 0.6rem;
  padding: 0;
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
