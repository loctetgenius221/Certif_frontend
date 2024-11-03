<template>
  <div>
    <button @click="goBack" class="btn btn-retour">
      <i class="bi bi-arrow-left-short"></i>Retour
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.go(-1);
};
</script>
