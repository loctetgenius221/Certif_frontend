import axios from "axios";
import { handleError } from "vue";
import { api_base_url } from "@/apiConfig";

// Création de l'instance Axios
const api = axios.create({
  baseURL: api_base_url,
});

export const getProfile = async () => {
  try {
    const token = localStorage.getItem("token"); // Récupération du token
    const response = await api.get("/profile", {
      headers: {
        Authorization: `Bearer ${token}`, // Ajout du token dans l'en-tête
      }
    });
    return response.data;
  } catch (error) {
    console.error(error)
  }
};

// Fonction pour mettre à jour le profil
export const updateProfile = async (profileData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.put("/profile/update", profileData, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
