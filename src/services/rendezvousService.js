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

// Récupérer la liste des rendez-vous
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

export const getRendezVousPatient = async (patientId) => {
  try {
    const token = localStorage.getItem("token");
    // console.log("Token:", token);

    const response = await api.get(`/rendezvous/patient/${patientId}`, {
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

export const getRendezVousMedecin = async (medecinId) => {
  try {
    const token = localStorage.getItem("token");
    // console.log("Token:", token);

    const response = await api.get(`/rendezvous/medecin/${medecinId}`, {
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
    const token = localStorage.getItem("token");

    const response = await api.post("/rendezvous", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Renvoie les données de la réponse
  } catch (error) {
    console.error("Erreur lors de la création du rendez-vous", error);
  }
};

// Fonction pour mettre à jour le statut d'une plage horaire
export const updatePlageHoraireStatus = async (plageId, status) => {
  try {
    const token = localStorage.getItem("token");

    await api.patch(`/plages-horaires/${plageId}/status`, { status }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut de la plage horaire :", error);
    throw error;
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

// Récupérer les plages horaires d'un médecin pour une date spécifique
export const getPlagesHorairesMedecin = async (id, date) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get(`/plagesbymedecin/${id}?date=${date}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Vérifiez si la réponse contient un médecin et ses plages horaires
    if (response.data) {
      return response.data; // Retourne directement l'objet contenant le médecin et les plages horaires
    } else {
      return null; // Retourne null si aucune donnée n'est trouvée
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des plages horaires", error);
    return null; // Retourne null en cas d'erreur
  }
};