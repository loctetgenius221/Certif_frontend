import axios from "axios";
import { api_base_url } from "@/apiConfig";

// Base URL de l'API
const api = axios.create({
  baseURL: api_base_url,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getUserStatistics = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("/utilisateur/stats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Réponse des stats :", response)
    return response.data.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error);
    throw error;
  }
};

// export const getInfoUsers = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     const response = await api.get("/utilisateur/stats", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     console.log("Réponse des stats :", response)
//     return response.data.data.users;
//   } catch (error) {
//     console.error("Erreur lors de la récupération des statistiques:", error);
//     throw error;
//   }
// };
