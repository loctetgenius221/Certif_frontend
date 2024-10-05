import axios from "axios";
import router from "@/router";
import { api_base_url } from "@/apiConfig";

const api = axios.create({
  baseURL: api_base_url,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`, 
  },
});

// Recupération de la liste des dossier médicaux
export const getDossierMedicalList = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("/dossiers-medicaux", {
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
      console.error("Erreur lors de la récupération de la liste des dossiers médicaux", error);
    }
  }
}

// Création d'un nouveau dossier médical
export const createDossierMedical = async (data) => {
  try {
    const response = await api.post("/dossiers-medicaux", data);
    console.log("Dossier médical créé:", response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getDossierMedical = async (id) => {
  try {
    const token = localStorage.getItem("token");

    // Vérification si le token est disponible
    if (!token) {
      throw new Error("Token d'authentification non trouvé. Veuillez vous connecter.");
    }

    // Requête API pour récupérer un dossier médical spécifique
    const response = await api.get(`/dossiers-medicaux/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,  // Ajout du token dans les headers
      },
    });

    console.log("Dossier médical récupéré:", response.data);
    return response.data; // Retourner les données récupérées

  } catch (error) {
    // Gestion des erreurs plus spécifique
    if (error.response && error.response.status === 401) {
      console.error("Erreur 401: Non autorisé. Token invalide ou expiré.");
    } else {
      console.error("Erreur lors de la récupération du dossier médical:", error.message);
    }
    
    // Propager l'erreur pour qu'elle soit gérée par l'appelant
    throw error;
  }
};

// Mise à jour d'un dossier médical
export const updateDossierMedical = async (id, data) => {
  try {
    const response = await api.put(`/dossiers-medicaux/${id}`, data);
    console.log("Dossier médical mis à jour:", response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Suppression d'un dossier médical
export const deleteDossierMedical = async (id) => {
  try {
    const response = await api.delete(`/dossiers-medicaux/${id}`);
    console.log("Dossier médical supprimé:", response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Gestion des erreurs
const handleError = (error) => {
  if (error.response) {
    if (error.response.status === 401) {
      console.error("Unauthorized. Redirecting to login...");
      router.push({ name: "Connexion" });
    } else {
      console.error("Erreur lors de l'opération:", error.response.data.message || error.message);
    }
  } else {
    console.error("Erreur lors de l'opération:", error.message);
  }
};

export default api;