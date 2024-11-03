<template>
  <div class="d-flex">
    <SidebarAdmin />
    <div class="section-content">
      <HeaderPatient />
      <div class="section-container">
        <!-- Navigation des sections -->
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

        <div
          v-if="currentTab === 'calendar'"
          class="calendar-section container-fluid p-4 bg-light"
        >
          <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div class="card-body p-0">
              <!-- En-tête du calendrier -->
              <div
                class="p-4 bg-white border-bottom d-flex justify-content-between align-items-center"
              >
                <h3 class="mb-0 text-dark fw-bold">
                  <i class="bi bi-calendar-week text-primary me-2"></i>
                  Calendrier des Rendez-vous
                </h3>
              </div>

              <!-- Conteneur du Calendrier -->
              <div class="p-4">
                <CalendrierRdvAdmin
                  ref="calendarComponent"
                  class="calendar-container"
                  @date-select="handleDateSelect"
                />
              </div>
            </div>
          </div>

          <!-- Modal de Détails du Rendez-vous -->
          <div
            class="modal fade"
            id="appointmentDetailsModal"
            tabindex="-1"
            aria-labelledby="appointmentDetailsLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content rounded-4 border-0 shadow-lg">
                <div class="modal-header border-0 pb-0">
                  <h5 class="modal-title" id="appointmentDetailsLabel">
                    Détails du Rendez-vous
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <div v-if="selectedAppointment" class="row g-3">
                    <div class="col-12 d-flex align-items-center">
                      <div
                        class="rounded-circle bg-primary text-white me-3 d-flex align-items-center justify-content-center"
                        style="width: 50px; height: 50px"
                      >
                        {{
                          (
                            selectedAppointment.patient.user.prenom[0] +
                            selectedAppointment.patient.user.nom[0]
                          ).toUpperCase()
                        }}
                      </div>
                      <div>
                        <h6 class="mb-1">
                          {{ selectedAppointment.patient.user.prenom }}
                          {{ selectedAppointment.patient.user.nom }}
                        </h6>
                        <p class="text-muted mb-0">
                          {{ selectedAppointment.service.nom }}
                        </p>
                      </div>
                    </div>
                    <div class="col-6">
                      <small class="text-muted d-block">Date</small>
                      <div class="d-flex align-items-center">
                        <i class="bi bi-calendar me-2 text-primary"></i>
                        {{ formatDate(selectedAppointment.date) }}
                      </div>
                    </div>
                    <div class="col-6">
                      <small class="text-muted d-block">Heure</small>
                      <div class="d-flex align-items-center">
                        <i class="bi bi-clock me-2 text-success"></i>
                        {{ selectedAppointment.heure_debut }}
                      </div>
                    </div>
                    <div class="col-12">
                      <small class="text-muted d-block">Statut</small>
                      <span
                        class="badge rounded-pill text-capitalize py-1 px-3"
                        :class="getStatusBadgeClass(selectedAppointment.status)"
                      >
                        {{ selectedAppointment.status }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="modal-footer border-0">
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    data-bs-dismiss="modal"
                  >
                    Fermer
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="editAppointment(selectedAppointment)"
                  >
                    Modifier
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Liste des Rendez-vous -->
        <div
          v-if="currentTab === 'list'"
          class="appointment-list-section container-fluid p-4 bg-light"
        >
          <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div class="card-body p-0">
              <!-- En-tête et Filtres -->
              <div class="p-4 bg-white border-bottom">
                <div
                  class="d-flex justify-content-between align-items-center mb-3"
                >
                  <h3 class="mb-0 text-dark fw-bold">Liste des Rendez-vous</h3>
                  <div class="d-none d-md-block text-muted small">
                    Total: {{ filteredAppointments.length }} rendez-vous
                  </div>
                </div>

                <div class="row g-3">
                  <div class="col-12 col-md-3">
                    <div class="form-floating">
                      <input
                        type="date"
                        class="form-control rounded-3"
                        v-model="filters.date"
                        id="dateFilter"
                        placeholder="Date"
                      />
                      <label for="dateFilter" class="text-muted">Date</label>
                    </div>
                  </div>
                  <div class="col-12 col-md-3">
                    <div class="form-floating">
                      <select
                        class="form-select rounded-3"
                        v-model="filters.status"
                        id="statusFilter"
                      >
                        <option value="">Tous les statuts</option>
                        <option value="terminé">Terminé</option>
                        <option value="à venir">À venir</option>
                        <option value="annulé">Annulé</option>
                      </select>
                      <label for="statusFilter" class="text-muted"
                        >Statut</label
                      >
                    </div>
                  </div>
                  <div class="col-12 col-md-6">
                    <div class="form-floating">
                      <input
                        type="text"
                        class="form-control rounded-3"
                        v-model="filters.search"
                        id="searchFilter"
                        placeholder="Rechercher..."
                      />
                      <label for="searchFilter" class="text-muted">
                        <i class="bi bi-search me-2"></i>Rechercher
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Tableau des rendez-vous -->
              <div class="table-responsive">
                <table class="table table-hover mb-0">
                  <thead class="bg-light">
                    <tr>
                      <th class="text-muted fw-normal ps-4">Date</th>
                      <th class="text-muted fw-normal">Heure</th>
                      <th class="text-muted fw-normal">Client</th>
                      <th class="text-muted fw-normal">Statut</th>
                      <th class="text-muted fw-normal text-center pe-4">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="apt in filteredAppointments"
                      :key="apt.id"
                      class="align-middle"
                    >
                      <td class="ps-4 text-dark">
                        <i class="bi bi-calendar me-2 text-primary"></i>
                        {{ formatDate(apt.date) }}
                      </td>
                      <td class="text-muted">{{ apt.heure_debut }}</td>
                      <td class="text-dark">
                        <div class="d-flex align-items-center">
                          <div
                            class="rounded-circle bg-primary text-white me-2 d-flex align-items-center justify-content-center"
                            style="width: 32px; height: 32px"
                          >
                            {{
                              (
                                apt.patient.user.prenom[0] +
                                apt.patient.user.nom[0]
                              ).toUpperCase()
                            }}
                          </div>
                          {{ apt.patient.user.prenom }}
                          {{ apt.patient.user.nom }}
                        </div>
                      </td>
                      <td>
                        <span
                          class="badge rounded-pill text-capitalize fw-normal py-1 px-3"
                          :class="getStatusBadgeClass(apt.status)"
                        >
                          {{ apt.status }}
                        </span>
                      </td>
                      <td class="text-center pe-4">
                        <div class="btn-group" role="group">
                          <button
                            class="btn btn-sm btn-outline-primary rounded-start"
                            @click="editAppointment(apt)"
                            title="Modifier"
                          >
                            <i class="bi bi-pencil"></i>
                          </button>
                          <button
                            class="btn btn-sm btn-outline-danger rounded-end"
                            @click="cancelAppointment(apt)"
                            title="Annuler"
                          >
                            <i class="bi bi-x-circle"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="filteredAppointments.length === 0">
                      <td colspan="5" class="text-center text-muted py-4">
                        <i class="bi bi-calendar-x fs-2 d-block mb-2"></i>
                        Aucun rendez-vous trouvé
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Statistiques -->
        <div v-if="currentTab === 'stats'" class="stats-section p-4 bg-light">
          <div class="row g-4">
            <!-- Moyenne de RDV par médecin -->
            <div class="col-12 col-md-6 col-lg-3">
              <div class="card h-100 border-0 shadow-sm hover-lift">
                <div
                  class="card-body d-flex flex-column justify-content-between"
                >
                  <div
                    class="d-flex justify-content-between align-items-center mb-3"
                  >
                    <i class="bi bi-graph-up text-primary fs-2"></i>
                    <span class="text-muted small">Moy. RDV par médecin</span>
                  </div>
                  <h2 class="card-title text-primary fw-bold text-end">
                    {{ avgAppointmentsPerDoctor }}
                  </h2>
                </div>
              </div>
            </div>

            <!-- Taux d'occupation -->
            <div class="col-12 col-md-6 col-lg-3">
              <div class="card h-100 border-0 shadow-sm hover-lift">
                <div class="card-body">
                  <div
                    class="d-flex justify-content-between align-items-center mb-3"
                  >
                    <i class="bi bi-clock text-success fs-2"></i>
                    <span class="text-muted small">Taux d'occupation</span>
                  </div>
                  <div class="progress" style="height: 10px">
                    <div
                      class="progress-bar bg-success"
                      role="progressbar"
                      :style="{ width: `${occupancyRate}%` }"
                      :aria-valuenow="occupancyRate"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <div class="text-end mt-2 small text-muted">
                    {{ occupancyRate }}%
                  </div>
                </div>
              </div>
            </div>

            <!-- Taux d'annulation -->
            <div class="col-12 col-md-6 col-lg-3">
              <div class="card h-100 border-0 shadow-sm hover-lift">
                <div class="card-body">
                  <div
                    class="d-flex justify-content-between align-items-center mb-3"
                  >
                    <i class="bi bi-calendar-x text-warning fs-2"></i>
                    <span class="text-muted small">Taux d'annulation</span>
                  </div>
                  <div class="progress" style="height: 10px">
                    <div
                      class="progress-bar bg-warning"
                      role="progressbar"
                      :style="{ width: `${cancellationRate}%` }"
                      :aria-valuenow="cancellationRate"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <div class="text-end mt-2 small text-muted">
                    {{ cancellationRate }}%
                  </div>
                </div>
              </div>
            </div>

            <!-- Total RDV du mois -->
            <div class="col-12 col-md-6 col-lg-3">
              <div class="card h-100 border-0 shadow-sm hover-lift">
                <div
                  class="card-body d-flex flex-column justify-content-between"
                >
                  <div
                    class="d-flex justify-content-between align-items-center mb-3"
                  >
                    <i class="bi bi-clipboard-data text-info fs-2"></i>
                    <span class="text-muted small">Total RDV du mois</span>
                  </div>
                  <h2 class="card-title text-info fw-bold text-end">
                    {{ monthlyAppointments }}
                  </h2>
                </div>
              </div>
            </div>

            <!-- Rendez-vous par service -->
            <div class="col-12">
              <div class="card border-0 shadow-sm hover-lift">
                <div class="card-body">
                  <h5 class="card-title mb-4 text-dark">
                    Rendez-vous par service
                  </h5>
                  <div class="row g-3">
                    <div
                      v-for="(count, service) in appointmentsByService"
                      :key="service"
                      class="col-6 col-md-4 col-lg-3"
                    >
                      <div class="bg-light p-3 rounded text-center">
                        <div class="text-muted small mb-1">{{ service }}</div>
                        <div class="fw-bold text-primary">{{ count }} RDV</div>
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
import SidebarAdmin from "@/components/SidebarAdmin.vue";
import HeaderPatient from "@/components/HeaderPatient.vue";
import { ref, computed, onMounted } from "vue";
import CalendrierRdvAdmin from "@/components/CalendrierRdvAdmin.vue";
import { getRendezVousList } from "@/services/rendezvousService";

// État
const currentTab = ref("calendar");
const appointments = ref([]);
const filters = ref({
  date: "",
  status: "",
  search: "",
});

const tabs = [
  { id: "calendar", name: "Calendrier", icon: "bi bi-calendar-week" },
  { id: "list", name: "Liste des RDV", icon: "bi bi-list-ul" },
  { id: "stats", name: "Statistiques", icon: "bi bi-graph-up-arrow" },
];

const filteredAppointments = computed(() => {
  return appointments.value.filter((apt) => {
    const matchesDate = !filters.value.date || apt.date === filters.value.date;
    const matchesStatus =
      !filters.value.status || apt.status === filters.value.status;
    const matchesSearch =
      !filters.value.search ||
      apt.patient.user.nom
        .toLowerCase()
        .includes(filters.value.search.toLowerCase()) ||
      apt.patient.user.prenom
        .toLowerCase()
        .includes(filters.value.search.toLowerCase());

    return matchesDate && matchesStatus && matchesSearch;
  });
});

// Statistique 1 : Nombre moyen de rendez-vous par médecin
const avgAppointmentsPerDoctor = computed(() => {
  const doctorAppointments = appointments.value.reduce((acc, apt) => {
    acc[apt.medecin_id] = (acc[apt.medecin_id] || 0) + 1;
    return acc;
  }, {});

  const doctorCount = Object.keys(doctorAppointments).length;
  const totalAppointments = appointments.value.length;

  return doctorCount ? totalAppointments / doctorCount : 0;
});

/**
 *
 * Il mesure la capacité de l'hopital à occuper le
 * temps disponible pour des consultations.
 * Un taux élevé indique une forte demande de soins,
 * et peut-être un besoin de plus de personnel ou de ressources.
 *
 **/
const occupancyRate = computed(() => {
  const totalRdv = appointments.value.length;
  const completedRdv = appointments.value.filter(
    (apt) => apt.status === "terminé"
  ).length;

  // Calcul du taux d'occupation en pourcentage
  return totalRdv ? Math.round((completedRdv / totalRdv) * 100) : 0;
});

const cancellationRate = computed(() => {
  const totalRdv = appointments.value.length;
  const cancelledRdv = appointments.value.filter(
    (apt) => apt.status === "annulé"
  ).length;

  // Calcul du taux d'annulation en pourcentage
  return totalRdv ? Math.round((cancelledRdv / totalRdv) * 100) : 0;
});

// Statistique 5 : Nombre de rendez-vous par service médical
const appointmentsByService = computed(() => {
  return appointments.value.reduce((acc, apt) => {
    const serviceName = apt.medecin.service.nom;
    acc[serviceName] = (acc[serviceName] || 0) + 1;
    return acc;
  }, {});
});

const monthlyAppointments = computed(() => {
  return appointments.value.length;
});

// const hasAppointments = (date) => {
//   // Vérifier si la date a des rendez-vous
//   return true;
// };

// const getAppointments = (date) => {
//   // Retourner les rendez-vous pour une date donnée
//   return [];
// };


// const editAppointment = (apt) => {
//   // Ouvrir le modal d'édition
// };

// const cancelAppointment = (apt) => {
//   // Annuler le rendez-vous
// };

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("fr-FR");
};

const getStatusBadgeClass = (status) => {
  const classes = {
    terminé: "bg-success",
    "à venir": "bg-primary",
    annulé: "bg-danger",
  };
  return classes[status] || "bg-secondary";
};

const fetchRendezvous = async () => {
  const response = await getRendezVousList();
  appointments.value = response.data;
  console.log("rendez-vous:", appointments.value);
};

onMounted(() => {
  // Charger les rendez-vous initiaux
  appointments.value = [];
  fetchRendezvous();
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

.calendar-container {
  min-height: 600px;
}

/* Personnalisation des boutons de navigation */
.btn-group .btn {
  transition: all 0.3s ease;
}

.btn-group .btn:hover {
  transform: scale(1.05);
}

/* Style de la modale */
.modal-content {
  transition: all 0.3s ease;
}

.modal-content:hover {
  transform: translateY(-5px);
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: #eee;
}

.calendar-header {
  background-color: #f8f9fa;
  padding: 10px;
  text-align: center;
  font-weight: bold;
}

.calendar-day {
  background-color: white;
  padding: 10px;
  min-height: 100px;
  position: relative;
}

.table-hover tbody tr:hover {
  background-color: rgba(0, 123, 255, 0.05);
  transition: background-color 0.3s ease;
}

.badge {
  font-size: 0.75rem;
}

.btn-group .btn {
  transition: all 0.3s ease;
}

.btn-group .btn:hover {
  transform: scale(1.1);
}

.appointment-dots {
  position: absolute;
  bottom: 5px;
  left: 5px;
  display: flex;
  gap: 3px;
}

.appointment-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #007bff;
}

.appointment-dot.confirmed {
  background-color: #28a745;
}
.appointment-dot.pending {
  background-color: #ffc107;
}
.appointment-dot.cancelled {
  background-color: #dc3545;
}

.has-appointments {
  background-color: #f8f9fa;
}

.progress {
  height: 25px;
}

.progress-bar {
  display: flex;
  align-items: center;
  justify-content: center;
}

.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-5px);
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.075) !important;
}

.card {
  border-radius: 0.75rem;
  overflow: hidden;
}

.input-group-text {
  background-color: rgba(13, 110, 253, 0.1);
  border-color: transparent;
}

.btn-check:checked + .btn-outline-primary {
  background-color: #0d6efd;
  color: white;
}
</style>
