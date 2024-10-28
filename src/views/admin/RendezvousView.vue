<template>
  <div class="d-flex">
    <SidebarAdmin />
    <div class="section-content">
      <HeaderPatient />
      <div class="section-container">
        <!-- Navigation des sections -->
        <ul class="nav nav-tabs mb-4">
          <li class="nav-item" v-for="(tab, index) in tabs" :key="index">
            <a
              class="nav-link"
              :class="{ active: currentTab === tab.id }"
              @click="currentTab = tab.id"
              href="#"
            >
              {{ tab.name }}
            </a>
          </li>
        </ul>

        <!-- Calendrier Global -->
        <div v-if="currentTab === 'calendar'" class="calendar-section">
          <div class="card">
            <div class="card-body">
              <div
                class="d-flex justify-content-between align-items-center mb-4"
              >
                <h3>Calendrier des Rendez-vous</h3>
                <div class="btn-group">
                  <button
                    class="btn btn-outline-primary"
                    @click="previousMonth"
                  >
                    <i class="bi bi-chevron-left"></i>
                  </button>
                  <button class="btn btn-outline-primary">
                    {{ currentMonthYear }}
                  </button>
                  <button class="btn btn-outline-primary" @click="nextMonth">
                    <i class="bi bi-chevron-right"></i>
                  </button>
                </div>
              </div>

              <div class="calendar-grid">
                <!-- En-têtes des jours -->
                <div class="calendar-header" v-for="day in weekDays" :key="day">
                  {{ day }}
                </div>
                <!-- Jours du mois -->
                <div
                  v-for="date in calendarDays"
                  :key="date.day"
                  class="calendar-day"
                  :class="{ 'has-appointments': hasAppointments(date) }"
                >
                  <span>{{ date.day }}</span>
                  <div class="appointment-dots">
                    <span
                      v-for="apt in getAppointments(date)"
                      :key="apt.id"
                      class="appointment-dot"
                      :class="apt.status"
                    >
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Liste des Rendez-vous -->
        <div v-if="currentTab === 'list'" class="list-section">
          <div class="card">
            <div class="card-body">
              <h3>Liste des Rendez-vous</h3>

              <!-- Filtres -->
              <div class="row mb-4">
                <div class="col-md-3">
                  <input
                    type="date"
                    class="form-control"
                    v-model="filters.date"
                  />
                </div>
                <div class="col-md-3">
                  <select class="form-select" v-model="filters.status">
                    <option value="">Tous les statuts</option>
                    <option value="confirmed">Confirmé</option>
                    <option value="pending">En attente</option>
                    <option value="cancelled">Annulé</option>
                  </select>
                </div>
                <div class="col-md-4">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Rechercher..."
                    v-model="filters.search"
                  />
                </div>
                <div class="col-md-2">
                  <button class="btn btn-primary w-100" @click="applyFilters">
                    Filtrer
                  </button>
                </div>
              </div>

              <!-- Tableau des rendez-vous -->
              <table class="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Heure</th>
                    <th>Client</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="apt in filteredAppointments" :key="apt.id">
                    <td>{{ formatDate(apt.date) }}</td>
                    <td>{{ apt.time }}</td>
                    <td>{{ apt.clientName }}</td>
                    <td>
                      <span
                        class="badge"
                        :class="getStatusBadgeClass(apt.status)"
                      >
                        {{ apt.status }}
                      </span>
                    </td>
                    <td>
                      <div class="btn-group">
                        <button
                          class="btn btn-sm btn-outline-primary"
                          @click="editAppointment(apt)"
                        >
                          <i class="bi bi-pencil"></i>
                        </button>
                        <button
                          class="btn btn-sm btn-outline-danger"
                          @click="cancelAppointment(apt)"
                        >
                          <i class="bi bi-x-circle"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Statistiques -->
        <div v-if="currentTab === 'stats'" class="stats-section">
          <div class="row">
            <div class="col-md-4">
              <div class="card">
                <div class="card-body">
                  <h5>Taux d'occupation</h5>
                  <div class="progress">
                    <div
                      class="progress-bar"
                      :style="{ width: occupancyRate + '%' }"
                    >
                      {{ occupancyRate }}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card">
                <div class="card-body">
                  <h5>Taux d'annulation</h5>
                  <div class="progress">
                    <div
                      class="progress-bar bg-warning"
                      :style="{ width: cancellationRate + '%' }"
                    >
                      {{ cancellationRate }}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card">
                <div class="card-body">
                  <h5>Total RDV du mois</h5>
                  <h2>{{ monthlyAppointments }}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Configuration -->
        <div v-if="currentTab === 'config'" class="config-section">
          <div class="card">
            <div class="card-body">
              <h3>Configuration des plages horaires</h3>

              <form @submit.prevent="saveScheduleConfig">
                <div class="mb-3">
                  <label class="form-label">Jours ouvrables</label>
                  <div class="btn-group">
                    <button
                      v-for="day in allWeekDays"
                      :key="day"
                      type="button"
                      class="btn"
                      :class="
                        isWorkingDay(day)
                          ? 'btn-primary'
                          : 'btn-outline-primary'
                      "
                      @click="toggleWorkingDay(day)"
                    >
                      {{ day[0] }}
                    </button>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-md-6">
                    <label class="form-label">Heure de début</label>
                    <input
                      type="time"
                      class="form-control"
                      v-model="scheduleConfig.startTime"
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Heure de fin</label>
                    <input
                      type="time"
                      class="form-control"
                      v-model="scheduleConfig.endTime"
                    />
                  </div>
                </div>

                <div class="mb-3">
                  <label class="form-label">Durée par défaut (minutes)</label>
                  <select
                    class="form-select"
                    v-model="scheduleConfig.defaultDuration"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">1 heure</option>
                  </select>
                </div>

                <button type="submit" class="btn btn-primary">
                  Enregistrer la configuration
                </button>
              </form>
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

// État
const currentTab = ref("calendar");
const appointments = ref([]);
const filters = ref({
  date: "",
  status: "",
  search: "",
});
const scheduleConfig = ref({
  workingDays: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"],
  startTime: "09:00",
  endTime: "18:00",
  defaultDuration: 30,
});

// Données statiques pour la démo
const tabs = [
  { id: "calendar", name: "Calendrier" },
  { id: "list", name: "Liste des RDV" },
  { id: "stats", name: "Statistiques" },
  { id: "config", name: "Configuration" },
];

const weekDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const allWeekDays = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

// Computed properties
const currentMonthYear = computed(() => {
  const date = new Date();
  return date.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
});

const filteredAppointments = computed(() => {
  return appointments.value.filter((apt) => {
    const matchesDate = !filters.value.date || apt.date === filters.value.date;
    const matchesStatus =
      !filters.value.status || apt.status === filters.value.status;
    const matchesSearch =
      !filters.value.search ||
      apt.clientName.toLowerCase().includes(filters.value.search.toLowerCase());
    return matchesDate && matchesStatus && matchesSearch;
  });
});

const occupancyRate = computed(() => {
  // Logique pour calculer le taux d'occupation
  return 75;
});

const cancellationRate = computed(() => {
  // Logique pour calculer le taux d'annulation
  return 15;
});

const monthlyAppointments = computed(() => {
  return appointments.value.length;
});

// Méthodes
const previousMonth = () => {
  // Implémenter la navigation vers le mois précédent
};

const nextMonth = () => {
  // Implémenter la navigation vers le mois suivant
};

// const hasAppointments = (date) => {
//   // Vérifier si la date a des rendez-vous
//   return true;
// };

// const getAppointments = (date) => {
//   // Retourner les rendez-vous pour une date donnée
//   return [];
// };

// const applyFilters = () => {
//   // Appliquer les filtres
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
    confirmed: "bg-success",
    pending: "bg-warning",
    cancelled: "bg-danger",
  };
  return classes[status] || "bg-secondary";
};

const isWorkingDay = (day) => {
  return scheduleConfig.value.workingDays.includes(day);
};

const toggleWorkingDay = (day) => {
  const index = scheduleConfig.value.workingDays.indexOf(day);
  if (index === -1) {
    scheduleConfig.value.workingDays.push(day);
  } else {
    scheduleConfig.value.workingDays.splice(index, 1);
  }
};

const saveScheduleConfig = () => {
  // Sauvegarder la configuration
};

onMounted(() => {
  // Charger les rendez-vous initiaux
  appointments.value = [
    {
      id: 1,
      date: "2024-10-28",
      time: "09:00",
      clientName: "Jean Dupont",
      status: "confirmed",
    },
    // Ajouter plus de données de démonstration
  ];
});
</script>

<style scoped>
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
</style>
