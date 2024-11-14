<!-- VideoConsultation.vue -->
<template>
  <div class="container video-consultation">
    <!-- Consultation Header -->
    <div class="consultation-header card mb-4" v-if="consultation && consultation.rendez_vous" :class="{ 'bg-light': isConsultationActive }">
      <div class="card-body">
        <h2 class="card-title">
          Téléconsultation avec Dr. {{ consultation.medecin?.user?.nom }}
        </h2>
        <div class="row">
          <div class="col-md-6 info-item" v-if="consultation.patient">
            <span class="fw-bold">Patient:</span>
            <span>{{ consultation.patient.user?.nom }}</span>
          </div>
          <div class="col-md-6 info-item">
            <span class="fw-bold">Date:</span>
            <span>{{ formatDate(consultation.date) }}</span>
          </div>
          <div class="col-md-6 info-item">
            <span class="fw-bold">Heure:</span>
            <span>{{ formatTime(consultation.heure_debut) }} - {{ formatTime(consultation.heure_fin) }}</span>
          </div>
          <div class="col-md-6 info-item">
            <span class="fw-bold">Statut:</span>
            <span :class="'badge bg-' + formatStatusClass(consultation.statut)">
              {{ formatStatus(consultation.statut) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Consultation Controls -->
      <div v-if="!isConsultationActive" class="consultation-controls text-center mt-3">
        <button 
          @click="startConsultation"
          :disabled="!canStartConsultation"
          class="btn btn-primary start-button"
          :class="{ 'btn-success': canStartConsultation }"
        >
          {{ getStartButtonText }}
        </button>
        <p v-if="!canStartConsultation && consultation.statut === 'prévue'" class="text-muted mt-2">
          La consultation pourra démarrer 5 minutes avant l'heure prévue
        </p>
      </div>
    </div>

    <!-- Video Section -->
    <div v-if="isConsultationActive" class="video-section card text-white bg-dark mb-4">
      <div class="card-body">
        <div class="row">
          <div class="col-md-6 video-participant" id="local-participant">
            <div class="participant-name">Vous</div>
          </div>
          <div class="col-md-6 video-participant" id="remote-participant">
            <div class="participant-name">
              {{ isDoctor ? consultation.patient.user.nom : consultation.medecin.user.nom }}
            </div>
          </div>
        </div>

        <!-- Video Controls -->
        <div class="video-controls d-flex justify-content-center mt-3">
          <button @click="toggleAudio" class="btn btn-secondary me-2" :class="{ 'btn-primary': isAudioEnabled }">
            <span v-if="isAudioEnabled">🎤</span>
            <span v-else>🔇</span>
          </button>
          <button @click="toggleVideo" class="btn btn-secondary me-2" :class="{ 'btn-primary': isVideoEnabled }">
            <span v-if="isVideoEnabled">📹</span>
            <span v-else>🚫</span>
          </button>
          <button @click="endConsultation" class="btn btn-danger">
            Terminer la consultation
          </button>
        </div>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="alert alert-danger mt-4" role="alert">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeUnmount, defineProps } from 'vue'
import { connect, createLocalVideoTrack, createLocalAudioTrack } from 'twilio-video'
import { useAuthStore } from '@/store/auth'; 

const props = defineProps({
  consultation: {
    type: Object,
    required: true,
    default: () => ({})
  }
})

// État local
const isConsultationActive = ref(false)
const isAudioEnabled = ref(true)
const isVideoEnabled = ref(true)
const error = ref('')
const room = ref(null)
const localTracks = ref({
  video: null,
  audio: null
})

const authStore = useAuthStore()

// Computed properties
const isDoctor = computed(() => {
  return authStore.userId === props.consultation.medecin.user.id
})

const canStartConsultation = computed(() => {
  if (props.consultation.statut !== 'prévue') return false
  
  const consultationTime = new Date(`${props.consultation.date}T${props.consultation.heure_debut}`)
  const now = new Date()
  const timeDiff = consultationTime - now
  
  // Autorise 5 minutes avant et jusqu'à 30 minutes après
  return timeDiff <= 5 * 60 * 1000 && timeDiff > -30 * 60 * 1000
})

const getStartButtonText = computed(() => {
  if (props.consultation.statut === 'terminée') return 'Consultation terminée'
  if (props.consultation.statut === 'annulée') return 'Consultation annulée'
  if (!canStartConsultation.value) return 'Pas encore disponible'
  return 'Démarrer la consultation'
})

// Méthodes
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const formatTime = (time) => {
  return time.substring(0, 5)
}

const formatStatus = (status) => {
  const statusMap = {
    'prévue': 'Prévue',
    'terminée': 'Terminée',
    'annulée': 'Annulée'
  }
  return statusMap[status] || status
}

const formatStatusClass = (status) => {
  const statusClassMap = {
    'prévue': 'primary',
    'terminée': 'success',
    'annulée': 'danger'
  }
  return statusClassMap[status] || 'secondary'
}

const startConsultation = async () => {
  try {
    if (!canStartConsultation.value) {
      error.value = "Il n'est pas encore l'heure de la consultation"
      return
    }

    // Demander les permissions et créer les tracks
    const videoTrack = await createLocalVideoTrack()
    const audioTrack = await createLocalAudioTrack()
    localTracks.value = { video: videoTrack, audio: audioTrack }

    // Afficher la vidéo locale
    const localElement = document.getElementById('local-participant')
    if (videoTrack) {
      localElement.appendChild(videoTrack.attach())
    }

    // Récupérer le token depuis l'API
    const response = await fetch(`/api/consultations/${props.consultation.id}/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authStore.token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du token')
    }

    const data = await response.json()

    // Connexion à la room Twilio
    room.value = await connect(data.token, {
      name: `consultation-${props.consultation.id}`,
      tracks: [videoTrack, audioTrack]
    })

    // Enregistrer la participation
    await fetch(`/api/consultations/${props.consultation.id}/participation`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authStore.token}`,
        'Content-Type': 'application/json'
      }
    })

    // Gérer les participants distants
    room.value.participants.forEach(participantConnected)
    room.value.on('participantConnected', participantConnected)
    room.value.on('participantDisconnected', participantDisconnected)

    isConsultationActive.value = true
    error.value = ''

  } catch (err) {
    error.value = "Erreur lors du démarrage de la consultation: " + err.message
    cleanupTracks()
  }
}

const participantConnected = (participant) => {
  const remoteContainer = document.getElementById('remote-participant')
  participant.tracks.forEach(publication => {
    if (publication.isSubscribed) {
      const track = publication.track
      remoteContainer.appendChild(track.attach())
    }
  })

  participant.on('trackSubscribed', track => {
    remoteContainer.appendChild(track.attach())
  })
}

const participantDisconnected = (participant) => {
  participant.tracks.forEach(publication => {
    const elements = document.getElementsByClassName('track-' + publication.trackSid)
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0])
    }
  })
}

const toggleAudio = () => {
  if (localTracks.value.audio) {
    localTracks.value.audio.enable(!localTracks.value.audio.isEnabled)
    isAudioEnabled.value = localTracks.value.audio.isEnabled
  }
}

const toggleVideo = () => {
  if (localTracks.value.video) {
    localTracks.value.video.enable(!localTracks.value.video.isEnabled)
    isVideoEnabled.value = localTracks.value.video.isEnabled
  }
}

const endConsultation = async () => {
  try {
    await fetch(`/api/consultations/${props.consultation.id}/end`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authStore.token}`,
        'Content-Type': 'application/json'
      }
    })

    room.value.disconnect()
    isConsultationActive.value = false
    cleanupTracks()
  } catch (err) {
    error.value = "Erreur lors de la fin de la consultation: " + err.message
  }
}

const cleanupTracks = () => {
  if (localTracks.value.video) {
    localTracks.value.video.stop()
  }
  if (localTracks.value.audio) {
    localTracks.value.audio.stop()
  }
}

onBeforeUnmount(() => {
  if (room.value) {
    room.value.disconnect()
  }
  cleanupTracks()
})
</script>

<style scoped>
.video-consultation .video-participant {
  height: 300px;
  background-color: #333;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.video-controls .btn {
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
}
</style>
