<template>
  <div class="medecin-dashboard">
    <SidebarMedecin />
    <div class="main-content">
      <HeaderPatient />
      <div class="dme-section">
        <div class="dme-heading">
          <h1>Liste des dossiers médicaux</h1>
          <div class="search-box">
            <input
              type="search"
              placeholder="Rechercher par DME, nom, prénom, date"
              aria-label="Search"
            />
            <i class="fas fa-search"></i>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>N°DME</th>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Date de création</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="dossier in dossiers" :key="dossier.id">
                <td>
                  <img :src="dossier.patient.user.photo || '../../../public/image/photo-profil.png'" :alt="dossier.patient.user.nom" class="patient-photo" />
                </td>
                <td>{{ dossier.numero_dme }}</td>
                <td>{{ dossier.patient.user.prenom }}</td>
                <td>{{ dossier.patient.user.nom }}</td>
                <td>{{ formatDate(dossier.date_creation) }}</td>
                <td>
                  <router-link class="btn-detail" :to="{ name: 'Détail-DME', params: { id: dossier.id } }">
                    Voir plus
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getDossierMedicalList } from "@/services/dossiermedicalService";
import SidebarMedecin from "@/components/SidebarMedecin.vue";
import HeaderPatient from "@/components/HeaderPatient.vue";

const dossiers = ref([]);

const fetchDossiers = async () => {
  try {
    const response = await getDossierMedicalList();
    dossiers.value = response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des dossiers:", error);
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

onMounted(fetchDossiers);
</script>

<style scoped>
.medecin-dashboard {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex-grow: 1;
  padding: 2rem;
}

.dme-section {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.dme-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.dme-heading h1 {
  font-family: 'Montserrat', sans-serif;
  font-size: 24px;
  color: #333;
  margin: 0;
}

.search-box {
  display: flex;
  align-items: center;
  background-color: #f1f3f5;
  border-radius: 20px;
  padding: 0.5rem 1rem;
}

.search-box input {
  background: transparent;
  border: none;
  outline: none;
  font-size: 14px;
  width: 250px;
}

.search-box i {
  color: #6c757d;
  cursor: pointer;
}

.table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
}

.table thead th {
  background-color: #3498db;
  color: white;
  font-weight: 600;
  padding: 12px;
  text-align: left;
}

.table tbody tr {
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.table tbody tr:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.table td {
  padding: 12px;
  vertical-align: middle;
}

.patient-photo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.btn-detail {
  color: #e74c3c;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.btn-detail:hover {
  color: #c0392b;
}

@media (max-width: 768px) {
  .dme-heading {
    flex-direction: column;
    align-items: flex-start;
  }

  .search-box {
    margin-top: 1rem;
    width: 100%;
  }

  .search-box input {
    width: 100%;
  }

  .table-responsive {
    overflow-x: auto;
  }
}
</style>