import { defineStore } from "pinia";
import { api_base_url } from "@/apiConfig";
import router from "@/router";
import axios from "axios";

export const useAuthStore = defineStore("authStore", {
  state: () => {
    return {
      user: null,
      token: localStorage.getItem("token") || null, // Ajout d'un état pour le token
    };
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async authenticate(apiRoute, formData) {
      try {
        const res = await axios.post(`${api_base_url}/${apiRoute}`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Stocker le token et les informations de l'utilisateur
        this.token = res.data.access_token;
        this.user = res.data.user;

        // Enregistrer le token dans le localStorage
        localStorage.setItem("token", this.token);

        // Enregistrer les détails spécifiques de l'utilisateur dans le localStorage
        localStorage.setItem("user_role", this.user.role[0]); // Supposons que le rôle soit un tableau
        localStorage.setItem("user_id", this.user.id);

        // En fonction du rôle, stocker les informations supplémentaires
        if (this.user.role.includes("medecin")) {
          localStorage.setItem("medecin_id", this.user.roleDetails.id);
          // Vous pouvez ajouter d'autres informations spécifiques si nécessaire
        } else if (this.user.role.includes("patient")) {
          localStorage.setItem("patient_id", this.user.roleDetails.id);
        } else if (this.user.role.includes("assistant")) {
          localStorage.setItem("assistant_id", this.user.roleDetails.id);
        }

        // Vérification du rôle et redirection
        switch (this.user.role[0]) {
          case "administrateur":
            router.push({ name: "AdminDashboard" });
            break;
          case "medecin":
            router.push({ name: "Medecin" });
            break;
          case "patient":
            router.push({ name: "Patient" });
            break;
          case "assistant":
            router.push({ name: "Assistant" });
            break;
          default:
            console.error("Rôle non reconnu:", this.user.role[0]);
            router.push({ name: "Portail" });
            break;
        }
      } catch (error) {
        console.error(
          "Erreur lors de l'authentification:",
          error.response?.data || error
        );
        this.user = null;
        this.token = null;
      }
    },
    async logout() {
      try {
        await axios.post(
          `${api_base_url}/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        // Réinitialiser l'utilisateur et le token
        this.user = null;
        this.token = null;

        localStorage.removeItem("token");
        localStorage.removeItem("user_role");
        localStorage.removeItem("user_id");
        localStorage.removeItem("medecin_id");
        localStorage.removeItem("patient_id");
        localStorage.removeItem("assistant_id");

        router.push({ name: "Connexion" });
      } catch (error) {
        console.error(
          "Erreur lors de la déconnexion:",
          error.response?.data || error
        );
      }
    },
  },
});
