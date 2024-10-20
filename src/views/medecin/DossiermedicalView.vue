<template>
  <div class="medecin-dashboard d-flex">
    <SidebarMedecin/>
    <div class="section-content">
      <HeaderPatient/>

      <!-- Contenu ici -->
      <div class="dme-section">
        <div
          class="dme-heading d-flex align-items-center justify-content-between mb-3"
        >
          <h1>Liste des dossiers médicaux</h1>
          <div class="filtre">
            <form class="d-flex" role="search">
              <input
                class="form-control me-2"
                type="search"
                placeholder="dme,nom,prénom,date"
                aria-label="Search"
              />
            </form>
          </div>
        </div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Photo</th>
              <th scope="col">N°DME</th>
              <th scope="col">Prénom</th>
              <th scope="col">Nom</th>
              <th scope="col">Date de création</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="dossier in dossiers" :key="dossier.id">
              <td>
                <img src="../../../public/image/photo-profil.png" alt="" />
              </td>
              <td>{{ dossier.numero_dme }}</td>
              <td>{{ dossier.patient.user.prenom   }}</td>
              <td>{{ dossier.patient.user.nom  }}</td>
              <td>{{ dossier.date_creation }}</td>
              <td>
                <router-link class="btn-detail" :to="{ name: 'Détail-DME', params: { id: dossier.id } }">Voir plus...</router-link>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
      </div>
    </div>
  </div>
</template>

<script setup>
import SidebarMedecin from "@/components/SidebarMedecin.vue";
import HeaderPatient from "@/components/HeaderPatient.vue";
import { ref, onMounted } from "vue"; // Importer ref et onMounted
import { getDossierMedicalList } from "@/services/dossiermedicalService"; // Importer votre fonction API

const dossiers = ref([]); // Déclaration de la variable réactive pour les dossiers

// Fonction pour récupérer la liste des dossiers médicaux
const fetchDossiers = async () => {
  const data = await getDossierMedicalList(); // Appeler la fonction API
  dossiers.value = data.data; // Mettre à jour la valeur réactive
};

// Appeler la fonction fetchDossiers lors du montage du composant
onMounted(() => {
  fetchDossiers();
});
</script>

<style scoped>
.main--content {
  position: sticky;
  top: 80px;
  left: 0;
  background: #fff;
  width: 100%;
  padding: 0.5rem 1rem;
}

/* .sidebar {
  position: ;
  top: 0;
  left: 0;
  bottom: 0;
  width: 110px;
  height: 100vh;
  padding: 0 1.7rem;
  color: #fff;
  overflow: hidden;
  transition: all 0.5s linear;
  background: #fff;
  box-shadow: 0px 10px 25px #297fb918;
  z-index: 5;
} */

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
  font-size: 16px;
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

.dme-section {
  padding: 10px 32px;
}

.dme-section .dme-heading h1 {
  font-family: "Montserrat";
  font-size: 18px;
}

.dme-section .table thead {
  background: #2980b9;
  color: white;
}

.dme-section .table tbody tr {
  vertical-align: middle;
}

.dme-section .table .btn-detail  {
  color: #F1948A;
  text-decoration: none;
  font-weight: bold;
}

</style>