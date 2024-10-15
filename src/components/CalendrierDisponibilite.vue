<template>
  <div class="calendar-container">
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr"; // Localisation française
import { getPlagesHorairesMedecin } from "@/services/rendezvousService"; // Appel API

export default {
  props: {
    medecin_id: {
      type: Number,
      required: true,
    },
  },
  emits: ["plagesHoraires"],
  components: {
    FullCalendar,
  },
  setup(props, { emit }) {
    const selectedDate = ref(new Date().toISOString().split("T")[0]);
    const currentTime = ref(new Date().toTimeString().slice(0, 5)); // Heure actuelle au format HH:mm

    // Fonction pour formater les heures au format HH:mm - HH:mm
    const formatTime = (heureDebut, heureFin) => {
      const debut = new Date(`1970-01-01T${heureDebut}`);
      const fin = new Date(`1970-01-01T${heureFin}`);
      const options = { hour: "2-digit", minute: "2-digit" };
      return `${debut.toLocaleTimeString("fr-FR", options)} - ${fin.toLocaleTimeString("fr-FR", options)}`;
    };

    // Fonction pour récupérer les plages horaires
    const fetchPlagesHoraires = async (date) => {
      try {
        const response = await getPlagesHorairesMedecin(props.medecin_id, date);

        const plages = response.map((plage) => {
          const isSameDay = date === new Date().toISOString().split("T")[0];
          const isTimePast = isSameDay && plage.heure_debut < currentTime.value;

          return {
            id: plage.id,
            date: plage.date,
            heure_debut: plage.heure_debut,
            heure_fin: plage.heure_fin,
            formattedTime: formatTime(plage.heure_debut, plage.heure_fin),
            disabled: isTimePast, // Désactiver les plages si l'heure est passée
          };
        });

        emit("plagesHoraires", plages); // Émettre les plages horaires vers le parent
      } catch (error) {
        console.error("Erreur lors de la récupération des plages horaires :", error);
      }
    };

    // Options du calendrier
    const calendarOptions = ref({
      plugins: [dayGridPlugin, interactionPlugin],
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth",
      },
      initialView: "dayGridMonth",
      locale: frLocale,
      timeZone: "Africa/Dakar",
      selectable: true,
      validRange: {
        start: new Date().toISOString().split("T")[0], // Désactiver les dates avant aujourd'hui
      },
      dateClick: async (info) => {
        selectedDate.value = info.dateStr;
        await fetchPlagesHoraires(selectedDate.value); // Appel de la fonction lorsque la date est cliquée
      },
    });

    // Charger les plages horaires du jour lors du montage
    onMounted(async () => {
      await fetchPlagesHoraires(selectedDate.value);
    });

    return {
      calendarOptions,
    };
  },
};
</script>


<style scoped>
.disabled-date {
  background-color: #e0e0e0;
  pointer-events: none;
  opacity: 0.5;
}

.fc-toolbar-title {
  color: black; /* Change la couleur du titre du calendrier */
}

.fc .fc-daygrid-day-number {
  color: black; /* Change la couleur des numéros de jour du mois */
  text-decoration: none; /* Enlève le soulignement des numéros */
}

.fc-day-today {
  background-color: #f5f5f5 !important; /* Couleur d'arrière-plan pour le jour actuel */
}

.fc-toolbar {
  color: black; /* Couleur pour les éléments de la barre d'outils (précédent, suivant, aujourd'hui) */
}

.fc-button-primary {
  background-color: black !important;
  border-color: black !important;
  color: white !important; /* Change la couleur des boutons */
}

.fc-button-primary:hover {
  background-color: #333 !important;
  border-color: #333 !important; /* Change la couleur des boutons au survol */
}
</style>
