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
                    <button
                      class="btn btn-primary"
                      @click="openNewCategoryModal"
                    >
                      <i class="fas fa-plus me-2"></i>Nouvelle Catégorie
                    </button>
                  </div>

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
                          <td>
                            {{ categorie.articles_count || 0 }}
                            <!-- Par défaut 0 si non défini -->
                          </td>
                          <td>
                            <div class="btn-group" role="group">
                              <button
                                class="btn btn-sm btn-outline-primary me-1"
                                 @click="openEditCategoryModal(categorie)"
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
                      <button class="btn btn-outline-success me-2">
                        <i class="fas fa-check me-2"></i>Tout approuver
                      </button>
                      <button class="btn btn-outline-danger">
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
                        <tr>
                          <td>
                            <input type="checkbox" class="form-check-input" />
                          </td>
                          <td>Jean Dupont</td>
                          <td>Excellent article, très informatif...</td>
                          <td>Les avantages de la télémédecine</td>
                          <td>2024-03-15</td>
                          <td>
                            <button class="btn btn-sm btn-outline-success me-1">
                              <i class="fas fa-check"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger">
                              <i class="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                        <!-- Autres commentaires... -->
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
                    <button class="btn btn-primary">
                      <i class="fas fa-upload me-2"></i>Ajouter des médias
                    </button>
                  </div>
                  <div class="row g-3">
                    <div class="col-md-3">
                      <div class="card">
                        <img
                          src="/placeholder-image.jpg"
                          class="card-img-top"
                          alt="Media"
                        />
                        <div class="card-body">
                          <h6 class="card-title">image-1.jpg</h6>
                          <p class="text-muted small">Ajouté le: 2024-03-15</p>
                          <div class="btn-group w-100">
                            <button class="btn btn-sm btn-outline-primary">
                              <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger">
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

    <!-- Modal de modification -->
    <div
      class="modal fade"
      id="editCategoryModal"
      tabindex="-1"
      aria-labelledby="editCategoryModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editCategoryModalLabel">
              Modifier Catégorie
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="modifierCategory">
              <div class="mb-3">
                <label for="categoryName" class="form-label"
                  >Nom de la catégorie</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="categoryName"
                  v-model="editedCategory.nom"
                  required
                />
              </div>
              <!-- Ajoutez d'autres champs ici si nécessaire -->
              <button type="submit" class="btn btn-primary">Enregistrer</button>
            </form>
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
  updateCategory,
} from "@/services/articleService";
import Swal from "sweetalert2";
import bootstrapBundleMin from "bootstrap/dist/js/bootstrap.bundle.min";

const activeTab = ref("articles");
const categories = ref([]);
const editedCategory = ref({});
const dashboardStats = [
  {
    title: "Articles",
    value: 24,
    icon: "fas fa-newspaper",
    bgClass: "bg-primary",
  },
  {
    title: "Catégories",
    value: 8,
    icon: "fas fa-tags",
    bgClass: "bg-success",
  },
  {
    title: "Commentaires",
    value: 156,
    icon: "fas fa-comments",
    bgClass: "bg-warning",
  },
  {
    title: "Médias",
    value: 45,
    icon: "fas fa-images",
    bgClass: "bg-info",
  },
];

const tabs = [
  { id: "articles", label: "Articles", icon: "fas fa-newspaper" },
  { id: "categories", label: "Catégories", icon: "fas fa-tags" },
  { id: "comments", label: "Commentaires", icon: "fas fa-comments" },
  { id: "media", label: "Médias", icon: "fas fa-images" },
];

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
    const response = await deleteArticle(articleId);

    if (response && response.status === 200) {
      // Vérifiez que la réponse indique un succès
      articles.value = articles.value.filter(
        (article) => article.id !== articleId
      );
      console.log("Article supprimé avec succès :", articleId);
      // Vous pouvez aussi afficher une notification ou un message ici
    } else {
      console.error("Erreur lors de la suppression de l'article :", response);
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de l'article :", error);
    throw error;
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

/** *********************************** */
/**     Modification d'une catégorie    */
/** *********************************** */
// Ouvrir le modal et charger les données de la catégorie
const openEditCategoryModal = (categorie) => {
  editedCategory.value = { ...categorie };
  const editModal = new bootstrapBundleMin.Modal(
    document.getElementById("editCategoryModal")
  );
  editModal.show();
};

// Mettre à jour la catégorie
const modifierCategory = async () => {
  try {
    await updateCategory(editedCategory.value.id, editedCategory.value);
    // Mettre à jour la catégorie dans la liste des catégories
    const index = categories.value.findIndex(
      (c) => c.id === editedCategory.value.id
    );
    if (index !== -1) {
      categories.value[index] = { ...editedCategory.value };
    }

    // Fermer le modal après la mise à jour
    const editModal = bootstrapBundleMin.Modal.getInstance(
      document.getElementById("editCategoryModal")
    );
    editModal.hide();

  } catch (error) {
    console.error("Erreur lors de la mise à jour de la catégorie :", error);
  }
};

// Initialisation
onMounted(() => {
  loadArticle();
  loadCategorie();
});
</script>

<style scoped>
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
