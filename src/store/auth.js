import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore('authStore', {
  state: () => {
    return {
      user: null,
      token: null, // Ajout d'un état pour le token
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
        this.user = res.data.user; // Assure-toi que `user` est bien accessible ici
        
        console.log(res.data);
      } catch (error) {
        console.error("Erreur lors de l'authentification:", error.response.data);
        this.user = null; // Réinitialiser l'utilisateur en cas d'erreur
        this.token = null; // Réinitialiser le token en cas d'erreur
      }
    },

    async logout() {
      try {
        await axios.post('api/logout', {}, {
          headers: {
            'Authorization': `Bearer ${this.token}`,
          },
        });
        this.user = null;
        this.token = null; // Réinitialiser le token après déconnexion
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error.response.data);
      }
    }
  }
});
