<template>
  <div class="d-flex">
    <SidebaPatient />
    <div class="section-content">
      <HeaderPatient />
      <div class="section-container">
        <button @click="goBack" class="btn btn-retour">
          <i class="bi bi-arrow-left-short"></i>Retour
        </button>
        <h2>Services</h2>
        <div class="service-content mb-5">
          <div class="scroll-container">
            <button 
              v-for="service in services" 
              :key="service.id" 
              @click="filtrerMedecinsParService(service.id)"
              :class="['btn', 'btn-danger', {'active': service.id === serviceSelectionne}]"
            >
              {{  service.nom  }}
            </button>
          </div>
        </div>

        <div class="search-medecin d-flex justify-content-between align-items-center mb-4">
          <h2>Médecins</h2>
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Service, medecin..."
              aria-label="Search"
            />
          </form>
        </div>
        <div class="row">
          <div
            class="col-md-3 mb-4"
            v-for="(medecin) in medecinsFiltres"
            :key="medecin.id"
          >
            <div class="card text-center">
              <div class="card-body">
                <img
                  src="../../../public/image/portrait-3d-male-doctor.jpg"
                  class="img-fluid  mb-2"
                  alt="Médecin"
                />
                <h5 class="card-title">{{ "Dr " + medecin.user.prenom + " " + medecin.user.nom }}</h5>
                <p class="card-text">{{ medecin.service.nom }}</p>
                <button
                  @click="allerVersRdvForm(medecin)"
                  class="btn btn-primary"
                >
                  Prendre rendez-vous
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getServices } from "@/services/serviceService";
import SidebaPatient from "@/components/SidebaPatient.vue";
import HeaderPatient from "@/components/HeaderPatient.vue";
import { getMedecinList } from "@/services/medecinService";

const services = ref([]);
const medecins = ref([]);
const serviceSelectionne = ref(null);
const medecinsFiltres = ref([]);
const router = useRouter();

// Méthode pour recupérer les services
const recupServices = async () => {
  try {
    const response = await getServices();
    services.value = response.data;
  } catch (error) {
    console.log("Erreur lors de la recupération des services", error)
  }
}

// Méthode pour récupérer la liste complète des médecins
const listMedecins = async () => {
  try {
    const response = await getMedecinList();
    medecins.value = response.data;
    // Par défaut, afficher tous les médecins
    medecinsFiltres.value = medecins.value;
  } catch (error) {
    console.log("Erreur", error);
  }
};

// Filtrer les médecins par service
const filtrerMedecinsParService = (serviceId) => {
  serviceSelectionne.value = serviceId;
  medecinsFiltres.value = medecins.value.filter(medecin => medecin.service_id === serviceId);
};

// Redirection vers la page de prise de rendez-vous en passant les informations du médecin
const allerVersRdvForm = (medecin) => {
  router.push({
    path: '/rdv-form',
    query: {
      nom: medecin.user.nom,
      prenom: medecin.user.prenom,
      specialite: medecin.service.nom,
    },
  });
};

const goBack = () => {
  router.go(-1);
};

onMounted(() => {
  recupServices();
  listMedecins();
});
</script>

<style scoped>
.card {
  /* border: 1px solid #2980b9; */
  border-radius: 10px;
  box-shadow: 0 0px 8px #297fb925;
  cursor: pointer;
  transition: all .3s ease;
}

.card:hover {
  margin-top: -25px;
  background: #297fb9;
  color: white;
}

.img-fluid {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 5%;
}

.section-container h2 {
  font-size: 18px;
  color: #717171;
}

.section-container .btn-danger {
  background: #297fb9;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  padding: 55px 77px;
  font-size: 18px;
  font-weight: bold;
  color: white; /* Texte en blanc pour contraster */
  box-shadow: 0 0px 8px rgba(0, 0, 0, 0.1); /* Ombre extérieure pour donner de la profondeur */
  transition: transform 0.3s ease, background 0.3s ease; 
}
.section-content {
  padding: 25px;
  overflow-x: hidden;
  /* background: #000; */
}

/* Scroll */
.service-content {
  width: 100%; /* Prend la largeur disponible */
  overflow: hidden;
}

.scroll-container {
  display: flex;
  gap: 15px;
  overflow-x: auto; /* Seul cette section défile horizontalement */
  white-space: nowrap; /* Garde les éléments sur une seule ligne */
  padding-bottom: 10px; /* Ajoute un peu d'espace en bas */
}

.scroll-container::-webkit-scrollbar {
  height: 6px; /* Hauteur de la barre de défilement */
}

.scroll-container::-webkit-scrollbar-thumb {
  background-color: #2980b9; /* Couleur de la barre de défilement */
  border-radius: 10px; /* Coins arrondis */
}

.scroll-container::-webkit-scrollbar-track {
  background: transparent; /* Couleur du fond de la barre */
}

.btn-retour {
  padding: 0;
  text-decoration: underline;
  text-decoration-color: #2980b9;
}

</style>
