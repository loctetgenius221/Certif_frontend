<template>
  <div :class="['status-container', statusClasses]">
    <div class="status-content">
      <div class="status-indicator">
        <span :class="['status-dot', indicatorClass]"></span>
      </div>
      <div class="status-text">
        <span class="status-label">
          {{ statusText }}
        </span>
        <span v-if="props.status === 'waiting' && props.remainingTime" class="status-time">
          Démarre dans {{ formatRemainingTime(props.remainingTime) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue';

const props = defineProps({
  status: {
    type: String,
    required: true,
    validator: (value) => ['waiting', 'active', 'ended'].includes(value)
  },
  remainingTime: {
    type: Number,
    default: null
  }
});

const statusClasses = computed(() => ({
  'status-waiting': props.status === 'waiting',
  'status-active': props.status === 'active',
  'status-ended': props.status === 'ended'
}));

const indicatorClass = computed(() => ({
  'indicator-waiting': props.status === 'waiting',
  'indicator-active': props.status === 'active',
  'indicator-ended': props.status === 'ended'
}));

const statusText = computed(() => {
  switch (props.status) {
    case 'waiting':
      return 'En attente';
    case 'active':
      return 'Consultation en cours';
    case 'ended':
      return 'Consultation terminée';
    default:
      return '';
  }
});

const formatRemainingTime = (ms) => {
  if (!ms) return '';
  const minutes = Math.floor(ms / 60000);
  return `${minutes} minute${minutes > 1 ? 's' : ''}`;
};
</script>

<style scoped>
.status-container {
  padding: 1rem;
  border-radius: 0.5rem;
}

.status-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.status-indicator {
  display: flex;
  align-items: center;
}

.status-dot {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
}

.status-text {
  display: flex;
  flex-direction: column;
}

.status-label {
  font-weight: 500;
}

.status-time {
  font-size: 0.875rem;
  opacity: 0.8;
}

/* États d'attente */
.status-waiting {
  background-color: #fff8e1;
  color: #f57c00;
}

.indicator-waiting {
  background-color: #ffa000;
}

/* États actifs */
.status-active {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.indicator-active {
  background-color: #4caf50;
}

/* États terminés */
.status-ended {
  background-color: #f5f5f5;
  color: #616161;
}

.indicator-ended {
  background-color: #9e9e9e;
}
</style>