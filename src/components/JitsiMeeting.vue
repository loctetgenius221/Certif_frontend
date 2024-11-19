<template>
  <div class="telemedicine-room">
    <!-- En-tête de la consultation -->
    <div class="consultation-header bg-white rounded-xl shadow-sm p-4 mb-4">
      <div
        class="d-flex flex-wrap justify-content-between align-items-center gap-3"
      >
        <div>
          <h2 class="h4 mb-1 d-flex align-items-center gap-2">
            <i class="bi bi-camera-video-fill text-primary"></i>
            Téléconsultation
            {{ isDoctor ? "avec " + patientName : "avec Dr. " + doctorName }}
          </h2>
          <p class="text-muted mb-0">
            {{ formatDate(consultationDate) }} - {{ formatTime(startTime) }} à
            {{ formatTime(endTime) }}
          </p>
        </div>
        <div class="consultation-timer">
          <ConsultationStatus
            :status="consultationStatus"
            :remainingTime="remainingTime"
            class="status-badge"
          />
        </div>
      </div>
    </div>

    <!-- Zone principale -->
    <div class="row g-4">
      <!-- Zone de vidéo consultation -->
      <div class="col-12">
        <div
          v-if="isMeetingActive"
          class="video-container bg-dark rounded-xl overflow-hidden shadow-sm"
        >
          <div id="jitsi-container" class="w-100 h-100"></div>
        </div>
        <div
          v-else
          class="video-placeholder bg-white rounded-xl p-5 text-center shadow-sm"
        >
          <img
            src="/api/placeholder/120/120"
            alt="Consultation"
            class="mb-4 rounded-circle"
          />
          <h3 class="h5 mb-3">Prêt pour votre consultation ?</h3>
          <p class="text-muted">Vérifiez votre équipement avant de commencer</p>
        </div>
      </div>

      <!-- Contrôles et informations -->
      <div class="col-12 col-lg-8">
        <div class="bg-white rounded-xl shadow-sm p-4">
          <button
            @click="startConsultation"
            :disabled="!canStartConsultation"
            class="btn w-100 position-relative"
            :class="[
              isMeetingActive ? 'btn-danger' : 'btn-primary',
              !canStartConsultation && 'btn-secondary',
            ]"
          >
            <i
              class="bi"
              :class="[
                isMeetingActive ? 'bi-telephone-x' : 'bi-telephone',
                'me-2',
              ]"
            ></i>
            <span v-if="!isMeetingActive">
              {{ getStartButtonText }}
            </span>
            <span v-else> Terminer la consultation </span>
          </button>

          <div class="quick-actions mt-4 d-flex gap-2">
            <button class="btn btn-light flex-grow-1" @click="testAudio">
              <i class="bi bi-mic me-2"></i>
              Tester l'audio
            </button>
            <button class="btn btn-light flex-grow-1" @click="testVideo">
              <i class="bi bi-camera me-2"></i>
              Tester la vidéo
            </button>
          </div>
        </div>
      </div>

      <!-- Informations et conseils -->
      <div class="col-12 col-lg-4">
        <div class="bg-white rounded-xl shadow-sm p-4">
          <h3 class="h6 mb-3 d-flex align-items-center gap-2">
            <i class="bi bi-info-circle-fill text-primary"></i>
            Informations importantes
          </h3>

          <div class="guidelines">
            <div class="guideline-item">
              <div
                class="icon-wrapper bg-primary-subtle text-primary rounded-circle p-2"
              >
                <i class="bi bi-clock"></i>
              </div>
              <div class="content">
                <h4 class="h6 mb-1">Timing</h4>
                <p class="small text-muted mb-0">
                  Connexion possible 5 minutes avant l'heure prévue
                </p>
              </div>
            </div>

            <div class="guideline-item">
              <div
                class="icon-wrapper bg-primary-subtle text-primary rounded-circle p-2"
              >
                <i class="bi bi-shield-check"></i>
              </div>
              <div class="content">
                <h4 class="h6 mb-1">Sécurité</h4>
                <p class="small text-muted mb-0">
                  Consultation cryptée et confidentielle
                </p>
              </div>
            </div>

            <div class="guideline-item">
              <div
                class="icon-wrapper bg-primary-subtle text-primary rounded-circle p-2"
              >
                <i class="bi bi-headset"></i>
              </div>
              <div class="content">
                <h4 class="h6 mb-1">Équipement</h4>
                <p class="small text-muted mb-0">
                  Vérifiez votre matériel avant de commencer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
  onUnmounted,
  computed,
  defineProps,
  nextTick,
} from "vue";
import { useToast } from "vue-toastification";
import ConsultationStatus from "./ConsultationStatus.vue";

const props = defineProps({
  consultationId: String,
  roomUrl: String,
  consultationDate: String,
  startTime: String,
  endTime: String,
  patientName: String,
  doctorName: String,
  isDoctor: Boolean,
});

const toast = useToast();
const isMeetingActive = ref(false);
const remainingTime = ref(null);
const consultationStatus = ref("waiting");
let api = null;
let checkTimer = null;

// États calculés
const canStartConsultation = computed(() => {
  if (isMeetingActive.value) return true;
  if (consultationStatus.value === "ended") return false;

  const now = new Date();
  const consultStart = new Date(`${props.consultationDate}T${props.startTime}`);
  const earliestStart = new Date(consultStart.getTime() - 5 * 60000);

  return now >= earliestStart;
});

const getStartButtonText = computed(() => {
  if (consultationStatus.value === "ended") return "Consultation terminée";
  if (!canStartConsultation.value) {
    return `Démarre dans ${formatRemainingTime(remainingTime.value)}`;
  }
  return "Démarrer la consultation";
});

const getRoomNameFromUrl = (url) => {
  // Supprimez le préfixe "https://meet.jit.si/" s'il est présent
  return url.replace("https://meet.jit.si/", "");
};

// Méthodes
const initJitsi = async () => {
  if (typeof window.JitsiMeetExternalAPI !== "function") {
    console.error("Jitsi Meet External API not loaded");
    toast.error("Erreur de chargement de Jitsi");
    return;
  }

  await nextTick();

  const jitsiContainer = document.getElementById("jitsi-container");

  if (!jitsiContainer) {
    console.error("Jitsi container not found");
    toast.error("Erreur : conteneur introuvable");
    return;
  }
  const roomName = getRoomNameFromUrl(props.roomUrl); // Appelle la fonction pour extraire le nom de la salle

  const options = {
    roomName: roomName,
    width: "100%",
    height: "100%",
    parentNode: jitsiContainer,
    userInfo: {
      displayName: props.isDoctor ? props.doctorName : props.patientName,
    },
    configOverwrite: {
      startWithAudioMuted: true,
      startWithVideoMuted: true,
      prejoinPageEnabled: false, // Désactiver la page de préjointure
      disableDeepLinking: true,
      enableLobby: false,
      notifications: [],
    },
    interfaceConfigOverwrite: {
      TOOLBAR_BUTTONS: [
        "microphone",
        "camera",
        "fullscreen",
        "hangup",
        "chat",
        "settings",
        "raisehand",
        "videoquality",
        "tileview",
      ],
      SHOW_JITSI_WATERMARK: false, // Options pour une interface plus simple
      SHOW_WATERMARK_FOR_GUESTS: false,
    },
  };
  try {
    api = new window.JitsiMeetExternalAPI("meet.jit.si", options);
    api.addEventListeners({
      videoConferenceJoined: handleJoined,
      videoConferenceLeft: handleLeft,
      participantJoined: handleParticipantJoined,
      participantLeft: handleParticipantLeft,
    });
  } catch (error) {
    console.error("Erreur Jitsi:", error);
    toast.error("Erreur lors de l'initialisation");
  }
};

const startConsultation = () => {
  if (isMeetingActive.value) {
    endConsultation();
  } else {
    isMeetingActive.value = true;
    consultationStatus.value = "active";
    initJitsi();
  }
};

const endConsultation = async () => {
  if (api) {
    api.executeCommand("hangup");
    api.dispose();
    api = null;
  }
  isMeetingActive.value = false;
  consultationStatus.value = "ended";

  try {
    await fetch(`/api/consultations/${props.consultationId}/end`, {
      method: "POST",
    });
    toast.success("Consultation terminée");
  } catch (error) {
    console.error("Erreur lors de la finalisation:", error);
    toast.error("Erreur lors de la finalisation");
  }
};

const checkConsultationTime = () => {
  const now = new Date();
  const consultStart = new Date(`${props.consultationDate}T${props.startTime}`);
  const consultEnd = new Date(`${props.consultationDate}T${props.endTime}`);
  const timeUntilStart = consultStart - now;
  const timeUntilEnd = consultEnd - now;

  if (timeUntilStart > 0) {
    remainingTime.value = timeUntilStart;
    consultationStatus.value = "waiting";
  } else if (timeUntilEnd > 0) {
    remainingTime.value = timeUntilEnd;
    consultationStatus.value = "active";
  } else {
    consultationStatus.value = "ended";
    clearInterval(checkTimer);
  }
};

const formatRemainingTime = (ms) => {
  if (!ms) return "";
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes} min ${seconds} s`;
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatTime = (time) => {
  return time ? time.slice(0, 5) : "";
};

const handleJoined = () => {
  console.log("Rejoint");
};

const handleLeft = () => {
  endConsultation();
};

const handleParticipantJoined = () => {
  toast.success("Participant connecté");
};

const handleParticipantLeft = () => {
  toast.warning("Participant déconnecté");
};

const testAudio = () => {
  toast.info("Test audio en cours...");
};

const testVideo = () => {
  toast.info("Test vidéo en cours...");
};

onMounted(() => {
  checkConsultationTime();
  checkTimer = setInterval(checkConsultationTime, 1000 * 60);
});

onUnmounted(() => {
  if (checkTimer) clearInterval(checkTimer);
  if (isMeetingActive.value) endConsultation();
});
</script>

<style scoped>
.telemedicine-room {
  min-height: 100vh;
  background-color: #f8fafc;
  padding: 1.5rem;
}

.video-container {
  height: 600px;
  background: #1a1a1a;
  position: relative;
}

.video-placeholder {
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
}

.consultation-timer {
  min-width: 200px;
}

.status-badge {
  text-align: center;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
}

.guideline-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1rem 0;
  border-bottom: 1px solid #e9ecef;
}

.guideline-item:last-child {
  border-bottom: none;
}

.icon-wrapper {
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-wrapper i {
  font-size: 1.25rem;
}

.quick-actions {
  transition: all 0.3s ease;
}

.quick-actions .btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary {
  background: var(--bs-primary);
  border: none;
}

.btn-primary:hover {
  background: var(--bs-primary-dark);
  transform: translateY(-1px);
}

.btn-danger {
  background: #dc3545;
  border: none;
}

.btn-danger:hover {
  background: #bb2d3b;
  transform: translateY(-1px);
}

@media (max-width: 991.98px) {
  .telemedicine-room {
    padding: 1rem;
  }

  .video-container,
  .video-placeholder {
    height: 400px;
  }

  .consultation-header {
    text-align: center;
  }

  .consultation-header .d-flex {
    justify-content: center;
  }

  .consultation-timer {
    width: 100%;
  }
}

/* Animation pour le statut de la consultation */
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.status-badge[data-status="active"] {
  animation: pulse 2s infinite;
}
</style>
