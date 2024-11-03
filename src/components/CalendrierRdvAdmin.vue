<template>
  <div class="container-fluid mx-auto px-0 py-0">
    <div class="bg-white shadow-xl rounded-2xl overflow-hidden">
      <FullCalendar :options="calendarOptions" class="fc-theme-custom" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";
import { getRendezVousList } from "@/services/rendezvousService";

// Enum pour les status
const EventStatus = {
  A_VENIR: "à venir",
  TERMINE: "terminé",
  ANNULE: "annulé",
};

// Fonction pour générer la classe de couleur basée sur le statut
const getStatusClass = (status) => {
  switch (status) {
    case EventStatus.A_VENIR:
      return "bg-blue-500";
    case EventStatus.TERMINE:
      return "bg-success";
    case EventStatus.ANNULE:
      return "bg-danger";
    default:
      return "bg-gray-500";
  }
};

const events = ref([]);

// Fonction pour récupérer les rendez-vous
const fetchRendezVous = async () => {
  try {
    const response = await getRendezVousList(); // Appel à la fonction pour récupérer les rendez-vous
    console.log("Données récupérées :", response.data);
    // Formater les données pour le calendrier
    events.value = response.data.map((rdv) => ({
      id: rdv.id,
      title: `${rdv.medecin.user.prenom} ${rdv.medecin.user.nom} - ${rdv.type_rendez_vous}`, // Titre de l'événement
      start: `${rdv.date}T${rdv.heure_debut}`,
      end: `${rdv.date}T${rdv.heure_fin}`,
      description: rdv.motif,
      status: rdv.status,
      classNames: [getStatusClass(rdv.status)],
    }));
    console.log("Données mappées avec events:", events.value);
  } catch (error) {
    console.error("Erreur lors de la récupération des rendez-vous :", error);
  }
};

const calendarOptions = computed(() => ({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  height: "auto",
  headerToolbar: {
    left: "prev,next today",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay",
  },
  locale: frLocale,
  timeZone: "Africa/Dakar",
  buttonText: {
    today: "Aujourd'hui",
  },
  eventDidMount: (info) => {
     const statusClass = getStatusClass(info.event.extendedProps.status);
     info.el.classList.add(statusClass); // Ajouter la classe de statut à l'élément
   },
  
  // Configuration cruciale pour l'affichage des événements
  eventDisplay: "block",

  dayCellClassNames: (info) => {
    return info.date
      ? [
          "transition-all",
          "duration-200",
          "hover:bg-gray-100",
          "cursor-pointer",
          "border-0",
        ]
      : [];
  },

  // Personnalisation de l'affichage des événements
  eventContent: (arg) => {
    const event = arg.event;
    return {
      html: `
        <div class="p-1">
          <div class="text-xs font-semibold">${
            event.extendedProps.status || ""
          }</div>
          <div class="font-bold">${event.title}</div>
          <div class="text-xs">${event.extendedProps.fullName || ""}</div>
          <div class="text-xs">
            ${
              event.start
                ? event.start.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : ""
            } 
            - 
            ${
              event.end
                ? event.end.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : ""
            }
          </div>
          
        </div>
      `,
    };
  },

  // Gestionnaire de clic sur événement
  eventClick: (info) => {
    const event = info.event;
    alert(`
      Détails de l'événement:
      - Titre: ${event.title}
      - Nom: ${event.extendedProps.fullName || "Non spécifié"}
      - Statut: ${event.extendedProps.status || "Non spécifié"}
      - Horaire: ${
        event.start
          ? event.start.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : ""
      } 
        - ${
          event.end
            ? event.end.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : ""
        }
    `);
  },

  dateClick: (info) => {
    console.log("Date cliquée:", info.dateStr);
  },

  // Liez les événements dynamiquement
  events: events.value,
}));

onMounted(fetchRendezVous);
</script>

<style scoped>

.fc-event {
  cursor: pointer;
  transition: all 0.3s ease;
}

.fc-event:hover {
  opacity: 0.8;
  transform: scale(1.02);
}

.fc {
  font-family: "Montserrat", sans-serif; /* Police moderne et épurée */
}

.fc-theme-custom .fc-toolbar.fc-header-toolbar {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: none;
  border-bottom: 1px solid #e2e8f0;
}

.fc-theme-custom .fc-toolbar-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
}

.fc-theme-custom .fc-button {
  background-color: #f1f5f9;
  color: #475569;
  border: none;
  transition: all 0.3s ease;
}

.fc-theme-custom .fc-button:hover {
  background-color: #e2e8f0;
  transform: scale(1.05);
}

.fc-theme-custom .fc-col-header {
  background-color: #f8fafc;
  color: #64748b;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 600;
}

.fc-theme-custom .fc-daygrid-day-number {
  color: #475569;
  font-weight: 500;
}

.fc-theme-custom .fc-daygrid-day:hover {
  background-color: #f1f5f9;
}

.fc-theme-custom .fc-scrollgrid-sync-inner {
  padding: 10px;
}

.fc-theme-custom .fc-scrollgrid-sync-inner .fc-col-header-cell-cushion {
  text-decoration: none;
  color: black;
}
</style>
