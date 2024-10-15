import axios from "axios";
import { api_base_url } from "@/apiConfig";

const api = axios.create({
  baseURL: api_base_url,
  headers: {
    Authorization: `Bearer ${ localStorage.getItem("token") }`,
  }
})

// Récupération de la liste des consultaions
export const getConsultationList = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("/consultations", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })

    return response.data;
  } catch (error) {
    console.error("Erreur lors de la recupération de la liste des consultations", error)
  }
}

// Voir détail d'une consultation
export const getConsultation = async (id) => {
  try {
    const token = localStorage.getItem("token");

    // Vérification si le token est disponible
    if (!token) {
      throw new Error("Token d'authentification non trouvé. Veuillez vous connecter.");
    }

    // Requête API pour récupérer un dossier médical spécifique
    const response = await api.get(`/consultations/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,  // Ajout du token dans les headers
      },
    });

    console.log("Consultation récupéré:", response.data);
    return response.data; // Retourner les données récupérées

  } catch (error) {
    // Gestion des erreurs plus spécifique
    if (error.response && error.response.status === 401) {
      console.error("Erreur 401: Non autorisé. Token invalide ou expiré.");
    } else {
      console.error("Erreur lors de la récupération de la consultation:", error.message);
    }
    // Propager l'erreur pour qu'elle soit gérée par l'appelant
    throw error;
  }
};