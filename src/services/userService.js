import axios from "axios";
import { api_base_url } from "@/apiConfig";

// Base URL de l'API
const api = axios.create({
  baseURL: api_base_url,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`, 
  },
});

// Fonction pour récupérer un utilisateur par son ID
export const getUserById = async (id) => {
  try {
    const response = await api.get(`${api_base_url}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    throw error; // Relancez l'erreur pour la gestion en amont
  }
};