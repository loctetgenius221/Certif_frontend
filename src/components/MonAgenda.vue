<template>
  <div class="demo-app">
    <div class="demo-app-main">
      <FullCalendar :options="calendarOptions">
        <template v-slot:eventContent="arg">
          <b>{{ arg.timeText }}</b> <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>

      <!-- Modal pour afficher les détails du rendez-vous -->
      <div
        class="modal fade"
        id="rendezVousModal"
        tabindex="-1"
        aria-labelledby="rendezVousModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="rendezVousModalLabel">
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
              <p>
                <strong>Type :</strong>
                {{ selectedRendezVous?.type_rendez_vous }}
              </p>
              <p><strong>Motif :</strong> {{ selectedRendezVous?.motif }}</p>
              <p><strong>Date :</strong> {{ selectedRendezVous?.date }}</p>
              <p>
                <strong>Heure de début :</strong>
                {{ selectedRendezVous?.heure_debut }}
              </p>
              <p>
                <strong>Heure de fin :</strong>
                {{ selectedRendezVous?.heure_fin }}
              </p>
              <p><strong>Statut :</strong> {{ selectedRendezVous?.status }}</p>
              <p><strong>Lieu :</strong> {{ selectedRendezVous?.lieu }}</p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { createEventId } from "@/even.utils";
import { getRendezVousList, getRendezVous } from "@/services/rendezvousService";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

export default {
  components: {
    FullCalendar,
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        },
        initialView: "dayGridMonth",
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        events: [],
      },
      currentEvents: [],
      showModal: false,
      selectedRendezVous: null,
    };
  },
  async mounted() {
    try {
      const userRole = localStorage.getItem("user_role");
      const userId = localStorage.getItem(`${userRole}_id`); // Dynamique pour récupérer l'ID en fonction du rôle

      if (!userId) {
        console.error(`ID pour le rôle ${userRole} non trouvé.`);
        return;
      }

      // Récupérer la liste des rendez-vous
      const rendezvous = await getRendezVousList();
      console.log("Rendez-vous récupérés:", rendezvous);

      if (Array.isArray(rendezvous.data)) {
        // Filtrer les rendez-vous en fonction du rôle
        const filteredRendezVous = rendezvous.data.filter((rdv) => {
          switch (userRole) {
            case "medecin":
              return rdv.medecin_id == userId;
            case "patient":
              return rdv.patient_id == userId;
            case "assistant":
              return rdv.assistant_id == userId; // Adapté selon votre structure
            default:
              return false; // Aucun match pour d'autres rôles
          }
        });

        // Adapter les événements au format FullCalendar
        const events = filteredRendezVous.map((rdv) => ({
          id: rdv.id,
          title: `${rdv.type_rendez_vous} - ${rdv.motif} - ${rdv.heure_debut} - ${rdv.heure_fin}`,
          start: `${rdv.date}T${rdv.heure_debut}`,
          end: `${rdv.date}T${rdv.heure_fin}`,
          extendedProps: {
            status: rdv.status,
            lieu: rdv.lieu,
          },
        }));

        this.calendarOptions.events = events;
      } else {
        console.error(
          "Les rendez-vous ne sont pas sous forme de tableau:",
          rendezvous
        );
      }
    } catch (error) {
      console.error("Erreur lors du chargement des rendez-vous:", error);
    }
  },
  methods: {
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends;
    },
    handleDateSelect(selectInfo) {
      const title = prompt("Veuillez entrer un titre pour votre événement");
      const calendarApi = selectInfo.view.calendar;
      calendarApi.unselect(); // Clear date selection

      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
        });
      }
    },
    async handleEventClick(clickInfo) {
      // Récupérer l'ID de l'événement
      const rendezVousId = clickInfo.event.id;

      // Récupérer les détails du rendez-vous
      const details = await getRendezVous(rendezVousId);
      this.selectedRendezVous = details; // Stocker les détails dans une variable

      // Afficher le modal Bootstrap
      // eslint-disable-next-line no-undef
      const modal = new bootstrap.Modal(
        document.getElementById("rendezVousModal")
      );
      modal.show();
    },
    handleEvents(events) {
      this.currentEvents = events;
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 0;
  font-size: 16px;
}

ul {
  margin: 0;
  padding-left: 1.5em;
}

li {
  margin: 1.5em 0;
}

b {
  margin-right: 3px;
}

.demo-app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

/* .demo-app-sidebar {
  width: 300px;
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}

.demo-app-sidebar-section {
  padding: 2em;
} */

.demo-app-main {
  flex-grow: 1;
  padding: 1em;
}

.fc {
  max-width: 100%;
  margin: 0 auto;
}
</style>
