import { createRouter, createWebHistory } from 'vue-router'
import ConnexionView from '@/views/Auth/ConnexionView.vue';
import InscriptionView from '@/views/Auth/InscriptionView.vue';
import ArticleView from '@/views/portail/ArticleView.vue';
import BlogView from '@/views/portail/BlogView.vue';
import AcceuilView from '@/views/portail/AcceuilView.vue';
import AdminDashboardView from '@/views/admin/AdminDashboardView.vue';
import { useAuthStore } from '@/store/auth';

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
  // {
  //   path: '/admin',
  //   name: 'Admin',
  //   component: AdminView
  // },
  // {
  //   path: '/medecin',
  //   name: 'Medecin',
  //   component: MedecinView,
  // },
  // {
  //   path: '/patient',
  //   name: 'Patient',
  //   component: PatientView,
  // },
  // {
  //   path: '/assistant',
  //   name: 'Assistant',
  //   component: AssistantView,
  // },
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Middleware pour protéger les routes et gérer la redirection en fonction du rôle
// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore; 

//   if (to.meta.requiresAuth) {
//     if (!authStore.token) {
//       // Redirection vers la connexion si non authentifié
//       return next({ name: "Connexion" });
//     }

//     // Vérification du rôle de l'utilisateur
//     if (to.meta.role && authStore.user?.role !== to.meta.role) {
//       // Redirection si le rôle ne correspond pas
//       return next({ name: "Connexion" }); 
//     }
//   }

//   // Autoriser la navigation si tout est bon
//   next(); 
// });
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
