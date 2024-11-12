<template>
  <div class="d-flex">
    <SidebarAdmin />
    <div class="section-content">
      <HeaderPatient />
      <div class="section-container">
        <div class="blog-management-container">
          <div class="container-fluid px-4 py-5">
            <!-- Header -->
            <div class="row mb-4 align-items-center">
              <div class="col">
                <h1 class="display-6 fw-bold text-primary">Gestion du Blog</h1>
              </div>
            </div>

            <!-- Dashboard Cards -->
            <div class="row g-4 mb-5">
              <div
                class="col-md-3"
                v-for="(stat, index) in dashboardStats"
                :key="index"
              >
                <div
                  class="card border-0 shadow-sm transform-hover"
                  :class="stat.bgClass"
                >
                  <div class="card-body text-center text-white p-4">
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <h5 class="card-title opacity-75">{{ stat.title }}</h5>
                        <p class="fs-3 fw-bold mb-0">{{ stat.value }}</p>
                      </div>
                      <i :class="stat.icon + ' fs-2 opacity-50'"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Main Content with Tabs -->
            <div class="card shadow-sm border-0">
              <div class="card-header bg-white border-0 pt-4 px-4">
                <ul class="nav nav-pills nav-fill gap-2" role="tablist">
                  <li
                    v-for="(tab, index) in tabs"
                    :key="index"
                    class="nav-item"
                  >
                    <button
                      class="nav-link"
                      :class="{ active: activeTab === tab.id }"
                      @click="activeTab = tab.id"
                    >
                      <i :class="tab.icon + ' me-2'"></i>
                      {{ tab.label }}
                    </button>
                  </li>
                </ul>
              </div>

              <div class="card-body p-4">
                <!-- Articles Tab -->
                <div v-if="activeTab === 'articles'" class="tab-content">
                  <div class="d-flex justify-content-between mb-4">
                    <h4 class="text-primary">Liste des Articles</h4>
                    <router-link :to="{ name: 'EditeurArticle' }">
                      <button class="btn btn-primary">
                        <i class="fas fa-plus me-2"></i>Nouvel Article
                      </button>
                    </router-link>
                  </div>
                  <div class="table-responsive">
                    <table class="table table-hover">
                      <thead>
                        <tr>
                          <th>Titre</th>
                          <th>Catégorie</th>
                          <th>Date</th>
                          <th>Statut</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-if="articles.length === 0">
                          <td colspan="5" class="text-center">
                            Aucun article trouvé
                          </td>
                        </tr>
                        <tr v-for="article in articles" :key="article.id">
                          <td>{{ article.titre }}</td>
                          <td>
                            <span class="badge" :class="article.categoryBadge">
                              <!-- Ajustez si categoryBadge existe -->
                              {{ article.categorie.nom }}
                              <!-- Placeholder si category n'est pas définie -->
                            </span>
                          </td>
                          <td>
                            {{
                              new Date(
                                article.date_publication
                              ).toLocaleDateString()
                            }}
                          </td>
                          <td>
                            <span class="badge" :class="article.statusBadge">
                              <!-- Ajustez si statusBadge existe -->
                              {{ article.statut || "Publié" }}
                              <!-- Placeholder si status n'est pas définie -->
                            </span>
                          </td>
                          <td>
                            <div class="btn-group" role="group">
                              <button class="btn btn-sm btn-outline-primary">
                                <i class="fas fa-edit"></i>
                              </button>
                              <button
                                class="btn btn-sm btn-outline-danger"
                                @click="trashArticle(article.id)"
                              >
                                <i class="fas fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <!-- Onglet Catégories -->
                <div
                  v-if="activeTab === 'categories'"
                  class="tab-content tab-pane"
                  id="categories"
                >
                  <div
                    class="d-flex justify-content-between align-items-center mb-4"
                  >
                    <h4>Gestion des Catégories</h4>
                  </div>

                  <!-- Formulaire pour ajouter ou modifier une catégorie -->
                  <form
                    @submit.prevent="submitCategoryForm"
                    class="mb-4 d-flex align-items-center"
                  >
                    <div class="mb-3 col-10">
                      <label for="categoryName" class="form-label"
                        >Nom de la Catégorie</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="categoryName"
                        v-model="categoryName"
                        required
                      />
                    </div>
                    <button type="submit" class="btn btn-primary col-1 mt-2">
                      {{ editingCategory ? "Mettre à jour" : "Ajouter" }}
                    </button>
                    <button
                      type="button"
                      class="btn btn-secondary col-1 mt-2"
                      @click="resetForm"
                    >
                      Annuler
                    </button>
                  </form>

                  <div class="table-responsive">
                    <table class="table table-hover">
                      <thead>
                        <tr>
                          <th>Nom de la Catégorie</th>
                          <th>Nombre d'Articles</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-if="categories.length === 0">
                          <td colspan="3" class="text-center">
                            Aucune catégorie trouvée
                          </td>
                        </tr>
                        <tr v-for="categorie in categories" :key="categorie.id">
                          <td>{{ categorie.nom }}</td>
                          <td>{{ categorie.articles_count || 0 }}</td>
                          <td>
                            <div class="btn-group" role="group">
                              <button
                                class="btn btn-sm btn-outline-primary me-1"
                                @click="openEditCategory(categorie)"
                              >
                                <i class="fas fa-edit"></i>
                              </button>
                              <button
                                class="btn btn-sm btn-outline-danger"
                                @click="removeCategory(categorie.id)"
                              >
                                <i class="fas fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <!-- Onglet Commentaires -->
                <div
                  v-if="activeTab === 'comments'"
                  class="tab-content tab-pane"
                  id="comments"
                >
                  <div
                    class="d-flex justify-content-between align-items-center mb-4"
                  >
                    <h4>Modération des Commentaires</h4>
                    <div>
                      <button
                        class="btn btn-outline-danger"
                        @click="removeSelectedComments"
                      >
                        <i class="fas fa-trash me-2"></i>Supprimer la sélection
                      </button>
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table class="table table-hover">
                      <thead>
                        <tr>
                          <th>
                            <input type="checkbox" class="form-check-input" />
                          </th>
                          <th>Auteur</th>
                          <th>Commentaire</th>
                          <th>Article</th>
                          <th>Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-if="commentaires.length === 0">
                          <td colspan="5" class="text-center">
                            Aucun article trouvé
                          </td>
                        </tr>
                        <tr
                          v-for="commentaire in commentaires"
                          :key="commentaire.id"
                        >
                          <td>
                            <input
                              type="checkbox"
                              class="form-check-input"
                              :value="commentaire.id"
                              v-model="selectedComments"
                            />
                          </td>
                          <td>{{ commentaire.auteur }}</td>
                          <td>{{ commentaire.commentaire }}</td>
                          <td>{{ commentaire.article.titre }}</td>
                          <td>{{ formatDateFr(commentaire.created_at) }}</td>
                          <td>
                            <button
                              class="btn btn-sm btn-outline-danger"
                              @click="removeComment(commentaire.id)"
                            >
                              <i class="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <!-- Onglet Médias -->
                <div
                  v-if="activeTab === 'media'"
                  class="tab-content tab-pane"
                  id="media"
                >
                  <div
                    class="d-flex justify-content-between align-items-center mb-4"
                  >
                    <h4>Gestion des Médias</h4>
                    <button
                      class="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#mediaModal"
                      @click="openAddMediaModal"
                    >
                      <i class="fas fa-upload me-2"></i>Ajouter des médias
                    </button>
                  </div>

                  <div class="row g-3">
                    <div
                      class="col-md-3"
                      v-for="media in mediaList"
                      :key="media.id"
                    >
                      <div class="card">
                        <img
                          :src="media.url"
                          class="card-img-top"
                          alt="Media"
                          @click="openImageModal(media.url)"
                          data-bs-toggle="modal"
                          data-bs-target="#imageModal"
                        />
                        <div class="card-body">
                          <h6 class="card-title">{{ media.nom }}</h6>
                          <p class="text-muted small">
                            Ajouté le: {{ formatDateFr(media.created_at) }}
                          </p>
                          <div class="btn-group w-100">
                            <button
                              class="btn btn-sm btn-outline-primary"
                              data-bs-toggle="modal"
                              data-bs-target="#mediaModal"
                              @click="openEditMediaModal(media)"
                            >
                              <i class="fas fa-edit"></i>
                            </button>
                            <button
                              class="btn btn-sm btn-outline-danger"
                              @click="removeMedia(media.id)"
                            >
                              <i class="fas fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal pour Ajouter/Mettre à jour Médias -->
    <div
      class="modal fade"
      id="mediaModal"
      tabindex="-1"
      aria-labelledby="mediaModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="mediaModalLabel">
              {{ editingMedia ? "Modifier le Média" : "Ajouter un Média" }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitMediaForm">
              <input type="file" @change="onFileChange" required />
              <input
                type="text"
                v-model="mediaName"
                placeholder="Nom du Média"
                required
                class="form-control mt-2"
              />
              <div v-if="validationErrors.length" class="alert alert-danger">
                <ul>
                  <li v-for="(error, index) in validationErrors" :key="index">
                    {{ error }}
                  </li>
                </ul>
              </div>
              <button type="submit" class="btn btn-primary mt-3">
                {{ editingMedia ? "Mettre à jour" : "Ajouter" }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal pour Afficher l'Image -->
    <div
      class="modal fade"
      id="imageModal"
      tabindex="-1"
      aria-labelledby="imageModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content scale-in">
          <div class="modal-header">
            <h5 class="modal-title" id="imageModalLabel">Image</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <img :src="currentImage" class="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SidebarAdmin from "@/components/SidebarAdmin.vue";
import HeaderPatient from "@/components/HeaderPatient.vue";
import { ref, onMounted } from "vue";
import {
  allArticle,
  deleteArticle,
  getAllCategories,
  deleteCategory,
  getAllComments,
  deleteComments,
  updateCategory,
  addCategory,
  addMedia,
  updateMedia,
  getAllMedia,
  deleteMedia,
} from "@/services/articleService";
import Swal from "sweetalert2";
import { api } from "@/services/articleService";

const activeTab = ref("articles");
const categories = ref([]);
const categoryName = ref("");
const editingCategory = ref(null);
const commentaires = ref([]);
const selectedComments = ref([]);
const dashboardStats = ref([]);
const mediaList = ref([]);
const showMediaModal = ref(false);
const showImageModal = ref(false);
const currentImage = ref("");
const editingMedia = ref(null);
const mediaName = ref("");
const mediaFile = ref(null);
const validationErrors = [];

const tabs = [
  { id: "articles", label: "Articles", icon: "fas fa-newspaper" },
  { id: "categories", label: "Catégories", icon: "fas fa-tags" },
  { id: "comments", label: "Commentaires", icon: "fas fa-comments" },
  { id: "media", label: "Médias", icon: "fas fa-images" },
];

/** ********************************* */
/**           Statistiques            */
/** ********************************* */

const fetchDashboardStats = async () => {
  try {
    const response = await api.get("/statblog");
    console.log("Stats :", response.data);

    dashboardStats.value = [
      {
        title: "Articles",
        value: response.data.data.articles,
        icon: "fas fa-newspaper",
        bgClass: "bg-primary",
      },
      {
        title: "Catégories",
        value: response.data.data.categories,
        icon: "fas fa-tags",
        bgClass: "bg-success",
      },
      {
        title: "Commentaires",
        value: response.data.data.comments,
        icon: "fas fa-comments",
        bgClass: "bg-warning",
      },
      {
        title: "Médias",
        value: response.data.data.media,
        icon: "fas fa-images",
        bgClass: "bg-info",
      },
    ];
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques :", error);
  }
};

/* ********************************** */
/*        Gestion des articles        */
/* ********************************** */

const articles = ref([]);

const colors = [
  "bg-primary",
  "bg-secondary",
  "bg-success",
  "bg-danger",
  "bg-warning",
  "bg-info",
  "bg-dark",
];

const loadArticle = async () => {
  try {
    const response = await allArticle();
    articles.value = response.data.map((article) => ({
      ...article,
      categoryBadge: getRandomColor(), // Assigner une couleur aléatoire
      statusBadge: article.statut === "publié" ? "bg-success" : "bg-warning", // Mise à jour de la logique de badge
    }));
    console.log("Liste des articles :", articles.value);
  } catch (error) {
    console.error("Erreur lors du chargement des articles :", error);
  }
};

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const trashArticle = async (articleId) => {
  try {
    // Afficher l'alerte de confirmation
    const result = await Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action est irréversible ! L'article sera définitivement supprimé.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimer !",
      cancelButtonText: "Annuler",
    });

    // Si l'utilisateur confirme la suppression
    if (result.isConfirmed) {
      const response = await deleteArticle(articleId);

      // Supposons que la réponse réussie soit structurée comme suit :
      // { message: 'Article supprimé avec succès', data: null }
      if (
        response &&
        response.data &&
        response.data.message === "Article supprimé avec succès"
      ) {
        // Supprimer l'article de la liste
        articles.value = articles.value.filter(
          (article) => article.id !== articleId
        );
        console.log("Article supprimé avec succès :", articleId);

        // Afficher une alerte de succès
        Swal.fire({
          title: "Supprimé !",
          text: "L'article a été supprimé avec succès.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        // Si la réponse n'est pas celle attendue
        console.error("Erreur lors de la suppression de l'article :", response);
        Swal.fire({
          title: "Erreur",
          text: "Une erreur est survenue lors de la suppression de l'article.",
          icon: "error",
        });
      }
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de l'article :", error);
    Swal.fire({
      title: "Erreur",
      text: "Une erreur est survenue lors de la suppression de l'article.",
      icon: "error",
    });
  }
};

/** ****************************** */
/**        Gestion Catégorie       */
/** ****************************** */

const loadCategorie = async () => {
  try {
    const response = await getAllCategories();
    categories.value = response.data;
    console.log("Liste des catégories :", categories.value);
  } catch (error) {
    console.error("Erreur lors du chargement des articles :", error);
  }
};

// Fonction pour supprimer une catégorie
const removeCategory = async (categoryId) => {
  try {
    // Afficher l'alerte de confirmation
    const result = await Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action est irréversible !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimer !",
      cancelButtonText: "Annuler",
    });

    // Si l'utilisateur confirme la suppression
    if (result.isConfirmed) {
      await deleteCategory(categoryId);
      categories.value = categories.value.filter(
        (categorie) => categorie.id !== categoryId
      );

      // Afficher une alerte de succès
      Swal.fire({
        title: "Supprimé !",
        text: "La catégorie a bien été supprimée.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      console.log(`Catégorie avec ID ${categoryId} supprimée.`);
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de la catégorie :", error);
    Swal.fire({
      title: "Erreur",
      text: "Une erreur est survenue lors de la suppression.",
      icon: "error",
    });
  }
};

/**     Modification d'une catégorie    */
// Fonction pour soumettre le formulaire
const submitCategoryForm = async () => {
  if (editingCategory.value) {
    // Vérifiez que la catégorie est définie
    if (editingCategory.value.id) {
      await updateCategory(editingCategory.value.id, {
        nom: categoryName.value,
      });
    }
  } else {
    // Ajouter une nouvelle catégorie
    await addCategory({ nom: categoryName.value });
  }
  resetForm();
  await loadCategorie(); // Rafraîchir la liste
};

// Fonction pour ouvrir le formulaire d'édition
const openEditCategory = (categorie) => {
  editingCategory.value = categorie;
  categoryName.value = categorie.nom; // Remplir le champ avec le nom de la catégorie
};

// Fonction pour réinitialiser le formulaire
const resetForm = () => {
  categoryName.value = "";
  editingCategory.value = null; // Réinitialise la catégorie à éditer
};

/** ********************************* */
/**        Gestion Commentaires       */
/** ********************************* */
const loadComments = async () => {
  try {
    const response = await getAllComments();
    commentaires.value = response.data;
    console.log("Liste des commentaires :", commentaires.value);
  } catch (error) {
    console.error("Erreur lors du chargement des commentaires :", error);
  }
};

// Méthode de formatage
function formatDateFr(dateString) {
  const date = new Date(dateString);

  // Options pour le format français
  const options = {
    day: "2-digit",
    month: "long", // 'long' pour avoir le nom complet du mois
    year: "numeric",
  };

  // Formatage de la date en français
  return date.toLocaleDateString("fr-FR", options);
}

// Fonction pour supprimer une catégorie
const removeComment = async (commentId) => {
  try {
    // Afficher l'alerte de confirmation
    const result = await Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action est irréversible !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimer !",
      cancelButtonText: "Annuler",
    });

    // Si l'utilisateur confirme la suppression
    if (result.isConfirmed) {
      await deleteComments(commentId);
      commentaires.value = commentaires.value.filter(
        (commentaire) => commentaire.id !== commentId
      );

      // Afficher une alerte de succès
      Swal.fire({
        title: "Supprimé !",
        text: "La catégorie a bien été supprimée.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      console.log(`Catégorie avec ID ${commentId} supprimée.`);
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de la catégorie :", error);
    Swal.fire({
      title: "Erreur",
      text: "Une erreur est survenue lors de la suppression.",
      icon: "error",
    });
  }
};

// Fonction pour supprimer plusieurs commentaires
const removeSelectedComments = async () => {
  try {
    const result = await Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action est irréversible ! Tous les commentaires sélectionnés seront supprimés.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimer !",
      cancelButtonText: "Annuler",
    });

    if (result.isConfirmed) {
      for (const commentId of selectedComments.value) {
        await deleteComments(commentId);
      }

      commentaires.value = commentaires.value.filter(
        (commentaire) => !selectedComments.value.includes(commentaire.id)
      );

      Swal.fire({
        title: "Supprimé !",
        text: "Les commentaires sélectionnés ont été supprimés.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      // Réinitialiser la sélection
      selectedComments.value = []; // Réinitialisation correcte
    }
  } catch (error) {
    console.error("Erreur lors de la suppression des commentaires :", error);
    Swal.fire({
      title: "Erreur",
      text: "Une erreur est survenue lors de la suppression.",
      icon: "error",
    });
  }
};

/** ****************************** */
/**       Gestion des Médias       */
/** ****************************** */

const loadMedia = async () => {
  const medias = await getAllMedia();
  mediaList.value = medias.data;
};

const openAddMediaModal = () => {
  showMediaModal.value = true;
  editingMedia.value = null;
  mediaName.value = "";
  mediaFile.value = null;
};

const openEditMediaModal = (media) => {
  // Ouvrir le modal pour modifier le média
  showMediaModal.value = true;
  editingMedia.value = media;
  mediaName.value = media.nom;
  mediaFile.value = null;
};

const submitMediaForm = async () => {
  const formData = new FormData();

  // Ajouter le fichier uniquement si l'utilisateur a sélectionné un nouveau fichier
  if (mediaFile.value) {
    formData.append("media", mediaFile.value); // Assurez-vous que `mediaFile` contient bien le fichier
  }
  formData.append("nom", mediaName.value); // Renseignez le nom du média ici

  try {
    if (editingMedia.value) {
      await updateMedia(editingMedia.value.id, formData);
    } else {
      await addMedia(formData); // Ajoutez le média ici
    }

    // Affichez un SweetAlert de succès
    await Swal.fire({
      icon: "success",
      title: "Succès",
      text: editingMedia.value
        ? "Média mis à jour avec succès!"
        : "Média ajouté avec succès!",
      timer: 3000, // Durée en millisecondes avant que l'alerte se ferme (3 secondes)
      timerProgressBar: true, // Montre la barre de progression du timer
      willClose: () => {
        closeMediaModal(); // Fermer le modal juste avant que l'alerte ne se ferme
      },
    });

    await loadMedia(); // Rafraîchir la liste des médias
  } catch (error) {
    if (error.response && error.response.data.errors) {
      console.error("Erreurs de validation :", error.response.data.errors);
      await Swal.fire({
        icon: "error",
        title: "Erreur",
        text: error.response.data.errors.media
          ? "Erreur lors de l'ajout du média: " +
            error.response.data.errors.media[0]
          : "Erreur lors de l'ajout du média.",
        timer: 3000, // Durée en millisecondes avant que l'alerte se ferme (3 secondes)
        timerProgressBar: true,
      });
    } else {
      console.error("Erreur lors de l'envoi des données :", error);
      await Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Erreur lors de l'ajout du média. Veuillez réessayer.",
        timer: 3000, // Durée en millisecondes avant que l'alerte se ferme (3 secondes)
        timerProgressBar: true,
      });
    }
  }
};

const removeMedia = async (id) => {
  // Afficher une alerte de confirmation avant de supprimer
  const result = await Swal.fire({
    title: "Êtes-vous sûr?",
    text: "Vous ne pourrez pas revenir en arrière!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Oui, supprimer!",
    cancelButtonText: "Annuler",
  });

  // Si l'utilisateur confirme, procéder à la suppression
  if (result.isConfirmed) {
    try {
      await deleteMedia(id);
      await loadMedia(); // Rafraîchir la liste des médias
      await Swal.fire({
        icon: "success",
        title: "Supprimé!",
        text: "Le média a été supprimé.",
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      await Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Erreur lors de la suppression du média. Veuillez réessayer.",
        timer: 3000,
        timerProgressBar: true,
      });
    }
  }
};

const onFileChange = (event) => {
  const file = event.target.files[0]; // Récupérez le fichier sélectionné
  if (file) {
    mediaFile.value = file; // Stockez le fichier pour l'envoi
  } else {
    mediaFile.value = null; // Réinitialisez si aucun fichier n'est sélectionné
  }
};

const openImageModal = (imageUrl) => {
  currentImage.value = imageUrl;
  showImageModal.value = true;
};

const closeMediaModal = () => {
  showMediaModal.value = false;
};

// const closeImageModal = () => {
//   showImageModal.value = false;
// };

// Initialisation
onMounted(() => {
  fetchDashboardStats();
  loadArticle();
  loadCategorie();
  loadComments();
  loadMedia();
});
</script>

<style scoped>
.card-img-top {
  width: 100%;
  height: 170px; /* Vous pouvez ajuster cette valeur */
  object-fit: cover; /* Maintient le ratio et remplit le cadre */
}

.modal-backdrop {
  backdrop-filter: blur(5px); /* Applique un flou de 5 pixels */
  background-color: transparent; /* Assurez-vous que la couleur de fond est transparente */
}
/* Animation Scale-in */
@keyframes scaleInCenter {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Appliquer l'animation à votre modal */
.modal-content.scale-in {
  animation: scaleInCenter 0.5s ease forwards;
}

/* Custom styles */
.transform-hover {
  transition: transform 0.3s ease;
}

.transform-hover:hover {
  transform: translateY(-10px);
}

.nav-pills .nav-link {
  color: #6c757d;
  transition: all 0.3s ease;
}

.nav-pills .nav-link.active {
  background-color: #007bff;
  color: white;
}

.nav-pills .nav-link:hover {
  background-color: rgba(0, 123, 255, 0.1);
}

.table thead th {
  vertical-align: middle;
  color: #495057;
}

.card {
  border-radius: 15px;
}
</style>
