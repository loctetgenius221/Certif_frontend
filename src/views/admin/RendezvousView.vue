<template>
  <div class="d-flex">
    <SidebarAdmin/>
    <div class="section-content">
      <HeaderPatient/>
      <div class="section-container">
        <h1>Rendez Vous</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
import SidebarAdmin from '@/components/SidebarAdmin.vue';
import HeaderPatient from '@/components/HeaderPatient.vue';
</script>