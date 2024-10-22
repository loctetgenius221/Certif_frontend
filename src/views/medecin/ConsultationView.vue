<template>
  <div class="d-flex">
    <SidebarMedecin />
    <div class="section-content">
      <HeaderPatient />
      <div class="section-container">
        <h1>Historique des consultations</h1>
        
        <div class="form_section mb-5">
          <form @submit.prevent="filtrerConsultations" class="mb-4">
            <div class="d-flex align-items-center">
              <div class="me-3">
                <label for="dateConsultation" class="form-label">Date de la consultation :</label>
                <input
                  type="date"
                  id="dateConsultation"
                  v-model="filtreDate"
                  class="form-control"
                />
              </div>
              <button type="submit" class="btn btn-primary mt-4">Filtrer</button>
            </div>
          </form>
          
          <div class="consultations-list">
            <div v-if="loading" class="text-center">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Chargement...</span>
              </div>
            </div>
            <div v-else-if="error" class="alert alert-danger" role="alert">
              {{ error }}
            </div>
            <div v-else-if="consultations.length === 0" class="alert alert-info" role="alert">
              Aucune consultation trouvée pour cette date.
            </div>
            <div v-else class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Date</th>
                    <th scope="col">Type de consultation</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(consultation, index) in consultations" :key="consultation.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <!-- <td>{{ formatDate(consultation.date) }}</td> -->
                    <td>{{ (consultation.date) }}</td>
                    <td>{{ consultation.type_consultation }}</td>
                    <td>
                      <router-link 
                        class="btn btn-info btn-sm"
                        :to="{ name: 'Detail-consultation', params: { id: consultation.id } }"
                      >
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
    </div>
  </div>
</template>
<script setup>
import SidebarMedecin from '@/components/SidebarMedecin.vue';
import HeaderPatient from '@/components/HeaderPatient.vue';
import {ref, onMounted} from "vue"
import { getConsultationList } from "@/services/consultationService";

const consultations = ref([]);

const fetchConsultations = async () => {
  const data = await getConsultationList();
  consultations.value = data.data;
};

// Appel à la fonction fetchConsultations lors du montage du composant
onMounted(() => {
  fetchConsultations();
})
</script>

<style scoped>
/* .main--content {
  position: sticky;
  top: 80px;
  left: 0;
  background: #fff;
  width: 100%;
  padding: 0.5rem 0;
}

.header--wrapper img {
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 50%;
}

.header--wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: #fff;
  border-radius: 10px;
  padding: 10px 2rem;
  margin-bottom: 1rem;
}

.user--info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user--info i {
  font-size: 1.5rem;
  cursor: pointer;
}

.user--info h4 {
  font-size: 1rem;
}

.search--box {
  background: none;
  border: 1px solid #e9ecef;
  border-radius: 5px;
  align-items: center;
  gap: 5px;
  padding: 4px 12px;
}

.search--box input {
  background: transparent;
  padding: 6px 15px;
  border: none;
  outline: none;
  /* color: #ADB5BD; */
  /* font-size: 16px;
}

.search--box i {
  color: #adb5bd;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.5s ease-out;
}

.search--box i:hover {
  transform: scale(1.2);
}

.consultation-section {
  padding: 10px 32px;
}*/
.section-content {
  flex-grow: 1;
  padding: 20px;
}

.section-container {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h1 {
  color: #333;
  margin-bottom: 20px;
  font-family: 'Montserrat';
  font-size: 18px;
}

.form_section {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.table {
  background-color: #fff;
}

.table th {
  background-color: #f8f9fa;
}

.btn-info {
  background-color: #17a2b8;
  border-color: #17a2b8;
  color: #fff;
}

.btn-info:hover {
  background-color: #138496;
  border-color: #117a8b;
}
</style>