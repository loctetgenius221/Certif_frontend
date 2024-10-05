import { defineStore } from "pinia";
import router from "@/router";
import axios from "axios";

export const useAuthStore = defineStore('authStore', {
  state: () => {
    return {
      user: null,
      token: localStorage.getItem('token') || null, // Ajout d'un état pour le token
    };
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async authenticate(apiRoute, formData) {
      try {
        const res = await axios.post(`api/${apiRoute}`, formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        // Stocker le token et les informations de l'utilisateur
        this.token = res.data.access_token;
        this.user = res.data.user;
    
        localStorage.setItem('token', this.token);
    
        let userRole = this.user.role[0];
        // Vérification du rôle et redirection
        switch (userRole) {
          case 'administrateur':
            router.push({ name: 'AdminDashboard' });
            break;
          case 'médecin':
            router.push({ name: 'Medecin' });
            break;
          case 'patient':
            router.push({ name: 'Patient' });
            break;
          case 'assistant':
            router.push({ name: 'Assistant' });
            break;
          default:
            console.error("Rôle non reconnu:", userRole);
            router.push({ name: 'Portail' });
            break;
        }
    
      } catch (error) {
        console.error("Erreur lors de l'authentification:", error.response?.data || error);
        this.user = null;
        this.token = null;
      }
    },

    async logout() {
      try {
        await axios.post('api/logout', {}, {
          headers: {
            'Authorization': `Bearer ${this.token}`,
          },
        });
        // Réinitialiser l'utilisateur et le token
        this.user = null;
        this.token = null;

        localStorage.removeItem('token');
        router.push({ name: 'Connexion' });
      } catch (error) {
        console.error('Erreur lors de la déconnexion:',  error.response?.data || error);
      }
    },
  }
});
