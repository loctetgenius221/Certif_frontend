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

// Récupérer la liste des rendez-vous du medecin
export const getRendezVousList = async () => {
  try {
    const token = localStorage.getItem("token");
    // console.log("Token:", token);

    const response = await api.get("/rendezvous", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized. Redirecting to login...");
      router.push({ name: "Connexion" });
    } else {
      console.error("Erreur lors de la récupération de la liste des rendez-vous", error);
    }
  }
};

// Créer un rendez-vous
export const createRendezVous = async (data) => {
  try {
    const response = await api.post("/rendezvous", data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création du rendez-vous", error);
  }
};

// Récupérer un rendez-vous par son ID
export const getRendezVous = async (id) => {
  try {
    const response = await api.get(`/rendezvous/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la recupération du rendez-vous", error);
  }
};

// Mettre à jour un rendez-vous
export const updateRendezVous = async (id, data) => {
  try {
    const response = await api.put(`/rendezvous/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du rendez-vous", error);
  }
};

// Changer le statut d'un rendez-vous
export const changeRendezVousStatus = async (id, status) => {
  try {
    const response = await api.patch(`/rendezvous/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du status du rendez-vous", error);
  }
};

// Supprimer un rendez-vous
export const deleteRendezVous = async (id) => {
  try {
    const response = await api.delete(`/rendezvous/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression du rendez-vous", error);
  }
};

// Restaurer un rendez-vous supprimé
export const restoreRendezVous = async (id) => {
  try {
    const response = await api.post(`/rendezvous/${id}/restore`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la restauration du rendez-vous", error);
  }
};
