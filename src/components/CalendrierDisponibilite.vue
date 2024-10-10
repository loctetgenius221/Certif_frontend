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
import frLocale from "@fullcalendar/core/locales/fr"; // Importer la localisation française

export default {
  components: {
    FullCalendar,
  },
  setup() {
    const selectedDate = ref(null); // Variable réactive pour la date sélectionnée

    const calendarOptions = ref({
      plugins: [dayGridPlugin, interactionPlugin],
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth",
      },
      initialView: "dayGridMonth",
      locale: frLocale, // Utiliser la langue française
      timeZone: "Africa/Dakar", // Définir le fuseau horaire sur Dakar
      selectable: true, // Permettre la sélection de la date
      hiddenDays: [0],
      events: [], // Pour l'instant, aucun événement ajouté
      dateClick: (info) => handleDateClick(info), // Gestionnaire de clic sur la date
    });

    const handleDateClick = (info) => {
      selectedDate.value = info.dateStr;
      console.log("Date sélectionnée :", selectedDate.value);
      // Logique future pour afficher les heures de disponibilité du médecin
    };

    onMounted(() => {
      // Logique qui s'exécute une fois le composant monté, si besoin
      console.log("Le composant est monté !");
    });

    return {
      calendarOptions,
      selectedDate,
    };
  },
};
</script>

<style scoped>
/* Appliquer les modifications de style pour changer la couleur bleue en noir et enlever le soulignement */
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
