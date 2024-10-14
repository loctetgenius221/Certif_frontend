<template>
  <div class="calendar-container">
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script>
import { ref } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr"; // Importer la localisation française
import { getPlagesHorairesMedecin } from "@/services/rendezvousService";

export default {
  props: {
    medecin_id: {
      type: Number,
      required: true,
    },
  },
  emits: ['plagesHoraires'],
  components: {
    FullCalendar,
  },
  setup(props, { emit }) {
    const selectedDate = ref(null);
    // const plagesHoraires = ref([]);
    // const medecin_id = ref(1);

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
      dateClick: async (info) => {
        selectedDate.value = info.dateStr;

        try {
          // Récupérer les plages horaires pour le médecin
          const response = await getPlagesHorairesMedecin(props.medecin_id, selectedDate.value);
          const plages = response.map(plage => ({
            id: plage.id,
            heure_debut: plage.heure_debut,
            heure_fin: plage.heure_fin,
          }));
          
          emit('plagesHoraires', plages); // Émettre les plages horaires vers le parent
        } catch (error) {
          console.error("Erreur lors de la récupération des plages horaires :", error);
        }
      },
    });


    // const calendarOptions = ref({
    //   plugins: [dayGridPlugin, interactionPlugin],
    //   headerToolbar: {
    //     left: "prev,next today",
    //     center: "title",
    //     right: "dayGridMonth",
    //   },
    //   initialView: "dayGridMonth",
    //   locale: frLocale, // Utiliser la langue française
    //   timeZone: "Africa/Dakar", // Définir le fuseau horaire sur Dakar
    //   selectable: true, // Permettre la sélection de la date
    //   hiddenDays: [0],
    //   events: [], // Pour l'instant, aucun événement ajouté
    //   dateClick: (info) => handleDateClick(info), // Gestionnaire de clic sur la date
    // });

    // Fonction asynchrone pour gérer le clic sur une date
    // const handleDateClick = async (info) => {
    //   selectedDate.value = info.dateStr;
    //   console.log("Date sélectionnée :", selectedDate.value);

    //   try {
    //     // Récupérer les plages horaires du médecin
    //     const response = await getPlagesHorairesMedecin(medecin_id.value, selectedDate.value);
    //     console.log("Id du medecin: ", medecin_id.value);
    //     console.log("Réponse brute de l'API :", response);

    //     // Vérifiez si la réponse contient les plages horaires
    //     if (response && response.length > 0) {
    //       plagesHoraires.value = response.map((plage) => ({
    //         id: plage.id,
    //         heure_debut: plage.heure_debut,
    //         heure_fin: plage.heure_fin,
    //       }));
    //     } else {
    //       plagesHoraires.value = []; // Réinitialiser si aucune plage horaire n'est disponible
    //     }

    //     console.log("Les plages horaires du médecin :", plagesHoraires.value);
    //   } catch (error) {
    //     console.error("Erreur lors de la récupération des plages horaires :", error);
    //   }
    // };

    // onMounted(() => {
    //   console.log("Le composant est monté !");
    // });

    return {
      calendarOptions,
      // selectedDate,
      // plagesHoraires,
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
