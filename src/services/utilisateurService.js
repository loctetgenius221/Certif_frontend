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

    console.log("Réponse des stats :", response);
    return response.data.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error);
    throw error;
  }
};

export const getRolesAndPermissions = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("/roles-permissions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // if (!response.ok) {
    //   throw new Error('Erreur lors de la récupération des rôles et permissions');
    // }
    console.log("Réponse de l'api :", response.data);
    return response.data;
  } catch (error) {
    console.error("Une erreur s'est produite :", error.message);
    throw error;
  }
};

/** *************************************** **/
/**        Inscrire un utilisateur          **/
/** *************************************** **/

const ENDPOINTS = {
  medecin: "/register/medecin",
  assistant: "/register/assistant",
  patient: "/register/patient",
  administrateur: "/register/administrateur"
};

export const registerUsers = async (role, newUser) => {
  try {
    const token = localStorage.getItem("token");
    console.log("Le role recu dans le service:", role)
    // Utiliser l'endpoint correspondant au rôle
    const endpoint = ENDPOINTS[role];
    console.log("Endpoint utilisé :", endpoint)
    
    if (!endpoint) {
      throw new Error("Rôle non valide fourni.");
    }

    const response = await api.post(endpoint, newUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Réponse de l'API :", response.data);
    return response.data;
  } catch (error) {
    console.error("Une erreur s'est produite :", error.message);
    throw error;
  }
};

export const blockedUser = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.post(`/utilisateur/${userId}/block`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    console.log("Réponse de l'api :", response.data);
    return response.data;
  } catch (error) {
    console.error("Une erreur s'est produite lors du blocage :", error.message);
    throw error;
  }
}

export const unblockedUser = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.post(`/utilisateur/${userId}/unblock`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    console.log("Réponse de l'api :", response.data);
    return response.data;
  } catch (error) {
    console.error("Une erreur s'est produite lors du déblocage :", error.message);
    throw error;
  }
}

export const getRole = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("/roles", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("roles:", response.data);
    return response.data
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error);
    throw error;
  }
}

export const createRole = async (roleData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.post("/roles", roleData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("roles:", response.data);
    return response.data
  } catch (error) {
    console.error("Erreur lors de la récupération des rôles:", error);
    throw error;
  }
}

export const updateRole = async (roleId, roleData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.put(`/roles/${roleId}`, roleData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("roles:", response.data);
    return response.data
  } catch (error) {
    console.error("Erreur lors de la modification du rôles:", error);
    throw error;
  }
}

export const deleteRole = async (roleId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.delete(`/roles/${roleId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression du rôle:', error);
    throw error;
  }
}
