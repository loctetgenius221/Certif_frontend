import axios from "axios";
import { api_base_url } from "@/apiConfig";

// Créer une instance axios pour les requêtes à l'API
const api = axios.create({
  baseURL: api_base_url,
});


// Méthode pour récupérer les notifications
export const fetchNotifications = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token manquant");
      return;
    }

    const response = await api.get("/notifications", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Les notitfs :", response.data)
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des notifications:", error.response?.data || error.message);
  }
};

// Méthode pour marquer une notification comme lue
export const markNotificationAsRead = async (notificationId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token manquant");
      return;
    }

    const response = await api.post(`/notifications/${notificationId}/read'`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("marquage lu :", response.data)
    return response.data
  } catch (error) {
    console.error(`Erreur lors du marquage de la notification ${notificationId} comme lue:`, error.response?.data || error.message);
  }
};

// Méthode pour supprimer une notification
export const deleteNotification = async (notificationId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token manquant");
      return;
    }

    const response = await api.delete(`/notifications/${notificationId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data
  } catch (error) {
    console.error(`Erreur lors de la suppression de la notification ${notificationId}:`, error.response?.data || error.message);
  }
};
