<template>
  <div>
    <h2>Calendrier des rendez-vous</h2>
    <VueCal
      :events="events.value"
      :time="true"
      default-view="week"
      locale="fr"
      @cell-click="openModal"
      @event-click="openModal"
      :on-event-create="() => {}"
      class="vuecal"
    >
      <!-- Slot pour personnaliser l'affichage des événements -->
      <template #event="{ event }">
        <div class="event-info">
          <strong>{{ event.title }}</strong>
          <div>Type: {{ event.type_rendez_vous }}</div>
          <div>Statut: {{ event.status }}</div>
          <div v-if="event.type_rendez_vous === 'présentiel'">
            Lieu: {{ event.lieu }}
          </div>
        </div>
      </template>
    </VueCal>

    <!-- Modal pour ajouter ou modifier un rendez-vous -->
    <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h3>
          {{ selectedEvent ? "Modifier Rendez-vous" : "Nouveau Rendez-vous" }}
        </h3>

        <form @submit.prevent="handleFormSubmit">
          <label for="date">Date</label>
          <input type="date" v-model="form.date" required />

          <label for="heure_debut">Heure de début</label>
          <input type="time" v-model="form.heure_debut" required />

          <label for="heure_fin">Heure de fin</label>
          <input type="time" v-model="form.heure_fin" required />

          <label for="type_rendez_vous">Type</label>
          <select v-model="form.type_rendez_vous">
            <option value="présentiel">Présentiel</option>
            <option value="téléconsultation">Téléconsultation</option>
          </select>

          <label for="motif">Motif</label>
          <select v-model="form.motif">
            <option value="consultation">Consultation</option>
            <option value="suivi">Suivi</option>
          </select>

          <label for="status">Statut</label>
          <select v-model="form.status">
            <option value="à venir">À venir</option>
            <option value="en cours">En cours</option>
            <option value="terminé">Terminé</option>
            <option value="annulé">Annulé</option>
          </select>

          <label v-if="form.type_rendez_vous === 'présentiel'" for="lieu">Lieu</label>
          <input
            v-if="form.type_rendez_vous === 'présentiel'"
            type="text"
            v-model="form.lieu"
          />

          <button type="submit">
            {{ selectedEvent ? "Modifier" : "Ajouter" }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import { getRendezVousList } from "@/services/rendezvousService"; // Ton service pour récupérer les données

const events = ref([]);
const isModalOpen = ref(false);
const selectedEvent = ref(null);
const form = ref({
  date: "",
  heure_debut: "",
  heure_fin: "",
  type_rendez_vous: "présentiel",
  motif: "consultation",
  status: "à venir",
  lieu: "",
});

const openModal = (event) => {
  isModalOpen.value = true;
  if (event && event.event) {
    selectedEvent.value = event.event;
    form.value = { ...event.event };
  } else {
    selectedEvent.value = null;
    form.value = {
      date: event.dateStr,
      heure_debut: "",
      heure_fin: "",
      type_rendez_vous: "présentiel",
      motif: "consultation",
      status: "à venir",
      lieu: "",
    };
  }
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedEvent.value = null;
};

const handleFormSubmit = () => {
  if (selectedEvent.value) {
    // Mise à jour d'un rendez-vous existant
    selectedEvent.value.title = `${form.value.motif} (${form.value.status})`;
    selectedEvent.value.start = form.value.date + "T" + form.value.heure_debut;
    selectedEvent.value.end = form.value.date + "T" + form.value.heure_fin;
    selectedEvent.value.type_rendez_vous = form.value.type_rendez_vous;
    selectedEvent.value.lieu = form.value.lieu;
  } else {
    // Ajout d'un nouveau rendez-vous
    events.value.push({
      start: form.value.date + "T" + form.value.heure_debut,
      end: form.value.date + "T" + form.value.heure_fin,
      title: `${form.value.motif} (${form.value.status})`,
      type_rendez_vous: form.value.type_rendez_vous,
      lieu: form.value.lieu,
    });
  }
  closeModal();
};

const loadRendezVous = async () => {
  try {
    const response = await getRendezVousList();
    events.value = response.data.map((rdv) => ({
      start: `${rdv.date}T${rdv.heure_debut}`,
      end: `${rdv.date}T${rdv.heure_fin}`,
      title: `${rdv.motif} (${rdv.status})`,
      type_rendez_vous: rdv.type_rendez_vous,
      lieu: rdv.lieu,
    }));
    console.log(events.value)
  } catch (error) {
    console.error("Erreur lors de la récupération des rendez-vous:", error);
  }
};

onMounted(() => {
  loadRendezVous();
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
  z-index: 1000;
}

.modal-content {
  width: 50%;
  height: 100%;
  background: white;
  padding: 20px;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.vuecal {
  border-radius: 8px;
  box-shadow: 0 5px 13px #297fb911;
}

.vuecal__header {
  background-color: #000;
  color: white;
}

.vuecal__cell {
  border: 1px solid #ddd;
}

.vuecal__event {
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  padding: 2px 5px;
}

.vuecal__time-label {
  color: #007bff;
}
</style>
