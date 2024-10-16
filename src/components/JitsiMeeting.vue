<template>
  <div class="jitsi-meeting">
    <h2>Rejoindre la Téléconsultation</h2>
    <div id="jitsi-container" v-if="isMeetingActive"></div>
    <div v-else>
      <input
        type="text"
        v-model="room"
        placeholder="Entrez le nom de la salle"
        @keyup.enter="joinMeeting"
      />
      <button @click="joinMeeting">Rejoindre la réunion</button>
    </div>
  </div>
</template>

<script>
/* global JitsiMeetExternalAPI */

import { ref, onUnmounted, nextTick } from 'vue';

export default {
  setup() {
    const room = ref('');
    const isMeetingActive = ref(false);
    let api = null;

    const joinMeeting = () => {
      if (room.value) {
        isMeetingActive.value = true;
        // Utiliser nextTick pour s'assurer que le DOM est mis à jour
        nextTick(() => {
          initJitsi();
        });
      }
    };

    const initJitsi = () => {
      const container = document.querySelector('#jitsi-container');
      if (container) {
        const domain = 'meet.jit.si';
        api = new JitsiMeetExternalAPI(domain, {
          roomName: room.value,
          width: '100%',
          height: '600px',
          parentNode: container,
          configOverwrite: {
            startWithAudioMuted: true,
            startWithVideoMuted: true,
          },
        });

        // Optionnel : gérer les événements Jitsi
        api.addEventListeners({
          participantJoined: (participant) => {
            console.log('Participant rejoint:', participant);
          },
          participantLeft: (participant) => {
            console.log('Participant quitté:', participant);
          },
        });
      } else {
        console.error('Le conteneur Jitsi n\'existe pas.');
      }
    };

    // Nettoyer l'API Jitsi lorsque le composant est démonté
    onUnmounted(() => {
      if (api) {
        api.dispose();
      }
    });

    return {
      room,
      isMeetingActive,
      joinMeeting,
    };
  },
};
</script>

<style scoped>
.jitsi-meeting {
  text-align: center;
}

#jitsi-container {
  margin-top: 20px;
}
</style>
