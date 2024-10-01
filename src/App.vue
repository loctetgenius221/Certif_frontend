<template>
  <div id="app">
    <EnTete />
    <RouterView/>
    <PiedDePage />
  </div>
</template>

<script>
import '../src/assets/css/GlobalView.css' 
import EnTete from './components/EnTete.vue';
import PiedDePage from './components/PiedDePage.vue';

export default {
  components: {
    EnTete,
    PiedDePage,
  },
};
</script>