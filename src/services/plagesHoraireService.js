import axios from "axios";
import router from "@/router";
import { api_base_url } from "@/apiConfig";

// Base URL de l'API
const api = axios.create({
  baseURL: api_base_url,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`, 
  },
});

// Récupérer les plages horaires d'un médecin à une date donnée
export const getPlagesHoraires = async (medecinId, date) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.get(`/plages-horaires`, {
      params: { medecin_id: medecinId, date: date },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Plages horaires récupérées:", response.data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("Non autorisé. Redirection vers la page de connexion...");
      router.push({ name: "Connexion" });
    } else {
      console.error("Erreur lors de la récupération des plages horaires", error);
    }
  }
};

// Créer une plage horaire
export const createPlageHoraire = async (data) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.post("/plages-horaires", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de la plage horaire", error);
  }
};

// Récupérer une plage horaire par son ID
export const getPlageHoraire = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.get(`/plages-horaires/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de la plage horaire", error);
  }
};

// Mettre à jour une plage horaire
export const updatePlageHoraire = async (id, data) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.put(`/plages-horaires/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la plage horaire", error);
  }
};

// Supprimer une plage horaire
export const deletePlageHoraire = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.delete(`/plages-horaires/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression de la plage horaire", error);
  }
};
