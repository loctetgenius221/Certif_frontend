import axios from "axios";
import { api_base_url } from "@/apiConfig";

// Base URL de l'API
const api = axios.create({
  baseURL: api_base_url,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const allArticle = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("/articles", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la recupération des articles:', error);
    throw error;
  }
}

export const deleteArticle = async (articleId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.delete(`/articles/${articleId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'articles:', error);
    throw error;
  }
}

/** ****************************** */
/**        Service Catégorie       */
/** ****************************** */

export const getAllCategories = async () => {
  try {
    const token = localStorage.getItem("token");
    
    // Vérifiez que le token est présent
    if (!token) {
      throw new Error("Token non trouvé dans le localStorage");
    }

    const response = await api.get('/categories', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Liste des catégories :', response.data);
    return response.data;

  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    
    // Si vous souhaitez gérer des erreurs spécifiques
    if (error.response) {
      console.error('Réponse d\'erreur du serveur:', error.response.data);
    } else if (error.request) {
      console.error('Aucune réponse reçue:', error.request);
    } else {
      console.error('Erreur lors de la configuration de la requête:', error.message);
    }

    throw error; // Lancer l'erreur pour la gestion ultérieure
  }
};

export const addCategory = async (categoryData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.post('/categories', categoryData, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    console.log('Catégorie ajoutée :', response.data);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la catégorie:', error);
    throw error;
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.delete(`/categories/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    console.log('Catégorie supprimée :', response.data);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression de la catégorie:', error);
    throw error;
  }
};

export const updateCategory = async (categoryId, categoryData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.put(`/categories/${categoryId}`, categoryData, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    console.log('Catégorie mise à jour :', response.data);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la catégorie:', error);
    throw error;
  }
};