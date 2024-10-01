import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore('authStore', {
  state: () => {
    return {
      user: null,
      token: null, // Ajoutez un état pour le token
    };
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
        
        console.log(res.data);
      } catch (error) {
        console.error(error.response.data);
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
        this.token = null; // Réinitialiser le token
      } catch (error) {
        console.error(error.response.data);
      }
    }
  }
});
