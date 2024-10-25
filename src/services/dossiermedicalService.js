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
      console.error(
        "Erreur lors de la récupération de la liste des dossiers médicaux",
        error
      );
    }
  }
};

// Recupération du dossier médical d'un patient spécifique
export const getDossierByPatient = async (patientId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get(`/dossier/patient/${patientId}`, {
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
      console.error(
        "Erreur lors de la récupération de la liste des dossiers médicaux",
        error
      );
    }
  }
};

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
      throw new Error(
        "Token d'authentification non trouvé. Veuillez vous connecter."
      );
    }

    // Requête API pour récupérer un dossier médical spécifique
    const response = await api.get(`/dossiers-medicaux/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Ajout du token dans les headers
      },
    });

    console.log("Dossier médical récupéré:", response.data);
    return response.data; // Retourner les données récupérées
  } catch (error) {
    // Gestion des erreurs plus spécifique
    if (error.response && error.response.status === 401) {
      console.error("Erreur 401: Non autorisé. Token invalide ou expiré.");
    } else {
      console.error(
        "Erreur lors de la récupération du dossier médical:",
        error.message
      );
    }

    // Propager l'erreur pour qu'elle soit gérée par l'appelant
    throw error;
  }
};

// Mise à jour d'un dossier médical
export const updateDossierMedical = async (id, data) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.put(`/dossiers-medicaux/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Dossier médical mis à jour:", response.data);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error; 
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

// Upload document par medecin
export const uploadDocumentByMedecin = async (
  dossier_medical_id,
  type_document,
  file
) => {
  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("dossier_medical_id", dossier_medical_id);
    formData.append("type_document", type_document);
    formData.append("file", file);

    const response = await api.post("/document", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("Non autorisé. Redirection vers la page de connexion...");
      // Gestion de la redirection à mettre ailleurs (pas ici dans le service)
      throw new Error("Unauthorized");
    } else {
      console.error("Erreur lors de l'upload du document", error);
      throw error;
    }
  }
};

// Gestion des erreurs
const handleError = (error) => {
  if (error.response) {
    if (error.response.status === 401) {
      console.error("Unauthorized. Redirecting to login...");
      router.push({ name: "Connexion" });
    } else {
      console.error(
        "Erreur lors de l'opération:",
        error.response.data.message || error.message
      );
    }
  } else {
    console.error("Erreur lors de l'opération:", error.message);
  }
};

export default api;
