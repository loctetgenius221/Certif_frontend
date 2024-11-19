<template>
  <div 
    class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium"
    :class="statusClasses"
  >
    <span class="relative flex h-3 w-3 mr-2">
      <span 
        class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
        :class="pingColorClass"
      ></span>
      <span 
        class="relative inline-flex rounded-full h-3 w-3"
        :class="dotColorClass"
      ></span>
    </span>
    {{ statusText }}
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue';

const props = defineProps({
  consultationDate: {
    type: String,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  }
});

const getConsultationStatus = () => {
  const now = new Date();
  const consultStart = new Date(`${props.consultationDate}T${props.startTime}`);
  const consultEnd = new Date(`${props.consultationDate}T${props.endTime}`);
  const fiveMinutesBefore = new Date(consultStart.getTime() - 5 * 60000);

  if (now >= consultEnd) return 'ended';
  if (now >= consultStart) return 'active';
  if (now >= fiveMinutesBefore) return 'imminent';
  return 'upcoming';
};

const status = computed(() => getConsultationStatus());

const statusClasses = computed(() => ({
  'bg-gray-100 text-gray-700': status.value === 'ended',
  'bg-green-100 text-green-700': status.value === 'active',
  'bg-yellow-100 text-yellow-700': status.value === 'imminent',
  'bg-blue-100 text-blue-700': status.value === 'upcoming'
}));

const pingColorClass = computed(() => ({
  'bg-gray-400': status.value === 'ended',
  'bg-green-400': status.value === 'active',
  'bg-yellow-400': status.value === 'imminent',
  'bg-blue-400': status.value === 'upcoming'
}));

const dotColorClass = computed(() => ({
  'bg-gray-500': status.value === 'ended',
  'bg-green-500': status.value === 'active',
  'bg-yellow-500': status.value === 'imminent',
  'bg-blue-500': status.value === 'upcoming'
}));

const statusText = computed(() => {
  switch (status.value) {
    case 'ended':
      return 'Consultation terminée';
    case 'active':
      return 'En cours';
    case 'imminent':
      return 'Démarre bientôt';
    case 'upcoming':
      return 'À venir';
    default:
      return '';
  }
});
</script>