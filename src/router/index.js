import { createRouter, createWebHashHistory } from 'vue-router'
import AdminView from '../views/admin/AdminView.vue';
import MedecinView from '../views/medecin/MedecinView.vue';
import PatientView from '../views/patient/PatientView.vue';
import AssistantView from '../views/assistant/AssistantView.vue';
import PortailView from '../views/portal/PortailView.vue';

const routes = [
  {
    path: '/',
    name: 'Portail',
    component: PortailView,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminView
  },
  {
    path: '/medecin',
    name: 'Medecin',
    component: MedecinView,
  },
  {
    path: '/patient',
    name: 'Patient',
    component: PatientView,
  },
  {
    path: '/assistant',
    name: 'Assistant',
    component: AssistantView,
  },
  
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
