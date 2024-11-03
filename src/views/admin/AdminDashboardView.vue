<template>
  <div class="d-flex">
    <SidebarAdmin/>
    <div class="section-content">
      <HeaderPatient/>
      <div class="section-container">
        <DashboardAdminStat/>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import '@/assets/css/GlobalView.css'
import SidebarAdmin from '@/components/SidebarAdmin.vue';
import HeaderPatient from '@/components/HeaderPatient.vue';
import DashboardAdminStat from '@/components/DashboardAdminStat.vue';


</script>
