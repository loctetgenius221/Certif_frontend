import { createRouter, createWebHistory } from 'vue-router'
import ConnexionView from '@/views/portail/ConnexionView.vue';
import InscriptionView from '@/views/portail/InscriptionView.vue';
import ArticleView from '@/views/portail/ArticleView.vue';
import BlogView from '@/views/portail/BlogView.vue';
import AcceuilView from '@/views/portail/AcceuilView.vue';

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
})

export default router
