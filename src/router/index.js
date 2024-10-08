import { createRouter, createWebHistory } from 'vue-router'
import ConnexionView from '@/views/Auth/ConnexionView.vue';
import InscriptionView from '@/views/Auth/InscriptionView.vue';
import ArticleView from '@/views/portail/ArticleView.vue';
import BlogView from '@/views/portail/BlogView.vue';
import AcceuilView from '@/views/portail/AcceuilView.vue';
import AdminDashboardView from '@/views/admin/AdminDashboardView.vue';
import { useAuthStore } from '@/store/auth';
import MedecinDashboardView from '@/views/medecin/MedecinDashboardView.vue';
import PatientDashboardView from '@/views/patient/PatientDashboardView.vue';
import AssistantDashbordView from '@/views/assistant/AssistantDashbordView.vue';
import DossiermedicalView from '@/views/medecin/DossiermedicalView.vue';
import ConsultationView from '@/views/medecin/ConsultationView.vue';
import ProfilView from '@/views/medecin/ProfilView.vue';
import DetaildmeView from '@/views/medecin/DetaildmeView.vue';
import DetailConsultationView from '@/views/medecin/DetailConsultationView.vue';

const routes = [
  {
    path: '/',
    name: 'Portail',
    component: AcceuilView,
  },
  {
    path: '/blog',
    name: 'Blog',
    component: BlogView,
  },
  {
    path: '/article',
    name: 'Article',
    component: ArticleView,
    props: true, // Permet de passer l'ID de l'article comme un prop
  },
  {
    path: '/inscription',
    name: 'Inscription',
    component: InscriptionView,
  },
  {
    path: '/connexion',
    name: 'Connexion',
    component: ConnexionView,
  },

  // Routes pour Administrateur
  {
    path: "/admin",
    name: "AdminDashboard",
    component: AdminDashboardView,
    meta: { requiresAuth: true, role: 'administrateur' },
  },

  // Routes pour Médecin
  {
    path: '/medecin',
    name: 'Medecin',
    component: MedecinDashboardView,
    meta: { requiresAuth: true, role: 'medecin' },
  },
  {
    path: '/medecin/dossier-medical',
    name: 'DossierMédicalMedecin',
    component: DossiermedicalView,
    meta: { requiresAuth: true, role: 'medecin' },
  },
  {
    path: '/dossiers-medicaux/:id',
    name: 'Détail-DME',
    component: DetaildmeView,
    meta: { requiresAuth: true, role: 'medecin' },
  },
  {
    path: '/medecin/consultation',
    name: 'ConsultationMedecin',
    component: ConsultationView,
    meta: { requiresAuth: true, role: 'medecin' },
  },
  {
    path: '/consultation/:id',
    name: 'Detail-consultation',
    component: DetailConsultationView,
    meta: { requiresAuth: true, role: 'medecin' },
  },
  {
    path: '/medecin/profil',
    name: 'ProfilMedecin',
    component: ProfilView,
    meta: { requiresAuth: true, role: 'medecin' },
  },
  

  // Routes pour Patien
  {
    path: '/patient',
    name: 'Patient',
    component: PatientDashboardView,
    meta: { requiresAuth: true, role: 'patient' },
  },
  {
    path: '/assistant',
    name: 'Assistant',
    component: AssistantDashbordView,
    meta: { requiresAuth: true, role: 'assistant' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Middleware de protection des routes
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Connexion' }); // Rediriger vers la page de connexion
  } else {
    next(); // Poursuivre la navigation
  }
});

export default router
