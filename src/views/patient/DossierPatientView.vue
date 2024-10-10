<template>
  <div class="d-flex">
    <SidebaPatient />
    <div class="section-content">
      <HeaderPatient />
      <div class="">
        <h1>Dossier Médicales</h1>
      </div>
    </div>
    
  </div>
</template>
<script setup>
import SidebaPatient from "@/components/SidebaPatient.vue";
import HeaderPatient from "@/components/HeaderPatient.vue";
</script>

<style scoped>
</style>